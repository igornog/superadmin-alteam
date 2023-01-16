import { MigrationInterface, QueryRunner } from 'typeorm'

export class addClientTeamEntity1673624838762 implements MigrationInterface {
  name = 'addClientTeamEntity1673624838762'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "client_team" ("id" SERIAL NOT NULL, "teamName" character varying NOT NULL, "teamSize" character varying NOT NULL, "workType" character varying NOT NULL, "timeZone" character varying, "availability" character varying NOT NULL, "projectLength" text NOT NULL, "startDate" text NOT NULL, "rateFrom" text, "rateTo" text, "difficulty" text NOT NULL, "learningLink" text, "roles" text NOT NULL, "skills" text NOT NULL, "questions" text NOT NULL, "jobDescription" text, "soloClientId" integer, CONSTRAINT "PK_230a7b5cdb4b5545ec09a31a4ef" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "client_project" DROP COLUMN "rateType"`,
    )
    await queryRunner.query(
      `ALTER TABLE "client_team" ADD CONSTRAINT "FK_66f5b62ce21ef28801cb27f953a" FOREIGN KEY ("soloClientId") REFERENCES "solo_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client_team" DROP CONSTRAINT "FK_66f5b62ce21ef28801cb27f953a"`,
    )
    await queryRunner.query(`ALTER TABLE "client_project" ADD "rateType" text`)
    await queryRunner.query(`DROP TABLE "client_team"`)
  }
}
