import { MigrationInterface, QueryRunner } from 'typeorm'

export class nullValue1673601251875 implements MigrationInterface {
  name = 'nullValue1673601251875'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "solo_client" DROP COLUMN "listings"`)
    await queryRunner.query(
      `ALTER TABLE "client_project" ALTER COLUMN "timeZone" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client_project" ALTER COLUMN "timeZone" SET NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "solo_client" ADD "listings" json`)
  }
}
