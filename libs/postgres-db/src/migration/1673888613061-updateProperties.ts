import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateProperties1673888613061 implements MigrationInterface {
  name = 'updateProperties1673888613061'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "listing" ADD "soloClientId" integer`)
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "FK_5793e900c27e5062fb69c6efa49" FOREIGN KEY ("soloClientId") REFERENCES "solo_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "listing" DROP CONSTRAINT "FK_5793e900c27e5062fb69c6efa49"`,
    )
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "soloClientId"`)
  }
}
