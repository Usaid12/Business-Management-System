import ProductService, { ProductWhere } from '@src/services/product.service';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { withTransaction } from '@src/util/withTransaction';
import BusinessService from '@src/services/business.service';
import { RouteError } from '@src/other/classes';
import CategorySerivce from '@src/services/category.service';
import EnvVars from '@src/constants/EnvVars';
import { getLocals } from '@src/util/locals';
import { Roles } from '@src/constants/roles';

export const createProduct = withTransaction(async (manager, req, res) => {
  const payload = getLocals(res.locals, 'payload');
  const productSerivce = new ProductService(manager);
  const businessService = new BusinessService(manager);
  const categoryService = new CategorySerivce(manager);

  if (!req.files || Array.isArray(req.files)) {
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, 'Some unexpected issue occured!!');
  }
  const imagePrefix = `${EnvVars.BackendDomain}/products`;
  const imageUrls = req.files['images'].map((file) => `${imagePrefix}/${file.filename}`);
  const thumbnail = `${imagePrefix}/${req.files['thumbnail'][0].filename}`;
  const data = req.body;
  data.price = parseInt(data.price);
  const childrens = await categoryService.findChildrens(parseInt(data.category_id));
  if (childrens.length > 0) {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'Category cannot be a parent category');
  }
  const business = await businessService.findByOwner(payload.userId);
  if (!business) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Please create a business first. Your account doesn\'t have a registered business');
  }
  const product = await productSerivce.create({ ...data, business_id: business.id, thumbnail });
  const images = await productSerivce.addImages(imageUrls, product.id);
  return {
    data: {
      ...product,
      images,
    },
    message: 'Product has been created successfully',
    statusCode: HttpStatusCodes.CREATED,
  };
});

export const getProducts = withTransaction(async (manager, req, res) => {
  const payload = getLocals(res.locals, 'payload');
  const productSerivce = new ProductService(manager);
  const businessService = new BusinessService(manager);
  const where: ProductWhere = {};
  if (payload.role === Roles.BUSINESS_ADMIN) {
    const business = await businessService.findByOwner(payload.userId);
    if (!business) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Please create a business first. Your account doesn\'t have a registered business');
    }
    where.business_id = business.id;
  }
  const products = await productSerivce.findAll(where);
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
  const [product, images] = await Promise.all([
    productService.findById(id),
    productService.getImages(id),
  ]);
  return {
    data: {
      ...product,
      images,
    },
    message: `Product with id: ${id}`,
    statusCode: HttpStatusCodes.OK,
  };
});

export const getProductImages = withTransaction(async (manager, req) => {
  const productService = new ProductService(manager);
  const productId = productService.validateId(req.params.id);
  const images = await productService.getImages(productId);
  return {
    data: images,
    message: 'These are the product images',
    statusCode: HttpStatusCodes.OK,
  };
});

export const addProductImages = withTransaction(async (manager, req, res) => {
  const businessService = new BusinessService(manager);
  const productService = new ProductService(manager);
  const payload = getLocals(res.locals, 'payload');
  const productId = productService.validateId(req.params.id);
  if (!req.files || !Array.isArray(req.files)) {
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, 'Some unexpected issue occured!!');
  }
  const imagePrefix = `${EnvVars.BackendDomain}/products`;
  const imageUrls = req.files.map((file) => `${imagePrefix}/${file.filename}`);
  const business = await businessService.findByOwner(payload.userId);
  if (!business) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Please create a business first. Your account doesn\'t have a registered business');
  }
  const product = await productService.findOne({ id: productId, business_id: business.id });
  if (!product) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Product doesn\'t belong to your business');
  }
  const images = await productService.addImages(imageUrls, productId);
  return {
    data: images,
    message: 'Product images added successfully',
    statusCode: HttpStatusCodes.CREATED,
  };
});
