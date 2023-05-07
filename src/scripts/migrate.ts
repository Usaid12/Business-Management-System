import logger from 'jet-logger';
import { MigrationResultSet } from 'kysely';
import { migrator } from '../database';

const command = process.argv[2];
async function run() {
  let output: MigrationResultSet | null = null;
  if (command === 'up') {
    output = await migrator.migrateUp();
  } 

  console.log(output, command);

  if (output !== null && output.error) {
    throw output.error;
  }

  if (output?.results) {
    logger.info(
      `The Migration ${command.toUpperCase()} was 
      successful on the following migrations`,
    );

    for(const result of output.results) {
      logger.info(result.migrationName);
    }
  }

}

void run();
