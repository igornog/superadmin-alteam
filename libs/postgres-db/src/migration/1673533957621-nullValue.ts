import { MigrationInterface, QueryRunner } from 'typeorm'

export class nullValue1673533957621 implements MigrationInterface {
  name = 'nullValue1673533957621'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client_project" ALTER COLUMN "rateType" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client_project" ALTER COLUMN "rateType" SET NOT NULL`,
    )
  }
}
