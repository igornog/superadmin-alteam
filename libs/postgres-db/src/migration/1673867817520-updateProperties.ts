import { MigrationInterface, QueryRunner } from "typeorm";

export class updateProperties1673867817520 implements MigrationInterface {
    name = 'updateProperties1673867817520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_team" DROP COLUMN "rateFrom"`);
        await queryRunner.query(`ALTER TABLE "client_team" DROP COLUMN "rateTo"`);
        await queryRunner.query(`ALTER TABLE "client_team" ADD "exactRate" text`);
        await queryRunner.query(`ALTER TABLE "client_project" DROP COLUMN "projectLength"`);
        await queryRunner.query(`ALTER TABLE "client_project" ADD "projectLength" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_team" DROP COLUMN "projectLength"`);
        await queryRunner.query(`ALTER TABLE "client_team" ADD "projectLength" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_team" DROP COLUMN "projectLength"`);
        await queryRunner.query(`ALTER TABLE "client_team" ADD "projectLength" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_project" DROP COLUMN "projectLength"`);
        await queryRunner.query(`ALTER TABLE "client_project" ADD "projectLength" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_team" DROP COLUMN "exactRate"`);
        await queryRunner.query(`ALTER TABLE "client_team" ADD "rateTo" text`);
        await queryRunner.query(`ALTER TABLE "client_team" ADD "rateFrom" text`);
    }

}
