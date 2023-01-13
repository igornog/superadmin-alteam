import { MigrationInterface, QueryRunner } from 'typeorm'

export class updated1673619687985 implements MigrationInterface {
  name = 'updated1673619687985'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client_project" ALTER COLUMN "learningLink" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client_project" ALTER COLUMN "learningLink" SET NOT NULL`,
    )
  }
}
