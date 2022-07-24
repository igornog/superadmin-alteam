import { DataSource } from 'typeorm';
import * as entities from './entities';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_ADDRESS ?? "localhost",
  username: process.env.DB_USERNAME ?? "postgres",
  password: process.env.DB_PASSWORD ?? "postgres",
  database: process.env.DB_NAME ?? "postgres",
  entities: Object.values(entities),
  migrations: [`${__dirname}/migration/*.ts`],
  synchronize: false
});

