import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Kosarica from './Kosarica'
import NacinPlacanja from './NacinPlacanja'

@Index('Racun_pkey', ['id'], { unique: true })
@Entity('Racun', { schema: 'public' })
export default class Racun extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('numeric', { name: 'total', precision: 10, scale: 2 })
  total!: string

  @OneToOne(() => Kosarica, (kosarica) => kosarica.racun)
  kosarica!: Kosarica

  @ManyToOne(() => NacinPlacanja, (nacinPlacanja) => nacinPlacanja.racuns)
  @JoinColumn([{ name: 'nacin_placanja_id', referencedColumnName: 'id' }])
  nacinPlacanja!: NacinPlacanja
}
