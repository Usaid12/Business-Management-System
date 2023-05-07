import { NextFunction, Request, Response } from 'express';
import db from '@src/database';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RegisterPayload } from '@src/validators/auth.validator';
import * as Bcrypt from 'bcryptjs';
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body as RegisterPayload;
    const role = await db
      .selectFrom('roles')
      .select(['id', 'name'])
      .where('name', '=', data.role)
      .execute();
    const userExists = await db.selectFrom('users').selectAll().where('email', '=', data.email).executeTakeFirst();

    if (userExists) {
      throw new RouteError(HttpStatusCodes.CONFLICT, 'User already exists');
    }
    if (!role || role.length === 0) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Role not found');
    }
    data.password = await Bcrypt.hash(data.password, 10);
    await db.insertInto('users')
      .values({ 
        email: data.email,
        first_name: data.first_name, 
        last_name: data.last_name, 
        gender: data.gender, 
        password: data.password, 
        role_id: role[0].id, 
        phone_number: data.phone_number,
      })
      .execute();
  } catch (error) {
    next(error);
  }
};
