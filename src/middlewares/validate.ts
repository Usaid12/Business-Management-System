import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq } from '@src/routes/types/types';
import { NextFunction, Request, Response } from 'express';
import { ZodType, ZodTypeDef, z } from 'zod';

export const validate = <Payload = any, Def extends ZodTypeDef = ZodTypeDef>(schema: z.ZodSchema<Payload, Def>) => {

  return async (req: IReq<Payload>, res: Response, next: NextFunction) => {
    try {
      const data = await schema.parseAsync(req.body);
      req.body = data;
      next();
    } catch (error) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: 'Validation Error',
        error: error as z.ZodError,
        statusCode: HttpStatusCodes.BAD_REQUEST,
      });
    }
  };
};