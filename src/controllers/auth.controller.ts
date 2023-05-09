import { NextFunction, Request, Response } from 'express';
import db from '@src/database';
import { RouteError } from '@src/other/classes';
import { RegisterPayload } from '@src/validators/auth.validator';
import * as Bcrypt from 'bcryptjs';
import { Role } from '@src/entities/role.entity';
import { User } from '@src/entities/user.entity';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { plainToInstance } from 'class-transformer';
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { role, ...data } = req.body as RegisterPayload;
    const role_data = await Role
      .createQueryBuilder('r')
      .select([
        'r.id as id',
        'r.name as name',
      ])
      .where('r.name = :role', { role: role })
      .getRawOne<Pick<Role, 'id' | 'name'>>();
    const user_exists = await User
      .createQueryBuilder('u')
      .select(['u.id as id'])
      .where('u.email = :email', { email: data.email })
      .getRawOne<{ id: number }>();

    if (!role_data) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Role doesn\'t exists');
    }

    if (user_exists) {
      throw new RouteError(HttpStatusCodes.CONFLICT, 'User already exists');
    }
    data.password = await Bcrypt.hash(data.password, 10);

    const user_entity = plainToInstance(User, { ...data, roleId: role_data.id });

    const user = await User.createQueryBuilder()
      .insert()
      .values(user_entity)
      .into(User)
      .returning([
        'id',
        'email',
        'firstName',
        'lastName',
        'phoneNumber',
        'gender',
        'createdAt',
        'deletedAt',
        'updatedAt',
      ])
      .execute();
    
    res.status(HttpStatusCodes.CREATED).json({
      data: user.raw[0] as User,
      statusCode: HttpStatusCodes.CREATED,
      message: 'User registered successfully',
    })
  } catch (error) {
    next(error);
  }
};
