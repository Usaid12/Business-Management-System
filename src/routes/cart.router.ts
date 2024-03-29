import { Roles } from '@src/constants/roles';
import { auth } from '@src/middlewares/auth';
import { hasRole } from '@src/middlewares/hasRole';
import { Router } from 'express';
import * as cartController from '@src/controllers/cart.controller';
import * as cartValidator from '@src/validators/cart.validator';

import { validate } from '@src/middlewares/validate';
const router = Router();

router.post(
  '/add-item',
  auth,
  hasRole(Roles.CUSTOMER),
  validate(cartValidator.addToCart),
  cartController.addToCart,
);

router.patch(
  '/update-item',
  auth,
  hasRole(Roles.CUSTOMER),
  validate(cartValidator.updateItem),
  cartController.updateItem
)

router.get(
  '/get-items',
  auth,
  hasRole(Roles.CUSTOMER),
  cartController.getCartItems,
);

router.delete(
  '/remove-item',
  auth,
  hasRole(Roles.CUSTOMER),
  validate(cartValidator.removeFromCart),
  cartController.removeFromCart,
);

router.get(
  '/count',
  auth,
  hasRole(Roles.CUSTOMER),
  cartController.getCartItemsCount,
);

export default router;