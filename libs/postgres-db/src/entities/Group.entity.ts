import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm'
import { GroupTalentEntity } from './GroupTalent.entity'
import { SoloClientEntity } from './SoloClient.entity'
import { SoloTalentEntity } from './SoloTalent.entity'

@Entity({ name: 'group' })
export class GroupEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column({ type: 'varchar' })
  name: string

  @OneToOne(() => SoloClientEntity, (client) => client.id, {
    nullable: true,
  })
  client: SoloClientEntity

  @OneToMany(() => SoloTalentEntity, (talent) => talent.id, {
    nullable: true,
  })
  talents: SoloTalentEntity[]

  @OneToMany(() => GroupTalentEntity, (talent) => talent.id, {
    nullable: true,
  })
  groupTalents: GroupTalentEntity[]

  @OneToMany(() => GroupEntity, (subGroup) => subGroup.id, {
    nullable: true,
  })
  subGroups: GroupEntity[]

  @OneToOne(() => GroupEntity, (group) => group.id, {
    nullable: true,
  })
  parent: GroupEntity
}
