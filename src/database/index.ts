import { Pool } from 'pg';
import { 
  FileMigrationProvider, 
  Kysely,
  Migrator, 
  PostgresDialect 
} from 'kysely';
import { Database } from './interfaces/Database';
import EnvVars from '../constants/EnvVars';
import logger from 'jet-logger';
import path from 'path';
import fs from 'fs/promises';
import '../pre-start';

const db = new Kysely<Database>({
  dialect : new PostgresDialect({
    pool : new Pool({
      host : EnvVars.Database.Host,
      database : EnvVars.Database.Name,
      user : EnvVars.Database.User,
      password : EnvVars.Database.Password,
      port : EnvVars.Database.Port,
    }),
    onCreateConnection(connection) {
      logger.info(connection, true);
      logger.info('Database Connected Succesfully!');
      return Promise.resolve();
    },
  }),
}); 


export const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    migrationFolder: path.resolve(__dirname, './migrations'),
    fs,
    path,
  }),
  migrationTableName: 'migration_metadata',
});

export default db;


