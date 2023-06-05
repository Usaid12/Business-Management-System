import { Router } from 'express'
const router = Router();
import * as CategoryController from '@src/controllers/category.controller'
import * as CategoryValidator from '@src/validators/category.validator'

import { validate } from '@src/middlewares/validate';
import { auth } from '@src/middlewares/auth';

router.post(
  '/',
  auth,
  validate(CategoryValidator.createCategory),
  CategoryController.createCategory,
)

router.get(
  '/',
  auth,
  CategoryController.getCategories,
);

router.get(
  '/:id',
  auth,
  CategoryController.getCategoryById,
)

export default router;