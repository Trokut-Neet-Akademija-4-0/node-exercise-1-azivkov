import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Index('KontaktUpit_pkey', ['id'], { unique: true })
@Entity('KontaktUpit', { schema: 'public' })
export default class KontaktUpit extends BaseEntity {
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

  @Column('character varying', { name: 'poruka', nullable: true })
  poruka!: string | null
}
