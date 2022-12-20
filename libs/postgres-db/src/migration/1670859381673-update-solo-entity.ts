import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateSoloEntity1670859381673 implements MigrationInterface {
  name = 'updateSoloEntity1670859381673'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ALTER COLUMN "applied_date" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ALTER COLUMN "applied_date" SET NOT NULL`,
    )
  }
}
