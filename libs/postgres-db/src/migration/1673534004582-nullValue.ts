import { MigrationInterface, QueryRunner } from 'typeorm'

export class nullValue1673534004582 implements MigrationInterface {
  name = 'nullValue1673534004582'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client_project" ALTER COLUMN "rateFrom" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client_project" ALTER COLUMN "rateFrom" SET NOT NULL`,
    )
  }
}
