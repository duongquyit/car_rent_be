import { dataSourceOptions } from 'database/data-source';
import { DataSource } from 'typeorm';

export default new DataSource({
  ...dataSourceOptions,
  migrations: [__dirname + '/migrations/*.js'],
  migrationsTableName: 'migrations',
});
