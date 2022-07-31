import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserSeeder1659089906726 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "user" ("username","password")
    VALUES
      ('ac@yahoo.edu','GsveDv57hu38175L+nSZjqn8FR3uJ6T0/xD/rvdmAkg='),
      ('natoque.penatibus.et@hotmail.com','GsveDv57hu38175L+nSZjqn8FR3uJ6T0/xD/rvdmAkg='),
      ('purus.duis@google.couk','GsveDv57hu38175L+nSZjqn8FR3uJ6T0/xD/rvdmAkg='),
      ('enim.mi@hotmail.org','GsveDv57hu38175L+nSZjqn8FR3uJ6T0/xD/rvdmAkg='),
      ('nullam.feugiat@yahoo.net','GsveDv57hu38175L+nSZjqn8FR3uJ6T0/xD/rvdmAkg='),
      ('curabitur.dictum.phasellus@yahoo.net','GsveDv57hu38175L+nSZjqn8FR3uJ6T0/xD/rvdmAkg='),
      ('curabitur.sed.tortor@protonmail.com','GsveDv57hu38175L+nSZjqn8FR3uJ6T0/xD/rvdmAkg='),
      ('varius.et@protonmail.ca','GsveDv57hu38175L+nSZjqn8FR3uJ6T0/xD/rvdmAkg='),
      ('proin@hotmail.com','GsveDv57hu38175L+nSZjqn8FR3uJ6T0/xD/rvdmAkg='),
      ('id@hotmail.couk','GsveDv57hu38175L+nSZjqn8FR3uJ6T0/xD/rvdmAkg=')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "user" CASCADE`);
  }
}
