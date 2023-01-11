import { MigrationInterface, QueryRunner } from 'typeorm'

export class update1672748244301 implements MigrationInterface {
  name = 'update1672748244301'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "company_name" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "phoneNumber" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "companyUrl" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "companyUrl" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "phoneNumber" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "company_name" SET NOT NULL`,
    )
  }
}
