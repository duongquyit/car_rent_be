import { DataSource, DataSourceOptions } from 'typeorm';
import { configMigration } from './config.migration';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: configMigration.host,
  port: configMigration.port,
  username: configMigration.username,
  password: configMigration.password,
  database: configMigration.database,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*.js'],
  migrationsRun: true,
  synchronize: false,
  logging: true,
};
