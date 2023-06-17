import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/other/classes';
import { NextFunction, Request, Response } from 'express';
import * as tokenService from '@src/services/token.service';
import UserSerivce, * as userService from '@src/services/user.service';

import { TokenTypes } from '@src/constants/enum';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import db from '@src/database';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization || authorization === '') {
      throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'Bearer token is required in auth header');
    }
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'Currently bearer token is supported for authoziation only');
    }
    const payload = tokenService.verifyToken(token, TokenTypes.ACCESS);
    const userService = new UserSerivce(db.manager);
    const user = await userService.findById(payload.userId);
    if (!user) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found');
    }
    res.locals.payload = {
      userId: payload.userId,
      roleId: payload.roleId,
      email: payload.email,
      role: payload.role,
    };
    res.locals.user = user;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      next(new RouteError(HttpStatusCodes.UNAUTHORIZED, 'Token is expired'));
    } else if (error instanceof JsonWebTokenError) {
      next(new RouteError(HttpStatusCodes.UNAUTHORIZED, 'Invalid Token'));
    } else {
      next(error);
    }
  }
};