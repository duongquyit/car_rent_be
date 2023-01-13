import { MigrationInterface, QueryRunner } from "typeorm";

export class addDatetimeAtCarFavorite1673585156299 implements MigrationInterface {
    name = 'addDatetimeAtCarFavorite1673585156299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car_favorites\` ADD \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`car_favorites\` ADD \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`car_favorites\` ADD \`deleted_at\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car_favorites\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`car_favorites\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`car_favorites\` DROP COLUMN \`created_at\``);
    }

}
