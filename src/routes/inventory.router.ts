import { Roles } from '@src/constants/roles';
import { auth } from '@src/middlewares/auth';
import { hasRole } from '@src/middlewares/hasRole';
import { validate } from '@src/middlewares/validate';
import { Router } from 'express';
import * as InventoryValidator from '@src/validators/inventory.validator'
import * as InventoryController from '@src/controllers/inventory.controller'

const router = Router();

router
  .route('/')
  .all(
    auth,
    hasRole(Roles.BUSINESS_ADMIN),
  )
  .post(
    validate(InventoryValidator.createInventory),
    InventoryController.addInventory,
  )
  .get(InventoryController.getInventory);


export default router;