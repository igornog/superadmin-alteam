import { MigrationInterface, QueryRunner } from 'typeorm'

export class initClient1671698577742 implements MigrationInterface {
  name = 'initClient1671698577742'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "solo_client" ("id" SERIAL NOT NULL, "logo" character varying NOT NULL, "companyName" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "companyUrl" character varying NOT NULL, "linkedinUrl" character varying NOT NULL, "industry" character varying NOT NULL, "projectType" character varying NOT NULL, "deliveryType" character varying NOT NULL, "teamRequest" character varying NOT NULL, "request" character varying NOT NULL, "email" character varying NOT NULL, "fullName" character varying NOT NULL, "position" character varying NOT NULL, CONSTRAINT "PK_1971d6cb2edc33490231b3a400f" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "solo_client"`)
  }
}
