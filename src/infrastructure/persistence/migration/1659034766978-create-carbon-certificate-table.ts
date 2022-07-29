import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCarbonCertificateTable1659034766978 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TYPE "carbon_certificate_status_type" AS ENUM('AVAILABLE', 'OWNED', 'TRANSFERED')
  `);
    await queryRunner.query(`
    CREATE TABLE "carbon_certificate" (
      "id" SERIAL NOT NULL, 
      "country" character varying NOT NULL, 
      "status" "carbon_certificate_status_type" NOT NULL, 
      "owner_id" INTEGER NULL, 
      CONSTRAINT "PK_10dd23dd7b6590577c1d90c2228" PRIMARY KEY ("id")
    )
  `);
    await queryRunner.query(`
  ALTER TABLE "carbon_certificate" ADD CONSTRAINT "FK_b27c48fa760d473d79cf8fd9692" 
  FOREIGN KEY ("owner_id") REFERENCES "user"("id")
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE "carbon_certificate"
  `);
    await queryRunner.query(`
    DROP TYPE "carbon_certificate_status_type"
  `);
  }
}
