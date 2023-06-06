import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import db from '@src/database';
import { NextFunction, Request, Response } from 'express';
import { EntityManager } from 'typeorm';

type ApiResponse<T> = {
  data: T,
  statusCode: HttpStatusCodes,
  message: string;
}

export const withTransaction = <T>(handler: (db: EntityManager, req: Request) => Promise<ApiResponse<T>>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const query_runner = db.createQueryRunner();
    try {
      await query_runner.connect();
      await query_runner.startTransaction();
      const result = await handler(query_runner.manager, req);
      await query_runner.commitTransaction();
      return res.status(result.statusCode).json(result);
    } catch (error) {
      await query_runner.rollbackTransaction();
      next(error);
    } finally {
      await query_runner.release();
    }
  };
};