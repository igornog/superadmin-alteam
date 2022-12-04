import { MigrationInterface, QueryRunner } from "typeorm";

export class init1669833720792 implements MigrationInterface {
    name = 'init1669833720792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group_talent" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "speciality" character varying NOT NULL, "size" character varying NOT NULL, "website" character varying NOT NULL, "about" text NOT NULL, "assets" character varying array NOT NULL, CONSTRAINT "PK_99c9639b7c445c9b505572370eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "solo_talent" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "experience" character varying NOT NULL, "availability" character varying NOT NULL, "links" character varying array NOT NULL, "role" character varying NOT NULL, "about" text NOT NULL, "assets" character varying array NOT NULL, "skills" character varying array NOT NULL, "listing" json NOT NULL, "phone_number" character varying, "salary_expectation" character varying, "work_experience" character varying, "applied_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d342ef8dc4d29d251812aeb69a7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "solo_talent"`);
        await queryRunner.query(`DROP TABLE "group_talent"`);
    }

}
