import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserSeeder1659089906726 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "user" ("username","password")
    VALUES
      ('ac@yahoo.edu','OZN26WPR3LA'),
      ('natoque.penatibus.et@hotmail.com','WIX05NHR2FR'),
      ('purus.duis@google.couk','VZW24EDV6PH'),
      ('enim.mi@hotmail.org','YUI89TVR7LQ'),
      ('nullam.feugiat@yahoo.net','QFI16DPR5SD'),
      ('curabitur.dictum.phasellus@yahoo.net','CDN60KMU3AT'),
      ('curabitur.sed.tortor@protonmail.com','ROS26QZV6QH'),
      ('varius.et@protonmail.ca','ZLH67IQW3MP'),
      ('proin@hotmail.com','NVV04WJL6DM'),
      ('id@hotmail.couk','CFB73HWS7EB')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "user" CASCADE`);
  }
}
