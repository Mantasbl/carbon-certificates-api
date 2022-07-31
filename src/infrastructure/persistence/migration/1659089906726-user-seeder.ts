import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserSeeder1659089906726 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "user" ("username","password")
    VALUES
      ('ac@yahoo.edu','zf8IKRkCgubAmkbI/4Uwvj8kLvctp0Crvb+I599jgks='),
      ('natoque.penatibus.et@hotmail.com','zf8IKRkCgubAmkbI/4Uwvj8kLvctp0Crvb+I599jgks='),
      ('purus.duis@google.couk','zf8IKRkCgubAmkbI/4Uwvj8kLvctp0Crvb+I599jgks='),
      ('enim.mi@hotmail.org','zf8IKRkCgubAmkbI/4Uwvj8kLvctp0Crvb+I599jgks='),
      ('nullam.feugiat@yahoo.net','zf8IKRkCgubAmkbI/4Uwvj8kLvctp0Crvb+I599jgks='),
      ('curabitur.dictum.phasellus@yahoo.net','zf8IKRkCgubAmkbI/4Uwvj8kLvctp0Crvb+I599jgks='),
      ('curabitur.sed.tortor@protonmail.com','zf8IKRkCgubAmkbI/4Uwvj8kLvctp0Crvb+I599jgks='),
      ('varius.et@protonmail.ca','zf8IKRkCgubAmkbI/4Uwvj8kLvctp0Crvb+I599jgks='),
      ('proin@hotmail.com','zf8IKRkCgubAmkbI/4Uwvj8kLvctp0Crvb+I599jgks='),
      ('id@hotmail.couk','zf8IKRkCgubAmkbI/4Uwvj8kLvctp0Crvb+I599jgks=')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "user" CASCADE`);
  }
}
