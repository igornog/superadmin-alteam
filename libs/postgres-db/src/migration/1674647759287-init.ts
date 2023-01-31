import { MigrationInterface, QueryRunner } from "typeorm";

export class init1674647759287 implements MigrationInterface {
    name = 'init1674647759287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group_talent" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "speciality" character varying NOT NULL, "size" character varying NOT NULL, "website" character varying NOT NULL, "about" text NOT NULL, "assets" character varying array NOT NULL, CONSTRAINT "PK_99c9639b7c445c9b505572370eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "solo_talent" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "experience" character varying NOT NULL, "availability" text NOT NULL, "portfolio" character varying NOT NULL, "links" json, "role" character varying NOT NULL, "email" character varying NOT NULL, "about" text NOT NULL, "assets" json array, "skills" text array NOT NULL, "phone_number" character varying, "salary_expectation" character varying, "work_experience" character varying, "applied_date" TIMESTAMP WITH TIME ZONE DEFAULT now(), "status" character varying NOT NULL, CONSTRAINT "PK_d342ef8dc4d29d251812aeb69a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "listing" ("id" SERIAL NOT NULL, "listing_name" character varying NOT NULL, "individuals" character varying NOT NULL, "workType" character varying NOT NULL, "timeZone" character varying, "availability" character varying NOT NULL, "projectLength" integer NOT NULL, "startDate" TIMESTAMP WITH TIME ZONE, "exactRate" text, "currency" text, "rateFrom" text, "rateTo" text, "difficulty" text NOT NULL, "learningLink" text, "roles" text array, "skills" text array, "questions" text array, "jobDescription" text, "listingType" text NOT NULL, "status" text NOT NULL, "soloClientId" integer, CONSTRAINT "PK_381d45ebb8692362c156d6b87d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "solo_client" ("id" SERIAL NOT NULL, "logo" character varying, "company_name" character varying, "phoneNumber" character varying, "companyUrl" character varying, "linkedinUrl" character varying, "industry" character varying, "projectType" character varying, "deliveryType" character varying, "teamRequest" character varying, "request" character varying, "email" character varying, "fullName" character varying, "position" character varying, "applied_date" TIMESTAMP WITH TIME ZONE DEFAULT now(), "assignee" json, "status" character varying NOT NULL, CONSTRAINT "PK_1971d6cb2edc33490231b3a400f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "listing" ADD CONSTRAINT "FK_5793e900c27e5062fb69c6efa49" FOREIGN KEY ("soloClientId") REFERENCES "solo_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listing" DROP CONSTRAINT "FK_5793e900c27e5062fb69c6efa49"`);
        await queryRunner.query(`DROP TABLE "solo_client"`);
        await queryRunner.query(`DROP TABLE "listing"`);
        await queryRunner.query(`DROP TABLE "solo_talent"`);
        await queryRunner.query(`DROP TABLE "group_talent"`);
    }

}
