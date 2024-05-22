import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Index('NewsletterPrijava_pkey', ['id'], { unique: true })
@Entity('NewsletterPrijava', { schema: 'public' })
export default class NewsletterPrijava extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('character varying', { name: 'email', nullable: true, length: 255 })
  email!: string | null
}
