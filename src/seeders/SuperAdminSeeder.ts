import { DataSource } from 'typeorm';
import EnvVars from '@src/constants/EnvVars';
import { hash } from 'bcryptjs';
import { Roles } from '@src/constants/roles';
import logger from 'jet-logger';

export default class SuperAdminSeeder {
  public static async run(dataSource: DataSource) {
    const query_runner = dataSource.createQueryRunner();
    try {
      await query_runner.startTransaction();
      const checkSuperAdmin = await query_runner.manager.query(`SELECT 
      u.id as "id",
      u.first_name as "firstName",
      u.last_name as "lastName",
      u.gender, 
      u.email, 
      u.phone_number as "phoneNumber", 
      u.role_id as "roleId", 
      u.password as password,
      u.created_at as "createdAt", 
      u.updated_at as "updatedAt", 
      u.deleted_at as "deletedAt",
      r.name as "role"
    FROM users u
    INNER JOIN roles r ON r.id = u.role_id
    WHERE r.name = $1;`, [Roles.BUSINESS_ADMIN]);
      if (checkSuperAdmin.length > 0) throw new Error('Super admin already exists');
      await query_runner.manager.query(
        `INSERT INTO users (first_name, last_name, gender, email, password, phone_number, role_id, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) 
             RETURNING 
               id, 
               first_name as "firstName", 
               last_name as "lastName", 
               gender, 
               email, 
               phone_number as "phoneNumber", 
               role_id as "roleId", 
               created_at as "createdAt", 
               updated_at as "updatedAt", 
               deleted_at as "deletedAt";
            `,
        [EnvVars.SuperAdmin.FirstName, EnvVars.SuperAdmin.LastName, 
          EnvVars.SuperAdmin.Gender?.toLowerCase(), EnvVars.SuperAdmin.Email, await hash(EnvVars.SuperAdmin.Password?.toString() ?? '' ,10), 
          EnvVars.SuperAdmin.ContactNo, EnvVars.SuperAdmin.RoleId],
      );
      // Print the created super admin user for testing
      await query_runner.commitTransaction();
    } catch (error) {
      await query_runner.rollbackTransaction();
      if (error instanceof Error) {
        logger.err(error.message);
      } else {
        logger.err('Something unexpected occured');
      }
    } finally {
      await query_runner.release();
    }
  }
}