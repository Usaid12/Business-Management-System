import create from '@src/services/user.service';
import { DataSource } from 'typeorm';
import EnvVars from '@src/constants/EnvVars';
import { jetLogger } from 'jet-logger';
import { hash } from 'bcryptjs';


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
    WHERE u.role_id = 2;`)

    const result = Object.keys(checkSuperAdmin).length;
    if (result !== 0){      
          const superAdmin = await query_runner.manager.query(
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
            EnvVars.SuperAdmin.Gender, EnvVars.SuperAdmin.Email, hash(EnvVars.SuperAdmin.Password,10), 
            EnvVars.SuperAdmin.ContactNo, EnvVars.SuperAdmin.RoleId]
          );
          console.log(superAdmin)
        }
      // Print the created super admin user for testing
   
      await query_runner.commitTransaction();
    } catch (error) {
      await query_runner.rollbackTransaction();
    } finally {
      await query_runner.release();
    }
  }
}