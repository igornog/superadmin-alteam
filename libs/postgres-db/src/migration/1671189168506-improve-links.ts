import { MigrationInterface, QueryRunner } from 'typeorm'

export class improveLinks1671189168506 implements MigrationInterface {
  name = 'improveLinks1671189168506'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "links"`)
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "links" json NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "links"`)
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "links" character varying array NOT NULL`,
    )
  }
}
