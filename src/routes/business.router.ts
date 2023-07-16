import { Router } from 'express';
const router = Router();
import * as BusinessController from '@src/controllers/business.controller';
import * as BusinessValidator from '@src/validators/business.validator';

import { auth } from '@src/middlewares/auth';
import { hasRole } from '@src/middlewares/hasRole';
import { Roles } from '@src/constants/roles';
import { validate } from '@src/middlewares/validate';

router.post(
  '/',  
  auth,
  hasRole(Roles.SUPER_ADMIN),
  validate(BusinessValidator.createBusiness),
  BusinessController.createBusiness,
);

router.get(
  '/',
  auth,
  hasRole(Roles.SUPER_ADMIN, Roles.BUSINESS_ADMIN),
  BusinessController.getBusinesses,
);

export default router;