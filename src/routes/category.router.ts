import { Router } from 'express'
const router = Router();
import * as CategoryController from '@src/controllers/category.controller'
import * as CategoryValidator from '@src/validators/category.validator'

import { validate } from '@src/middlewares/validate';

router.post(
  '/',
  validate(CategoryValidator.createCategory),
  CategoryController.createCategory,
)

router.get(
  '/',
  CategoryController.getCategories,
)


router.get(
  '/:id',
  CategoryController.getCategoryById,
)

export default router;