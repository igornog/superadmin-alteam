import { MigrationInterface, QueryRunner } from 'typeorm'

export class upgradedTalentEntity1669551501562 implements MigrationInterface {
  name = 'upgradedTalentEntity1669551501562'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_talent" DROP COLUMN "portfolio_link"`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "links" character varying array NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "listing" json NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "phone_number" character varying`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "salary_expectation" character varying`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "work_experience" character varying`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "applied_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_talent" DROP COLUMN "applied_date"`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_talent" DROP COLUMN "work_experience"`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_talent" DROP COLUMN "salary_expectation"`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_talent" DROP COLUMN "phone_number"`,
    )
    await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "listing"`)
    await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "links"`)
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "portfolio_link" character varying NOT NULL`,
    )
  }
}
