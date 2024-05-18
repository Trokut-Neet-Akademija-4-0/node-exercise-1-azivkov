import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Adresa from './Adresa'
import AddressInformation from '../models/addressInformation'

@Index('Grad_pkey', ['id'], { unique: true })
@Entity('Grad', { schema: 'public' })
export default class Grad extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('integer', { name: 'postanski_broj', nullable: true })
  postanskiBroj!: number | null

  @Column('character varying', { name: 'drzava', nullable: true, length: 256 })
  drzava!: string | null

  @Column('character varying', { name: 'grad', nullable: true, length: 256 })
  grad!: string | null

  @OneToMany(() => Adresa, (adresa) => adresa.grad)
  adresas!: Adresa[]

  public static async GetExistingGradFromAddressInformation(
    address: AddressInformation,
  ): Promise<Grad | null> {
    return Grad.findOne({
      where: {
        drzava: address.drzava,
        grad: address.grad,
        postanskiBroj: address.postanskiBroj,
      },
    })
  }

  public static GradFromAddressInformation(address: AddressInformation): Grad {
    const grad = new Grad()
    grad.drzava = address.drzava
    grad.grad = address.grad
    grad.postanskiBroj = address.postanskiBroj
    return grad
  }
}
