import { MigrationInterface, QueryRunner } from "typeorm";

export class updateAvailability1671642853297 implements MigrationInterface {
    name = 'updateAvailability1671642853297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "availability"`);
        await queryRunner.query(`ALTER TABLE "solo_talent" ADD "availability" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "availability"`);
        await queryRunner.query(`ALTER TABLE "solo_talent" ADD "availability" character varying NOT NULL`);
    }

}
