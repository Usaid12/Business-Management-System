import { Router } from 'express';
const router = Router();
import * as ProductController from '@src/controllers/product.controller';
import { validate } from '@src/middlewares/validate';
import * as ProductValidator from '@src/validators/product.validator';

router.post(
  '/',
  validate(ProductValidator.createProduct),
  ProductController.createProduct,
);

export default router;
