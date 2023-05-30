import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {
  ClientStatus,
  DeliveryType,
  EmailStatus,
  ProjectType,
  Talent,
  TeamRequest,
} from '@yjcapp/app'
import { ListingEntity } from './Listing.entity'

@Entity({ name: 'solo_client' })
export class SoloClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column({ type: 'varchar', nullable: true })
  logo?: string

  @Column({ type: 'varchar', name: 'company_name' })
  companyName: string

  @Column({ type: 'varchar', nullable: true })
  phoneNumber: string

  @Column({ type: 'varchar', nullable: true })
  companyUrl: string

  @Column({ type: 'varchar', nullable: true })
  linkedinUrl?: string

  @Column({ type: 'varchar', nullable: true })
  industry?: string

  @Column({ type: 'varchar', nullable: true })
  projectType?: ProjectType

  @Column({ type: 'varchar', nullable: true })
  deliveryType?: DeliveryType

  @Column({ type: 'varchar', nullable: true })
  teamRequest?: TeamRequest

  @Column({ type: 'varchar', nullable: true })
  request?: string

  @Column({ type: 'varchar' })
  email: string

  @Column({ type: 'varchar' })
  fullName: string

  @Column({ type: 'varchar' })
  position: string

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: true,
    name: 'applied_date',
  })
  received?: Date

  @OneToMany(() => ListingEntity, (clientListing) => clientListing.soloClient, {
    cascade: true,
  })
  listings: ListingEntity[]

  @Column({ type: 'json', nullable: true })
  assignee?: Talent[]

  @Column({ type: 'varchar', name: 'email_status', nullable: true })
  emailStatus: EmailStatus

  @Column({ type: 'varchar' })
  status: ClientStatus
}
