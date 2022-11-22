import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'group_talent'})
export class GroupTalentEntity extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number;
  @Column({type: 'varchar', name: 'email'})
  email: string;
  @Column({type: 'varchar', name: 'phone'})
  phone: string;
  @Column({type: 'varchar', name: 'speciality'})
  speciality: string;
  @Column({type: 'varchar', name: 'size'})
  size: string;
  @Column({type: 'varchar', name: 'website'})
  website: string;
  @Column({type: 'text', name: 'about'})
  about: string;
  @Column({type: 'varchar', array: true, name: 'assets'})
  assets: string[];
}
