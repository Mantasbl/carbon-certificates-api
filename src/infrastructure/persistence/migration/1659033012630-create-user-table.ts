import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1659033012630 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE "user" (
      "id" SERIAL NOT NULL, 
      "username" character varying NOT NULL, 
      "password" character varying NOT NULL, 
      CONSTRAINT "PK_d7f91167cda8f3f83929b7892fb" PRIMARY KEY ("id")
    )
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE "user"
  `);
  }
}
