import { MigrationInterface, QueryRunner } from "typeorm";

export class init1674573477922 implements MigrationInterface {
    name = 'init1674573477922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "assets"`);
        await queryRunner.query(`ALTER TABLE "solo_talent" ADD "assets" json array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "assets"`);
        await queryRunner.query(`ALTER TABLE "solo_talent" ADD "assets" character varying array NOT NULL`);
    }

}
