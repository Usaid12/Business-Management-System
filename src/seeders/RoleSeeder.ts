import { DataSource } from 'typeorm';
import { Roles } from '@src/constants/roles';
import logger from 'jet-logger';

export default class RoleSeeder {
  public static async run(dataSource: DataSource) {
    try {
      const roles = Object.values(Roles);

      const query = `
        INSERT INTO roles (name, created_at, updated_at)
        VALUES ${roles.map(role => `('${role}', NOW(), NOW())`).join(',')};
      `;

      await dataSource.query(query);
    } catch (error) {
      logger.err('Error seeding roles', error);
      throw error;
    }
  }
}