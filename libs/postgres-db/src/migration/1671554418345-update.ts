import { MigrationInterface, QueryRunner } from 'typeorm'

export class update1671554418345 implements MigrationInterface {
  name = 'update1671554418345'

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
