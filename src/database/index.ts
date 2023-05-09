import EnvVars from '../constants/EnvVars';
import path from 'path';
import '../pre-start';
import { DataSource } from 'typeorm';

const db = new DataSource({
  type: 'postgres',
  host: EnvVars.Database.Host,
  database: EnvVars.Database.Name,
  username: EnvVars.Database.User,
  password: EnvVars.Database.Password,
  port: EnvVars.Database.Port,
  synchronize: true,
  logging: true,
  entities: [path.resolve(__dirname, '../entities/*.entity{.ts,.js}')],
  migrations: [path.resolve(__dirname, '../migrations')],
  logger: 'debug',
  subscribers: [],
});

export default db;
