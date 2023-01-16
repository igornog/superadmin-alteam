import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Availability, Difficulty, Role, WorkType } from '@yjcapp/app'
import { SoloClientEntity } from './SoloClient.entity'

@Entity({ name: 'client_team' })
export class ClientTeamEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @ManyToOne(() => SoloClientEntity, (soloClient) => soloClient.teams)
  soloClient: SoloClientEntity

  @Column({ type: 'varchar', name: 'team_name' })
  teamName: string

  @Column({ type: 'varchar' })
  teamSize: number

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

  @Column({ type: 'text' })
  difficulty: Difficulty

  @Column({ type: 'text', nullable: true })
  learningLink: string

  @Column({ type: 'text' })
  roles: Role[]

  @Column({ type: 'text' })
  skills: string[]

  @Column({ type: 'text' })
  questions: string[]

  @Column({ type: 'text', nullable: true })
  jobDescription: string
}
