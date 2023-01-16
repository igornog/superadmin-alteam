import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateFields1673684558874 implements MigrationInterface {
  name = 'updateFields1673684558874'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client_project" RENAME COLUMN "projectName" TO "project_name"`,
    )
    await queryRunner.query(
      `ALTER TABLE "client_team" RENAME COLUMN "teamName" TO "team_name"`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client_team" RENAME COLUMN "team_name" TO "teamName"`,
    )
    await queryRunner.query(
      `ALTER TABLE "client_project" RENAME COLUMN "project_name" TO "projectName"`,
    )
  }
}
