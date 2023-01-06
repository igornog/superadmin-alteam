import { MigrationInterface, QueryRunner } from 'typeorm'

export class removeArrayFromTalent1672932732347 implements MigrationInterface {
  name = 'removeArrayFromTalent1672932732347'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_talent" DROP COLUMN "availability"`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "availability" text NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_talent" DROP COLUMN "availability"`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "availability" text array NOT NULL`,
    )
  }
}
