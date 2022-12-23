import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {
  ClientStatus,
  DeliveryType,
  Listing,
  ProjectType,
  Talent,
  TeamRequest,
} from '@yjcapp/app'

@Entity({ name: 'solo_client' })
export class SoloClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column({ type: 'varchar', nullable: true })
  logo?: string

  @Column({ type: 'varchar', name: 'company_name' })
  companyName: string

  @Column({ type: 'varchar' })
  phoneNumber: string

  @Column({ type: 'varchar' })
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

  @Column({ type: 'varchar', nullable: true })
  email?: string

  @Column({ type: 'varchar', nullable: true })
  fullName?: string

  @Column({ type: 'varchar', nullable: true })
  position?: string

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: true,
    name: 'applied_date',
  })
  received?: Date

  @Column({ type: 'json', nullable: true })
  listings?: Listing[]

  @Column({ type: 'json', nullable: true })
  assignee?: Talent[]

  @Column({ type: 'varchar' })
  status: ClientStatus
}
