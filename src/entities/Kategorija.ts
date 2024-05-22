import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Proizvod from './Proizvod'

@Index('Kategorija_pkey', ['id'], { unique: true })
@Entity('Kategorija', { schema: 'public' })
export default class Kategorija extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('character varying', {
    name: 'ime_kategorije',
    nullable: true,
    length: 128,
  })
  imeKategorije!: string | null

  @OneToMany(() => Proizvod, (proizvod) => proizvod.kategorija)
  proizvods!: Proizvod[]
}
