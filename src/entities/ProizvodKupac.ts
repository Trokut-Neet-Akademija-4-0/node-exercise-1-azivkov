import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import Kosarica from './Kosarica'
import Kupac from './Kupac'
import Proizvod from './Proizvod'

@Index('ProizvodKupac_pkey', ['kupacId', 'proizvodId'], { unique: true })
@Entity('ProizvodKupac', { schema: 'public' })
export default class ProizvodKupac extends BaseEntity {
  @Column('integer', { primary: true, name: 'proizvod_id' })
  proizvodId!: number

  @Column('integer', { primary: true, name: 'kupac_id' })
  kupacId!: number

  @Column('numeric', { name: 'cijena', precision: 10, scale: 2 })
  cijena!: number

  @Column('integer', { name: 'kolicina' })
  kolicina!: number

  @ManyToOne(() => Kosarica, (kosarica) => kosarica.proizvodKupacs)
  @JoinColumn([{ name: 'kosarica_id', referencedColumnName: 'id' }])
  kosarica!: Kosarica

  @ManyToOne(() => Kupac, (kupac) => kupac.proizvodKupacs)
  @JoinColumn([{ name: 'kupac_id', referencedColumnName: 'id' }])
  kupac!: Kupac

  @ManyToOne(() => Proizvod, (proizvod) => proizvod.proizvodKupacs)
  @JoinColumn([{ name: 'proizvod_id', referencedColumnName: 'id' }])
  proizvod!: Proizvod

  public static CreateCartProduct(
    cart: Kosarica,
    product: Proizvod,
    quantity: number,
  ) {
    const pk = new ProizvodKupac()
    pk.cijena = product.cijena
    pk.kolicina = quantity
    pk.kosarica = cart
    pk.proizvod = product
    if (cart.kupac) pk.kupac = cart.kupac
    return pk
  }
}
