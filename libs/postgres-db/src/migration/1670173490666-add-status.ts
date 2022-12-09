import { MigrationInterface, QueryRunner } from "typeorm";

export class addStatus1670173490666 implements MigrationInterface {
    name = 'addStatus1670173490666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solo_talent" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solo_talent" ALTER COLUMN "listing" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solo_talent" ALTER COLUMN "listing" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solo_talent" DROP COLUMN "status"`);
    }

}
