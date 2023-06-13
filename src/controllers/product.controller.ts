import ProductService from '@src/services/product.service';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { withTransaction } from '@src/util/withTransaction';
import { CreateProductPayload } from '@src/validators/product.validator';
import BusinessService from '@src/services/business.service';
import { RouteError } from '@src/other/classes';
import CategorySerivce from '@src/services/category.service';
import { Multer } from 'multer';
import { satisfies } from 'semver';

export const createProduct = withTransaction(async (manager, req) => {
  if (!req.payload) {
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, 'Current User Information is required');
  }
  const productSerivce = new ProductService(manager);
  const businessService = new BusinessService(manager);
  const categoryService = new CategorySerivce(manager);

  const imageUrls = (req.files as Array<Express.Multer.File>).map((file) => `http://localhost:5000/products/${file.filename}`);
  const data = req.body;
  data.price = parseInt(data.price);
  const childrens = await categoryService.findChildrens(parseInt(data.category_id));
  if (childrens.length > 0) {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'Category cannot be a parent category');
  }
  const business = await businessService.findByOwner(req.payload.userId);
  if (!business) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Please create a business first. Your account doesn\'t have a registered business');
  }
  const product = await productSerivce.create({ ...data, business_id: business.id });
  return {
    data: product,
    message: 'Product has been created successfully',
    statusCode: HttpStatusCodes.CREATED,
  };
});

export const getProducts = withTransaction(async (manager, req) => {
  if (!req.payload) {
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, 'Current User Information is required');
  }
  const productSerivce = new ProductService(manager);
  const businessService = new BusinessService(manager);
  const business = await businessService.findByOwner(req.payload.userId);
  if (!business) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Please create a business first. Your account doesn\'t have a registered business');
  }
  const products = await productSerivce.findAll({ business_id: business.id });
  return {
    data: products,
    message: 'Produts List',
    statusCode: HttpStatusCodes.OK,
  };
});

export const getProductById = withTransaction(async (manager, req) => {
  const productService = new ProductService(manager);
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'Invalid id');
  }
  const product = await productService.findById(id);
  return {
    data: product,
    message: `Product with id: ${id}`,
    statusCode: HttpStatusCodes.OK,
  };
});