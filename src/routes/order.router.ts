import { Roles } from '@src/constants/roles';
import { auth } from '@src/middlewares/auth';
import { hasRole } from '@src/middlewares/hasRole';
import { validate } from '@src/middlewares/validate';
import { Router } from 'express';
import * as OrderValidator from '@src/validators/order.validator';
import * as OrderController from '@src/controllers/order.controller';

const router = Router();

router.post(
  '/', 
  auth, 
  hasRole(Roles.CUSTOMER), 
  validate(OrderValidator.createOrder), 
  OrderController.createOrder,
);

router.get('/', auth, hasRole(Roles.CUSTOMER), OrderController.getOrderHisotry);

export default router;