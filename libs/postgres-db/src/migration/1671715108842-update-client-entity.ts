import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateClientEntity1671715108842 implements MigrationInterface {
  name = 'updateClientEntity1671715108842'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_client" RENAME COLUMN "companyName" TO "company_name"`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_talent" DROP COLUMN "availability"`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "availability" text array NOT NULL`,
    )
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
    await queryRunner.query(
      `ALTER TABLE "solo_talent" DROP COLUMN "availability"`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "availability" character varying NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" RENAME COLUMN "company_name" TO "companyName"`,
    )
  }
}
