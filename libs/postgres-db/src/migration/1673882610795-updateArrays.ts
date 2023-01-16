import { MigrationInterface, QueryRunner } from "typeorm";

export class updateArrays1673882610795 implements MigrationInterface {
    name = 'updateArrays1673882610795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_project" DROP CONSTRAINT "FK_95e416127c2498a90a1a4597e9e"`);
        await queryRunner.query(`ALTER TABLE "client_team" DROP CONSTRAINT "FK_66f5b62ce21ef28801cb27f953a"`);
        await queryRunner.query(`ALTER TABLE "client_project" DROP COLUMN "soloClientId"`);
        await queryRunner.query(`ALTER TABLE "client_team" DROP COLUMN "soloClientId"`);
        await queryRunner.query(`ALTER TABLE "client_project" DROP COLUMN "skills"`);
        await queryRunner.query(`ALTER TABLE "client_project" ADD "skills" text array`);
        await queryRunner.query(`ALTER TABLE "client_project" DROP COLUMN "questions"`);
        await queryRunner.query(`ALTER TABLE "client_project" ADD "questions" text array`);
        await queryRunner.query(`ALTER TABLE "client_team" DROP COLUMN "roles"`);
        await queryRunner.query(`ALTER TABLE "client_team" ADD "roles" text array`);
        await queryRunner.query(`ALTER TABLE "client_team" DROP COLUMN "skills"`);
        await queryRunner.query(`ALTER TABLE "client_team" ADD "skills" text array`);
        await queryRunner.query(`ALTER TABLE "client_team" DROP COLUMN "questions"`);
        await queryRunner.query(`ALTER TABLE "client_team" ADD "questions" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_team" DROP COLUMN "questions"`);
        await queryRunner.query(`ALTER TABLE "client_team" ADD "questions" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_team" DROP COLUMN "skills"`);
        await queryRunner.query(`ALTER TABLE "client_team" ADD "skills" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_team" DROP COLUMN "roles"`);
        await queryRunner.query(`ALTER TABLE "client_team" ADD "roles" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_project" DROP COLUMN "questions"`);
        await queryRunner.query(`ALTER TABLE "client_project" ADD "questions" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_project" DROP COLUMN "skills"`);
        await queryRunner.query(`ALTER TABLE "client_project" ADD "skills" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_team" ADD "soloClientId" integer`);
        await queryRunner.query(`ALTER TABLE "client_project" ADD "soloClientId" integer`);
        await queryRunner.query(`ALTER TABLE "client_team" ADD CONSTRAINT "FK_66f5b62ce21ef28801cb27f953a" FOREIGN KEY ("soloClientId") REFERENCES "solo_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_project" ADD CONSTRAINT "FK_95e416127c2498a90a1a4597e9e" FOREIGN KEY ("soloClientId") REFERENCES "solo_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
