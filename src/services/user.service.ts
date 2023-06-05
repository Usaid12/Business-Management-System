import db from '@src/database';
import { User } from '@src/entities/user.entity';
import { RegisterPayload } from '@src/validators/auth.validator';
import { hash } from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { getRoleByName } from './role.service';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

type CreateUserData = RegisterPayload
export const createUser = async (data: CreateUserData): Promise<User> => {
  const [user_found, role, hashed_password] = await Promise.all(
    [
      getUserByEmail(data.email),
      getRoleByName(data.role),
      hash(data.password, 10),
    ]);
  if (user_found) {
    throw new RouteError(HttpStatusCodes.CONFLICT, 'User already exists');
  }
  const [user] = await db.query(`
    INSERT INTO users (first_name, last_name, gender, email, password, phone_number, role_id, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) 
    RETURNING 
      id, 
      first_name as "firstName", 
      last_name as "lastName", 
      gender, 
      email, 
      password, 
      phone_number as "phoneNumber", 
      role_id as "roleId", 
      created_at as "createdAt", 
      updated_at as "updatedAt", 
      deleted_at as "deletedAt";
  `,
  [data.firstName, data.lastName, data.gender, data.email, hashed_password, data.phoneNumber, parseInt(role.id.toString(), 10)]);
  if (user === null) throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, 'There was error creating user');
  return plainToInstance(User, user);
};


export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await User
    .createQueryBuilder('u')
    .innerJoinAndSelect('u.role', 'r')
    .where('u.email = :email', { email })
    .getOne();
  return user;
};

export type UserInfo = Pick<User,
  'id' |
  'firstName' |
  'lastName' |
  'email' |
  'gender' |
  'roleId' |
  'phoneNumber' |
  'createdAt' |
  'deletedAt' |
  'updatedAt'> & { role: string; }

export const getUserInfo = async (id: number): Promise<UserInfo | null> => {
  const query =
    `
      SELECT
        u.id as id,
        u.first_name as firstName,
        u.last_name as lastName,
        u.gender as gender,
        u.email as email,
        u.role_id as roleId
        u.phone_number as phoneNumber,
        u.created_at as createdAt,
        u.updated_at as updatedAt,
        u.deleted_at as deletedAt
        r.name as role,
      FROM users u
      INNER JOIN roles r ON u.role_id = r.id
      WHERE u.id = $1
    `;
  const result = await db.query(query, [id]);
  if (result.length === 0) return null;
  return result[0] as UserInfo;
};
// export type UserWhereOptions = Partial<{
//   id: number;
//   email: string;
// }>

// // type UserRelations = Partial<Record<'role', boolean>>;
// // export const getUser = async (where?: UserWhereOptions, relations?: UserRelations) => {

// // };