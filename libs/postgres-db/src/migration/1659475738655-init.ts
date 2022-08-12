import { MigrationInterface, QueryRunner } from "typeorm";

export class init1659475738655 implements MigrationInterface {
    name = 'init1659475738655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "freelancer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_7e7807b0f4224ee2ab8a11f8e5d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "freelancer"`);
    }

}
