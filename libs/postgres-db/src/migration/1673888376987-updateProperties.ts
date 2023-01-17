import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateProperties1673888376987 implements MigrationInterface {
  name = 'updateProperties1673888376987'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "listing" ALTER COLUMN "startDate" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "listing" ALTER COLUMN "startDate" SET NOT NULL`,
    )
  }
}
