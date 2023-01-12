import { MigrationInterface, QueryRunner } from "typeorm";

export class paymentMethods1673254844818 implements MigrationInterface {
    name = 'paymentMethods1673254844818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`payment_methods\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(30) NULL, \`informations\` json NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order-details\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`order_id\` int NULL, \`car_id\` int NULL, \`quantity\` int NULL, \`pick_up_city_id\` int NULL, \`pick_up_datetime\` datetime NULL, \`drop_off_city_id\` int NULL, \`drop_off_datetime\` datetime NULL, \`sub_totals\` decimal(10,2) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`paymentMethodId\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`paymentMethodId\``);
        await queryRunner.query(`DROP TABLE \`order-details\``);
        await queryRunner.query(`DROP TABLE \`payment_methods\``);
    }

}
