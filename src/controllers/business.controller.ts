import { generatePassword } from '@src/util/GeneratePassword';
import { NextFunction, Request, Response } from 'express';
import UserSerivce  from '@src/services/user.service';
import BusinessService from '@src/services/business.service';
import { CreateBusinessPayload } from '@src/validators/business.validator';
import { Roles } from '@src/constants/roles';
import { withTransaction } from '@src/util/withTransaction';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/other/classes';
import type { GetBusinessWhere } from '@src/services/business.service';

export const createBusiness = withTransaction(async (manager, req) => {
  const data = req.body as CreateBusinessPayload;
  const password = generatePassword(8);
  console.log(password);
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
      user: {
        ...user,
        password: undefined,
      },
    },
    message: 'Business Created Successfully',
    statusCode: HttpStatusCodes.CREATED,
  };
});

export const getBusinesses = withTransaction(async (manager, req) => {
  const id = parseInt(req.params.id, 10);
  if (!req.payload) {
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, 'Current User Information is required');
  }
  const data: any[] = [];
  const businessService = new BusinessService(manager);
  if (req.payload.role === Roles.BUSINESS_ADMIN) {
    const business = await businessService.findById(id);
  } else if (req.payload.role === Roles.SUPER_ADMIN || req.payload.role === Roles.CUSTOMER) {
     const business = businessService.findAll();
  }
  return {
    data,
    message: 'Business List',
    statusCode: HttpStatusCodes.OK,
  };
});

export const updateBusinesses = withTransaction(async (manager, req) => {
  const id = parseInt(req.params.id, 10);
  if (!req.payload) {
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, 'Current User Information is required');
  }
  const data: any[] = [];
  const businessService = new BusinessService(manager);
  const updateBusinesses = businessService.update(id);
  return {
    data : updateBusinesses ,
    message: 'Business Updated',
    statusCode: HttpStatusCodes.OK,
  };
})