import { MigrationInterface, QueryRunner } from 'typeorm'

export class test1671616976805 implements MigrationInterface {
  name = 'test1671616976805'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "skills"`)
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "skills" text array NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "skills"`)
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "skills" character varying array NOT NULL`,
    )
  }
}
