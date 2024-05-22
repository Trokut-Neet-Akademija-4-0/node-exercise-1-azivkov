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
import StringToFloatTransformer from '../utils/stringToFloatTransformer'

@Index('Racun_pkey', ['id'], { unique: true })
@Entity('Racun', { schema: 'public' })
export default class Racun extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('numeric', {
    name: 'total',
    nullable: true,
    precision: 10,
    scale: 2,
    transformer: new StringToFloatTransformer(),
  })
  total!: number | null

  @Column('character varying', { name: 'jir', nullable: true, length: 1024 })
  jir!: string | null

  @Column('character varying', {
    name: 'id_uplate',
    nullable: true,
    length: 1024,
  })
  idUplate!: string | null

  @OneToOne(() => Kosarica, (kosarica) => kosarica.racun)
  kosarica!: Kosarica

  @ManyToOne(() => NacinPlacanja, (nacinPlacanja) => nacinPlacanja.racuns)
  @JoinColumn([{ name: 'nacin_placanja_id', referencedColumnName: 'id' }])
  nacinPlacanja!: NacinPlacanja
}
