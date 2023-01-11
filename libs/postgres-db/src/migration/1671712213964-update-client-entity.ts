import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateClientEntity1671712213964 implements MigrationInterface {
  name = 'updateClientEntity1671712213964'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_client" ADD "applied_date" TIMESTAMP WITH TIME ZONE DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ADD "listings" character varying`,
    )
    await queryRunner.query(
      `ALTER TABLE "solo_client" ADD "assignee" character varying`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "solo_client" DROP COLUMN "assignee"`)
    await queryRunner.query(`ALTER TABLE "solo_client" DROP COLUMN "listings"`)
    await queryRunner.query(
      `ALTER TABLE "solo_client" DROP COLUMN "applied_date"`,
    )
  }
}
