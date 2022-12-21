import { MigrationInterface, QueryRunner } from 'typeorm'

export class editPortfolio1671443077440 implements MigrationInterface {
  name = 'editPortfolio1671443077440'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "links"`)
    await queryRunner.query(`ALTER TABLE "solo_talent" ADD "links" json`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "links"`)
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "links" json array NOT NULL`,
    )
  }
}
