import { DataSource } from 'typeorm';
import * as path from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

const getDbPath = () => {
  return path.join(__dirname, '../migrations');
};

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.MONGO_URI || 'mongodb://root:root@localhost:27017/lead_intake_funnel?authSource=admin',
  synchronize: false,
  logging: true,
  migrations: [path.join(getDbPath(), '/**/*.{ts,js}')],
  entities: [path.join(__dirname, '../**/*.entity.{ts,js}')],
});
