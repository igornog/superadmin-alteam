import { MigrationInterface, QueryRunner } from "typeorm";

export class undefined1673428741142 implements MigrationInterface {
    name = 'undefined1673428741142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client_project" ("id" SERIAL NOT NULL, "projectName" character varying NOT NULL, "individuals" character varying NOT NULL, "workType" character varying NOT NULL, "timeZone" character varying NOT NULL, "availability" character varying NOT NULL, "projectLength" text NOT NULL, "startDate" text NOT NULL, "rateType" text NOT NULL, "rateFrom" text NOT NULL, "rateTo" text NOT NULL, "difficulty" text NOT NULL, "learningLink" text NOT NULL, "jobDescription" text NOT NULL, "skill" text NOT NULL, "questions" text NOT NULL, "soloClientId" integer, CONSTRAINT "PK_754b76225cf2bf6ee5599108a33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "client_project" ADD CONSTRAINT "FK_95e416127c2498a90a1a4597e9e" FOREIGN KEY ("soloClientId") REFERENCES "solo_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_project" DROP CONSTRAINT "FK_95e416127c2498a90a1a4597e9e"`);
        await queryRunner.query(`DROP TABLE "client_project"`);
    }

}
