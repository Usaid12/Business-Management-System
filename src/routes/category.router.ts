import { Router } from 'express'
const router = Router();
import * as CategoryController from '@src/controllers/category.controller'
import * as CategoryValidator from '@src/validators/category.validator'

import { validate } from '@src/middlewares/validate';
import { auth } from '@src/middlewares/auth';
import { hasRole } from '@src/middlewares/hasRole';
import { Roles } from '@src/constants/roles';

router.post(
  '/',
  auth,
  hasRole(Roles.SUPER_ADMIN),
  validate(CategoryValidator.createCategory),
  CategoryController.createCategory,
)

router.get(
  '/',
  auth,
  hasRole(Roles.SUPER_ADMIN),
  CategoryController.getCategories,
);

router.get(
  '/:id',
  auth,
  hasRole(Roles.SUPER_ADMIN),
  CategoryController.getCategoryById,
)

export default router;