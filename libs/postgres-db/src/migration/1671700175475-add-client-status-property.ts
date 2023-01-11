import { MigrationInterface, QueryRunner } from 'typeorm'

export class addClientStatusProperty1671700175475
  implements MigrationInterface
{
  name = 'addClientStatusProperty1671700175475'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "solo_client" ADD "status" character varying NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "solo_client" DROP COLUMN "status"`)
  }
}
