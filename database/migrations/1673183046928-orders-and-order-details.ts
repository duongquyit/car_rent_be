import { MigrationInterface, QueryRunner } from "typeorm";

export class ordersAndOrderDetails1673183046928 implements MigrationInterface {
    name = 'ordersAndOrderDetails1673183046928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`orders\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`payment_method_id\` int NOT NULL, \`promotion_id\` int NOT NULL, \`bill_name\` varchar(30) NOT NULL, \`bill_phone_number\` varchar(30) NOT NULL, \`bill_address\` varchar(30) NOT NULL, \`bill_city\` varchar(30) NOT NULL, \`bill_promo_code\` varchar(50) NOT NULL, \`bill_promo_type\` enum ('percent', 'absolute') NOT NULL, \`bill_promo_datetime_start\` datetime NOT NULL, \`bill_promo_datetime_end\` datetime NOT NULL, \`total\` decimal(10,2) NOT NULL, \`status\` enum ('open', 'inprogress', 'success', 'failed') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order-details\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`order_id\` int NULL, \`car_id\` int NULL, \`quantity\` int NULL, \`pick_up_city_id\` int NULL, \`pick_up_datetime\` datetime NULL, \`drop_off_city_id\` int NULL, \`drop_off_datetime\` datetime NULL, \`sub_totals\` decimal(10,2) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`order-details\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
    }

}
