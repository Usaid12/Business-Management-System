import { NextFunction, Request, Response } from 'express';

export const createBusiness = async (req: Request, res: Response, next: NextFunction) => {
  try { 
    await Promise.resolve();
  } catch (error) {
    next(error);
  }
};

export const getBusinesses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Promise.resolve();
  } catch (error) {
    next(error)
  }
}