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
import multer from 'multer';

const createProductFields: ReadonlyArray<multer.Field> = [{ name: 'images', maxCount: 20 }, { name: 'thumbnail', maxCount: 1 }] as const;


const productImageUpload = uploadImage(path.resolve(__dirname, '../public/products'));

router.post(
  '/',
  auth,
  hasRole(Roles.BUSINESS_ADMIN),
  productImageUpload.fields(createProductFields),
  validate(ProductValidator.createProduct),
  ProductController.createProduct,
);

router.get(
  '/',
  auth,
  hasRole(Roles.BUSINESS_ADMIN, Roles.CUSTOMER),
  ProductController.getProducts,
);

router.get(
  '/:id',
  auth,
  hasRole(Roles.BUSINESS_ADMIN, Roles.CUSTOMER),
  ProductController.getProductById,
);

router.get(
  '/:id/images', 
  auth, 
  hasRole(Roles.BUSINESS_ADMIN, Roles.CUSTOMER),
  ProductController.getProductImages,
);

router.post(
  '/:id/images',
  auth,
  hasRole(Roles.BUSINESS_ADMIN),
  productImageUpload.array('images', 10),
  ProductController.addProductImages,
);


export default router;
