import { MigrationInterface, QueryRunner } from 'typeorm'

export class addEmail1670839467202 implements MigrationInterface {
  name = 'addEmail1670839467202'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_talent" ADD "email" character varying NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "email"`)
  }
}
