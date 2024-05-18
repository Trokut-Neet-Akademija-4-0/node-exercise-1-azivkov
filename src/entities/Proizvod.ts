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
import Kategorija from './Kategorija'
import ProizvodKupac from './ProizvodKupac'

@Index('Proizvod_pkey', ['id'], { unique: true })
@Entity('Proizvod', { schema: 'public' })
export default class Proizvod extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('character varying', {
    name: 'ime_proizvoda',
    nullable: true,
    length: 1024,
  })
  imeProizvoda!: string | null

  @Column('numeric', { name: 'cijena', precision: 10, scale: 2 })
  cijena!: number

  @Column('character varying', { name: 'slika', nullable: true, length: 1024 })
  slika!: string | null

  @Column('character varying', { name: 'opis', nullable: true })
  opis!: string | null

  @Column('integer', { name: 'kolicina', nullable: true })
  kolicina!: number | null

  @ManyToOne(() => Kategorija, (kategorija) => kategorija.proizvods)
  @JoinColumn([{ name: 'kategorija_id', referencedColumnName: 'id' }])
  kategorija!: Kategorija

  @OneToMany(() => ProizvodKupac, (proizvodKupac) => proizvodKupac.proizvod)
  proizvodKupacs!: ProizvodKupac[]

  updateQuantityAndPrice(quantity: number, price: number) {
    this.cijena = price
    this.kolicina = quantity
  }

  updateExistingProduct(updatedData: Proizvod) {
    this.cijena = updatedData.cijena
    this.kolicina = updatedData.kolicina
    this.imeProizvoda = updatedData.imeProizvoda
    this.opis = updatedData.opis
    this.kategorija = updatedData.kategorija
  }
}
