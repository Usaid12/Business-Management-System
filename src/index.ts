import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import db, { migrator } from './database';
import EnvVars from '@src/constants/EnvVars';
import server from './server';


async function bootstrap() {
  const SERVER_START_MSG = ('Express server started on port: ' + 
  EnvVars.Port.toString());

  db.connection()
    .execute(async (db) => {
      logger.info('DB Execution started');
      return Promise.resolve();
    });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      logger.info(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      logger.err(`failed to execute migration "${it.migrationName}"`);
    }
  });
  
  if (error) {
    logger.err('failed to migrate');
    logger.err(error);
    throw error;
  }
  
  await db.destroy();

  server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
}

void bootstrap();

