import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {
  Availability,
  Experience,
  Link,
  Listing,
  ListingStatus,
} from '@yjcapp/app'

@Entity({ name: 'solo_talent' })
export class SoloTalentEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column({ type: 'varchar', name: 'first_name' })
  firstName: string

  @Column({ type: 'varchar', name: 'last_name' })
  lastName: string

  @Column({ type: 'varchar', name: 'experience' })
  experience: Experience

  @Column({ type: 'varchar', name: 'availability' })
  availability: Availability

  @Column({ type: 'varchar', name: 'portfolio' })
  portfolio: string

  @Column({ type: 'json', nullable: true, name: 'links' })
  links?: Link[]

  @Column({ type: 'varchar', name: 'role' })
  role: string

  @Column({ type: 'varchar', name: 'email' })
  email: string

  @Column({ type: 'text', name: 'about' })
  about: string

  @Column({ type: 'varchar', array: true, name: 'assets' })
  assets?: string[]

  @Column({ type: 'text', array: true, name: 'skills' })
  skills: string[]

  @Column({ type: 'json', name: 'listing', nullable: true })
  listings?: Listing[]

  @Column({ type: 'varchar', nullable: true, name: 'phone_number' })
  phoneNumber?: string

  @Column({ type: 'varchar', nullable: true, name: 'salary_expectation' })
  salaryExpectation?: string

  @Column({ type: 'varchar', nullable: true, name: 'work_experience' })
  workExperience?: string

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: true,
    name: 'applied_date',
  })
  appliedDate?: Date

  @Column({ type: 'varchar', name: 'status' })
  status: ListingStatus
}
