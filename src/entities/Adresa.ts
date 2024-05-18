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
import Grad from './Grad'
import Kupac from './Kupac'
import AddressInformation from '../models/addressInformation'

@Index('Adresa_pkey', ['id'], { unique: true })
@Entity('Adresa', { schema: 'public' })
export default class Adresa extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('character varying', { name: 'adresa', nullable: true, length: 1024 })
  adresa!: string | null

  @Column('character varying', { name: 'napomena_za_dostavu', nullable: true })
  napomenaZaDostavu!: string | null

  @ManyToOne(() => Grad, (grad) => grad.adresas)
  @JoinColumn([{ name: 'grad_id', referencedColumnName: 'id' }])
  grad!: Grad

  @OneToMany(() => Kupac, (kupac) => kupac.adresa)
  kupacs!: Kupac[]

  public static async GetExistingAddressFromAddressInformation(
    address: AddressInformation,
  ): Promise<Adresa | null> {
    const grad = await Grad.GetExistingGradFromAddressInformation(address)
    if (!grad) return null
    return Adresa.findOne({
      where: {
        adresa: address.adresa,
        napomenaZaDostavu: address.napomenaZaDostavu,
        grad,
      },
    })
  }

  public static async CreateAdresaFromAddressInformation(
    address: AddressInformation,
  ): Promise<Adresa> {
    let grad = await Grad.GetExistingGradFromAddressInformation(address)
    if (!grad) {
      grad = Grad.GradFromAddressInformation(address)
      await grad.save()
    }
    const adresa = new Adresa()
    adresa.adresa = address.adresa
    adresa.napomenaZaDostavu = address.napomenaZaDostavu
    adresa.grad = grad
    return adresa.save()
  }
}
