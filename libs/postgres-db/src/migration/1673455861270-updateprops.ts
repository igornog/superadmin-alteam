import { MigrationInterface, QueryRunner } from "typeorm";

export class updateprops1673455861270 implements MigrationInterface {
    name = 'updateprops1673455861270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_project" RENAME COLUMN "skill" TO "skills"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_project" RENAME COLUMN "skills" TO "skill"`);
    }

}
