import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Availability, Difficulty, WorkType } from '@yjcapp/app'
import { SoloClientEntity } from './SoloClient.entity'

@Entity({ name: 'client_project' })
export class ClientProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @ManyToOne(() => SoloClientEntity, (soloClient) => soloClient.projects)
  soloClient: SoloClientEntity

  @Column({ type: 'varchar', name: 'project_name' })
  projectName: string

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
  rateFrom: number

  @Column({ type: 'text', nullable: true })
  rateTo: number

  @Column({ type: 'text' })
  difficulty: Difficulty

  @Column({ type: 'text', nullable: true })
  learningLink: string

  @Column({ type: 'text' })
  jobDescription: string

  @Column({ type: 'text' })
  skills: string[]

  @Column({ type: 'text' })
  questions: string[]
}
