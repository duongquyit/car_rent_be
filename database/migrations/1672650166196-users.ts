import { MigrationInterface, QueryRunner } from 'typeorm';

export class users1672650166196 implements MigrationInterface {
  name = 'users1672650166196';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(30) NULL, \`last_name\` varchar(30) NULL, \`email\` varchar(50) NULL, \`username\` varchar(50) NULL, \`password\` varchar(255) NULL, \`address\` varchar(50) NULL, \`phone_number\` varchar(15) NULL, \`avatar_path\` varchar(255) NULL, \`position\` varchar(50) NULL, UNIQUE INDEX \`idx_users_email\` (\`email\`), UNIQUE INDEX \`idx_users_username\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`idx_users_username\` ON \`users\``);
    await queryRunner.query(`DROP INDEX \`idx_users_email\` ON \`users\``);
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
