/* eslint-disable prefer-destructuring */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import fs from 'fs'
import { parse } from 'csv'
import path from 'path'
import Proizvod from '../entities/Proizvod'
import Kategorija from '../entities/Kategorija'
import FileImportTracker from '../entities/FileImportTracker'

export default class ProductImporter {
  static async loadAllProducts(): Promise<void> {
    if (!process.env.IMPORTS_FOLDER_PATH) {
      console.log('import folder not a path')
      return
    }
    const allFilePathsInDirectory = (
      await fs.promises.readdir(process.env.IMPORTS_FOLDER_PATH, {
        withFileTypes: true,
      })
    )
      .filter((file) => file.isFile() && file.name.split('.').pop() === 'csv')
      .map((file) => file.name)
    try {
      for await (const fileName of allFilePathsInDirectory) {
        const alreadyImported = await FileImportTracker.exists({
          where: {
            name: fileName,
          },
        })

        if (alreadyImported) continue

        const parser = await fs
          .createReadStream(
            path.join(process.env.IMPORTS_FOLDER_PATH, fileName),
            'utf8',
          )
          .pipe(
            parse({
              // CSV options if any
              delimiter: ',',
            }),
          )
        for await (const record of parser) {
          const proizvod =
            ProductImporter.ConvertCSVRecordToProizvodEntity(record)
          await (await proizvod).save()
        }
        const importTracker = new FileImportTracker()
        importTracker.name = fileName
        await importTracker.save()
        console.log(`Imported file: ${fileName}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  private static async ConvertCSVRecordToProizvodEntity(
    record: string[],
  ): Promise<Proizvod> {
    const product = new Proizvod()
    product.imeProizvoda = record[0]
    product.cijena = Number.parseFloat(record[1])
    product.slika = record[2]
    product.opis = record[3]
    product.kolicina = Number.parseInt(record[4], 10)

    // Retrieve Kategorija entity based on the ID provided in the CSV record
    const kategorijaId = Number.parseInt(record[5], 10)
    const kategorija = await Kategorija.findOne({ where: { id: kategorijaId } })
    if (!kategorija) {
      throw new Error(`Kategorija with ID ${kategorijaId} not found.`)
    }

    product.kategorija = kategorija

    return product
  }
}
