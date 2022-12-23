import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateClientEntity1671712641111 implements MigrationInterface {
  name = 'updateClientEntity1671712641111'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "solo_client" DROP COLUMN "listings"`)
    await queryRunner.query(`ALTER TABLE "solo_client" ADD "listings" json`)
    await queryRunner.query(`ALTER TABLE "solo_client" DROP COLUMN "assignee"`)
    await queryRunner.query(`ALTER TABLE "solo_client" ADD "assignee" json`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "solo_client" DROP COLUMN "assignee"`)
    await queryRunner.query(
      `ALTER TABLE "solo_client" ADD "assignee" character varying`,
    )
    await queryRunner.query(`ALTER TABLE "solo_client" DROP COLUMN "listings"`)
    await queryRunner.query(
      `ALTER TABLE "solo_client" ADD "listings" character varying`,
    )
  }
}
