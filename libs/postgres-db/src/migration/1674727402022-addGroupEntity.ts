import { MigrationInterface, QueryRunner } from "typeorm";

export class addGroupEntity1674727402022 implements MigrationInterface {
    name = 'addGroupEntity1674727402022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "parentId" integer, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "solo_talent_groups_group" ("soloTalentId" integer NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "PK_5ffd8a5926dab3d31160fe79467" PRIMARY KEY ("soloTalentId", "groupId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_deb8a7c1885b9fab0d9a421ed4" ON "solo_talent_groups_group" ("soloTalentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3e6fef0783170e0d070341264a" ON "solo_talent_groups_group" ("groupId") `);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "FK_105c4fcefc250c0e90f3677993b" FOREIGN KEY ("parentId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solo_talent_groups_group" ADD CONSTRAINT "FK_deb8a7c1885b9fab0d9a421ed41" FOREIGN KEY ("soloTalentId") REFERENCES "solo_talent"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "solo_talent_groups_group" ADD CONSTRAINT "FK_3e6fef0783170e0d070341264ae" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solo_talent_groups_group" DROP CONSTRAINT "FK_3e6fef0783170e0d070341264ae"`);
        await queryRunner.query(`ALTER TABLE "solo_talent_groups_group" DROP CONSTRAINT "FK_deb8a7c1885b9fab0d9a421ed41"`);
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "FK_105c4fcefc250c0e90f3677993b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3e6fef0783170e0d070341264a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_deb8a7c1885b9fab0d9a421ed4"`);
        await queryRunner.query(`DROP TABLE "solo_talent_groups_group"`);
        await queryRunner.query(`DROP TABLE "group"`);
    }

}
