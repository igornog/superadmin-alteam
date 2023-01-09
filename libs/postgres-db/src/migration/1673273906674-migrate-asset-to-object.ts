import { MigrationInterface, QueryRunner } from "typeorm";

export class migrateAssetToObject1673273906674 implements MigrationInterface {
    name = 'migrateAssetToObject1673273906674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solo_talent" ADD "portfolio" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solo_talent" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "availability"`);
        await queryRunner.query(`ALTER TABLE "solo_talent" ADD "availability" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "links"`);
        await queryRunner.query(`ALTER TABLE "solo_talent" ADD "links" json`);
        await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "assets"`);
        await queryRunner.query(`ALTER TABLE "solo_talent" ADD "assets" json array`);
        await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "skills"`);
        await queryRunner.query(`ALTER TABLE "solo_talent" ADD "skills" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solo_talent" ALTER COLUMN "applied_date" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solo_talent" ALTER COLUMN "applied_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "skills"`);
        await queryRunner.query(`ALTER TABLE "solo_talent" ADD "skills" character varying array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "assets"`);
        await queryRunner.query(`ALTER TABLE "solo_talent" ADD "assets" character varying array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "links"`);
        await queryRunner.query(`ALTER TABLE "solo_talent" ADD "links" character varying array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "availability"`);
        await queryRunner.query(`ALTER TABLE "solo_talent" ADD "availability" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "portfolio"`);
    }

}
