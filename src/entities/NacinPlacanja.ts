import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Racun from './Racun'

@Index('NacinPlacanja_pkey', ['id'], { unique: true })
@Entity('NacinPlacanja', { schema: 'public' })
export default class NacinPlacanja extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('character varying', {
    name: 'odabrani_nacin',
    nullable: true,
    length: 100,
  })
  odabraniNacin!: string | null

  @OneToMany(() => Racun, (racun) => racun.nacinPlacanja)
  racuns!: Racun[]
}
