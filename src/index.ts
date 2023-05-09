import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import EnvVars from '@src/constants/EnvVars';
import server from './server';
import db from './database';


async function bootstrap() {
  const SERVER_START_MSG = ('Express server started on port: ' +
    EnvVars.Port.toString());

  if (!db.isInitialized) {
    await db.initialize()
    logger.info('Database has been initialized');
  }
  server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
}

void bootstrap();

