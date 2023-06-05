import { NextFunction, Request, Response } from 'express';
import { RouteError } from '@src/other/classes';
import { LoginPayload, RegisterPayload } from '@src/validators/auth.validator';
import { compare } from 'bcryptjs';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import * as tokenService from '@src/services/token.service';
import * as userService from '@src/services/user.service';
import { TokenTypes } from '@src/constants/enum';
import { JwtAccessPayload } from '@src/routes/types/types';


export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body as RegisterPayload;
    const user = await userService.createUser(data);
    const payload: JwtAccessPayload = {
      userId: user.id,
      roleId: user.roleId,
      email: user.email,
      role: data.role,
    };
    const access_token = tokenService.signToken(payload, TokenTypes.ACCESS);
    const refresh_token = tokenService.signToken(payload, TokenTypes.REFRESH);
    res.status(HttpStatusCodes.CREATED).json({
      data: {
        user,
        tokens: {
          access_token,
          refresh_token,
        },
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
    const user = await userService.getUserByEmail(data.email);
    if (!user) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Wrong Email, user not found');
    }
    const is_valid = await compare(data.password, user.password);
    if (!is_valid) {
      throw new RouteError(HttpStatusCodes.FORBIDDEN, 'You have entered incorrect password');
    }
    const payload: JwtAccessPayload = {
      userId: user.id,
      roleId: user.roleId,
      email: user.email,
      role: user.role.name,
    };
    const access_token = tokenService.signToken(payload, TokenTypes.ACCESS);
    const refresh_token = tokenService.signToken(payload, TokenTypes.REFRESH);

    res.status(HttpStatusCodes.OK).json({
      data: {
        user,
        tokens: {
          access_token,
          refresh_token,
        }
      },
      statusCode: HttpStatusCodes.OK,
      message: 'You are logged In',
    });
  } catch (error) {
    next(error);
  }
};