import EnvVars from '@src/constants/EnvVars';
import SuperAdminSeeder from './SuperAdminSeeder';
import db from '@src/database';
import logger from 'jet-logger';
import RoleSeeder from './RoleSeeder';


const main = async () => {
  if (!EnvVars.Database.IsSeed) return;

  logger.info('Seeding Started!');
  const dataSource = await db.initialize();

  await RoleSeeder.run(dataSource);
  await SuperAdminSeeder.run(dataSource);

  logger.info('Seeding Successful!');
};

main();