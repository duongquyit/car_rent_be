import { dataSourceOptions } from 'database/data-source';
import { DataSource } from 'typeorm';

export default new DataSource({
  ...dataSourceOptions,
  migrations: [__dirname + '/seeders/*.js'],
  migrationsTableName: 'seeders',
});
