import { MigrationInterface, QueryRunner } from 'typeorm'

export class addPortfolio1671441965912 implements MigrationInterface {
  name = 'addPortfolio1671441965912'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "portfolio" character varying NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "portfolio"`)
  }
}
