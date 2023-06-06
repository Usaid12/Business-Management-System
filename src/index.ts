import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import EnvVars from './constants/EnvVars';
import server from './server';
import db from './database';
import { SuperAdminSeeder } from './seeders';


async function bootstrap() {
  const SERVER_START_MSG = ('Express server started on port: ' +
    EnvVars.Port.toString());
  if (!db.isInitialized) {
    await db.initialize();
    logger.info('Database has been initialized');
  }

  await Promise.all([SuperAdminSeeder.run(db)]);
  logger.info('Super admin has been created');
  server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
}

void bootstrap();

