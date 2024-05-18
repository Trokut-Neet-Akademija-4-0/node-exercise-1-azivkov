import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Kosarica from './Kosarica'
import Adresa from './Adresa'
import ProizvodKupac from './ProizvodKupac'
import BuyerInformation from '../models/buyerInformation'

@Index('Kupac_pkey', ['id'], { unique: true })
@Entity('Kupac', { schema: 'public' })
export default class Kupac extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('character varying', {
    name: 'ime_prezime',
    nullable: true,
    length: 255,
  })
  imePrezime!: string | null

  @Column('character varying', { name: 'email', nullable: true, length: 255 })
  email!: string | null

  @Column('integer', { name: 'broj_telefona', nullable: true })
  brojTelefona!: number | null

  @OneToMany(() => Kosarica, (kosarica) => kosarica.kupac)
  kosaricas!: Kosarica[]

  @ManyToOne(() => Adresa, (adresa) => adresa.kupacs)
  @JoinColumn([{ name: 'adresa_id', referencedColumnName: 'id' }])
  adresa!: Adresa

  @OneToMany(() => ProizvodKupac, (proizvodKupac) => proizvodKupac.kupac)
  proizvodKupacs!: ProizvodKupac[]

  public static async GetExistingKupacFromBuyerInformation(
    buyer: BuyerInformation,
  ): Promise<Kupac | null> {
    return Kupac.findOne({
      where: {
        email: buyer.email,
        imePrezime: buyer.imePrezime,
        brojTelefona: buyer.brojTelefona,
      },
    })
  }

  public static async CreateKupacFromBuyerInformation(
    buyer: BuyerInformation,
  ): Promise<Kupac> {
    let adresa = await Adresa.GetExistingAddressFromAddressInformation(
      buyer.adresa,
    )
    if (!adresa) {
      adresa = await Adresa.CreateAdresaFromAddressInformation(buyer.adresa)
      await adresa.save()
    }
    let kupac = await Kupac.GetExistingKupacFromBuyerInformation(buyer)
    if (!kupac) {
      kupac = new Kupac()
      kupac.email = buyer.email
      kupac.imePrezime = buyer.imePrezime
      kupac.brojTelefona = buyer.brojTelefona
      kupac.adresa = adresa
      await kupac.save()
    }
    return kupac
  }
}
