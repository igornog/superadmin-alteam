import { MigrationInterface, QueryRunner } from 'typeorm'

export class addPortfolio1671442720156 implements MigrationInterface {
  name = 'addPortfolio1671442720156'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "links"`)
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "links" json array NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "links"`)
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "links" json NOT NULL`,
    )
  }
}
