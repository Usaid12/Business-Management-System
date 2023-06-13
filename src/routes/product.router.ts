import { Router } from 'express';
const router = Router();
import * as ProductController from '@src/controllers/product.controller';
import { validate } from '@src/middlewares/validate';
import * as ProductValidator from '@src/validators/product.validator';
import { auth } from '@src/middlewares/auth';
import { hasRole } from '@src/middlewares/hasRole';
import { Roles } from '@src/constants/roles';
import { uploadImage } from '@src/middlewares/image-upload';
import path from 'path';

router.post(
  '/',
  auth,
  hasRole(Roles.BUSINESS_ADMIN),
  uploadImage(path.resolve(__dirname, '../public/products')).array('images', 20),
  validate(ProductValidator.createProduct),
  ProductController.createProduct,
);

router.get(
  '/',
  auth,
  hasRole(Roles.BUSINESS_ADMIN),
  ProductController.getProducts,
);

router.get(
  '/:id',
  auth,
  hasRole(Roles.BUSINESS_ADMIN),
  ProductController.getProductById,
);

export default router;
