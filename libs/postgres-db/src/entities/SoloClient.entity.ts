import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import {
  ClientStatus,
  DeliveryType,
  ProjectType,
  TeamRequest,
} from '@yjcapp/app'

@Entity({ name: 'solo_client' })
export class SoloClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column({ type: 'varchar', nullable: true })
  logo?: string

  @Column({ type: 'varchar' })
  companyName: string

  @Column({ type: 'varchar' })
  phoneNumber: string

  @Column({ type: 'varchar' })
  companyUrl: string

  @Column({ type: 'varchar' })
  linkedinUrl?: string

  @Column({ type: 'varchar' })
  industry?: string

  @Column({ type: 'varchar' })
  projectType?: ProjectType

  @Column({ type: 'varchar' })
  deliveryType?: DeliveryType

  @Column({ type: 'varchar' })
  teamRequest?: TeamRequest

  @Column({ type: 'varchar' })
  request?: string

  @Column({ type: 'varchar' })
  email?: string

  @Column({ type: 'varchar' })
  fullName?: string

  @Column({ type: 'varchar' })
  position?: string

  @Column({ type: 'varchar' })
  status: ClientStatus
}
