import { NextFunction, Request, Response } from 'express';
import { RouteError } from '@src/other/classes';
import { LoginPayload, RegisterPayload } from '@src/validators/auth.validator';
import { compare, hash } from 'bcryptjs';
import { User } from '@src/entities/user.entity';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { plainToInstance } from 'class-transformer';
import { sign } from 'jsonwebtoken';
import EnvVars from '@src/constants/EnvVars';
import { Role } from '@src/entities/role.entity'
import * as tokenService from '@src/services/token.service';
import { createUser, getUserByEmail } from '@src/services/user.service';
import { getRoleByName } from '@src/services/role.service';

const user_data_fields = [
  'id',
  'email',
  'firstName',
  'lastName',
  'phoneNumber',
  'gender',
  'profileCompleted',
  'createdAt',
  'deletedAt',
  'updatedAt',
];

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { role, ...data } = req.body as RegisterPayload;
    const [user_found, hashed_password, role_data] = await Promise.all(
      [
        getUserByEmail(data.email),
        hash(data.password, 10),
        getRoleByName(role),
      ]);
    if (user_found) {
      throw new RouteError(HttpStatusCodes.CONFLICT, 'User already exists');
    }
    data.password = hashed_password;
    const user: User = await createUser({ ...data, roleId: role_data.id });
    const access_token = tokenService.signAccessToken(user);
    res.status(HttpStatusCodes.CREATED).json({
      data: {
        user,
        access_token,
      },
      statusCode: HttpStatusCodes.CREATED,
      message: 'User registered successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body as LoginPayload;
    const user = await getUserByEmail(data.email);
    if (!user) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Wrong Email, user not found');
    }
    const is_valid = await compare(data.password, user.password);
    if (!is_valid) {
      throw new RouteError(HttpStatusCodes.FORBIDDEN, 'You have entered incorrect password');
    }
    const access_token = tokenService.signAccessToken(user);
    res.status(HttpStatusCodes.OK).json({
      data: {
        user,
        access_token,
      },
      statusCode: HttpStatusCodes.OK,
      message: 'You are logged In',
    });
  } catch (error) {
    next(error);
  }
};