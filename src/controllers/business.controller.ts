import { generatePassword } from '@src/util/GeneratePassword';
import { NextFunction, Request, Response } from 'express';
import UserSerivce  from '@src/services/user.service';
import BusinessService from '@src/services/business.service';
import { CreateBusinessPayload } from '@src/validators/business.validator';
import { Roles } from '@src/constants/roles';
import { withTransaction } from '@src/util/withTransaction';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

export const createBusiness = withTransaction(async (manager, req) => {
  const data = req.body as CreateBusinessPayload;
  const password = generatePassword(8);
  const userSerivce = new UserSerivce(manager);
  const businessService = new BusinessService(manager);
  const user = await userSerivce.create({ ...data.user, password, role: Roles.BUSINESS_ADMIN });
  const business = await businessService.create({
    ...data.business,
    owner_id: user.id,
  });
  return {
    data: {
      business,
      user,
    },
    message: 'Business Created Successfully',
    statusCode: HttpStatusCodes.CREATED,
  };
});

export const getBusinesses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Promise.resolve();
  } catch (error) {
    next(error);
  }
};