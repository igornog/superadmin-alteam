import { MigrationInterface, QueryRunner } from 'typeorm'

export class nullValue1673534057720 implements MigrationInterface {
  name = 'nullValue1673534057720'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client_project" ALTER COLUMN "rateTo" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client_project" ALTER COLUMN "rateTo" SET NOT NULL`,
    )
  }
}
