import { NextFunction, Request, Response } from 'express';
import { Roles } from './../constants/roles';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { getLocals } from '@src/util/locals';

type ROLES = (typeof Roles)[keyof typeof Roles]
export const hasRole = (...roles: Array<ROLES>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = getLocals(res.locals, 'payload');
      const role = payload.role;
      if (role !== Roles.SUPER_ADMIN && role !== Roles.BUSINESS_ADMIN && role !== Roles.CUSTOMER) {
        throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'Invalid Role in payload');
      }
      const isIncluded = roles.includes(role);
      if (!isIncluded) {
        throw new RouteError(HttpStatusCodes.FORBIDDEN, 'You are not authorized to hit the api.');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};