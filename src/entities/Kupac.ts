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
import Role from '../models/enums/Role'
import IntegerToRoleTransformer from '../utils/integerToRoleTransformer'
import UserResponse from '../models/response/UserResponse'

@Index('Kupac_pkey', ['id'], { unique: true })
@Entity('Kupac', { schema: 'public' })
export default class Kupac extends BaseEntity implements Express.User {
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

  @Column('integer', {
    name: 'role',
    nullable: true,
    transformer: new IntegerToRoleTransformer(),
  })
  role!: Role

  @OneToMany(() => Kosarica, (kosarica) => kosarica.kupac)
  kosaricas!: Kosarica[]

  @ManyToOne(() => Adresa, (adresa) => adresa.kupacs)
  @JoinColumn([{ name: 'adresa_id', referencedColumnName: 'id' }])
  adresa!: Adresa

  @ManyToOne(() => Kupac, (kupac) => kupac.kupacs)
  @JoinColumn([{ name: 'kupac_dostava_id', referencedColumnName: 'id' }])
  kupacDostava!: Kupac

  @OneToMany(() => Kupac, (kupac) => kupac.kupacDostava)
  kupacs!: Kupac[]

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

  toUserResponse() {
    const userResponse = new UserResponse()
    userResponse.userId = this.id
    userResponse.firstNamelastName = this.imePrezime
    userResponse.phoneNumber = this.brojTelefona
    userResponse.email = this.email
    if (this.adresa) {
      userResponse.deliveryNotice = this.adresa.napomenaDostavljacu
      userResponse.street = this.adresa.ulica
      userResponse.streetNumber = this.adresa.broj
      if (this.adresa.grad) {
        userResponse.city = this.adresa.grad.grad
        userResponse.postalNumber = this.adresa.grad.postanskiBroj
        userResponse.country = this.adresa.grad.drzava
      }
    }

    return userResponse
  }
}
