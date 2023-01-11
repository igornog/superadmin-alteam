import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateLogoClientProperty1671699761616
  implements MigrationInterface
{
  name = 'updateLogoClientProperty1671699761616'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "logo" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_client" ALTER COLUMN "logo" SET NOT NULL`,
    )
  }
}
