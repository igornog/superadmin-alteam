import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateClientEntity1671716183191 implements MigrationInterface {
  name = 'updateClientEntity1671716183191'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "linkedinUrl" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "industry" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "request" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "email" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "fullName" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "position" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "position" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "fullName" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "email" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "request" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "industry" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "linkedinUrl" SET NOT NULL`,
    )
  }
}
