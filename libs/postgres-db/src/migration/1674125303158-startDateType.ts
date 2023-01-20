import { MigrationInterface, QueryRunner } from 'typeorm'

export class startDateType1674125303158 implements MigrationInterface {
  name = 'startDateType1674125303158'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "startDate"`)
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "startDate" TIMESTAMP WITH TIME ZONE`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "startDate"`)
    await queryRunner.query(`ALTER TABLE "listing" ADD "startDate" text`)
  }
}
