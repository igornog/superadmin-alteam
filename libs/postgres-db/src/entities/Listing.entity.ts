import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Availability, Difficulty, ListingType, Role, WorkType } from '@yjcapp/app'

@Entity({ name: 'listing' })
export class ListingEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column({ type: 'varchar', name: 'listing_name' })
  listingName: string

  @Column({ type: 'varchar' })
  individuals: number

  @Column({ type: 'varchar' })
  workType: WorkType

  @Column({ type: 'varchar', nullable: true })
  timeZone: string

  @Column({ type: 'varchar' })
  availability: Availability

  @Column({ type: 'int' })
  projectLength: number

  @Column({ type: 'text' })
  startDate: Date

  @Column({ type: 'text', nullable: true })
  exactRate: number

  @Column({ type: 'text', nullable: true })
  rateFrom: number

  @Column({ type: 'text', nullable: true })
  rateTo: number

  @Column({ type: 'text' })
  difficulty: Difficulty

  @Column({ type: 'text', nullable: true })
  learningLink: string

  @Column({ type: 'text', array: true, nullable: true })
  roles: Role[]

  @Column({ type: 'text', array: true, name: 'skills', nullable: true })
  skills: string[]

  @Column({ type: 'text', array: true, nullable: true })
  questions: string[]

  @Column({ type: 'text', nullable: true })
  jobDescription: string

  @Column({ type: 'text' })
  status: ListingType
}
