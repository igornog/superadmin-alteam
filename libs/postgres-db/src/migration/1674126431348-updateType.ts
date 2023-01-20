import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateType1674126431348 implements MigrationInterface {
  name = 'updateType1674126431348'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "listingType" text NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "listingType"`)
  }
}
