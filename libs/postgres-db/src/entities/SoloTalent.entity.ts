import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'solo_talent'})
export class SoloTalentEntity extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number;
  @Column({type: 'varchar', name: 'first_name'})
  firstName: string;
  @Column({type: 'varchar', name: 'last_name'})
  lastName: string;
  @Column({type: 'varchar', name: 'experience'})
  experience: string;
  @Column({type: 'varchar', name: 'availability'})
  availability: string;
  @Column({type: 'varchar', name: 'portfolio_link'})
  portfolioLink: string;
  @Column({type: 'varchar', name: 'role'})
  role: string;
  @Column({type: 'text', name: 'about'})
  about: string;
  @Column({type: 'varchar', array: true, name: 'assets'})
  assets: string[];

  @Column({type: 'varchar', array: true, name: 'skills'})
  skills: string[];
}
