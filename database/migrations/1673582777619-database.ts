import { MigrationInterface, QueryRunner } from "typeorm";

export class database1673582777619 implements MigrationInterface {
    name = 'database1673582777619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`car_favorites\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NULL, \`car_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`paymentMethodId\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`paymentMethodId\``);
        await queryRunner.query(`DROP TABLE \`car_favorites\``);
    }

}
