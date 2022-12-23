import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateClientEntity1671715659065 implements MigrationInterface {
  name = 'updateClientEntity1671715659065'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "projectType" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "deliveryType" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "teamRequest" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "teamRequest" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "deliveryType" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "projectType" SET NOT NULL`,
    )
  }
}
