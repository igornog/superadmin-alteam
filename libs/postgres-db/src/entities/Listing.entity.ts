import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import {
  Availability,
  Currency,
  Difficulty,
  ListingState,
  ListingType,
  Role,
  WorkType,
} from '@yjcapp/app'
import { SoloClientEntity } from './SoloClient.entity'

@Entity({ name: 'listing' })
export class ListingEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @ManyToOne(() => SoloClientEntity, (soloClient) => soloClient.listings)
  soloClient: SoloClientEntity

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

  @Column({ type: 'timestamptz', nullable: true })
  startDate: Date

  @Column({ type: 'text', nullable: true })
  exactRate: number

  @Column({ type: 'text', nullable: true })
  currency: Currency

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
  listingType: ListingType

  @Column({ type: 'text' })
  status: ListingState
}
