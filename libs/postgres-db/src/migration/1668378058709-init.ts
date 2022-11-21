import { MigrationInterface, QueryRunner } from "typeorm";

export class init1668378058709 implements MigrationInterface {
    name = 'init1668378058709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group_talent" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "speciality" character varying NOT NULL, "size" character varying NOT NULL, "website" character varying NOT NULL, "about" text NOT NULL, "assets" character varying array NOT NULL, CONSTRAINT "PK_99c9639b7c445c9b505572370eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "solo_talent" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "experience" character varying NOT NULL, "availability" character varying NOT NULL, "portfolio_link" character varying NOT NULL, "role" character varying NOT NULL, "about" text NOT NULL, "assets" character varying array NOT NULL, "skills" character varying array NOT NULL, CONSTRAINT "PK_d342ef8dc4d29d251812aeb69a7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "solo_talent"`);
        await queryRunner.query(`DROP TABLE "group_talent"`);
    }

}
