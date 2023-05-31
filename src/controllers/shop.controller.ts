import { NextFunction, Request, Response } from 'express';

export const createShop = async (req: Request, res: Response, next: NextFunction) => {
  try { 
    await Promise.resolve();
  } catch (error) {
    next(error);
  }
};