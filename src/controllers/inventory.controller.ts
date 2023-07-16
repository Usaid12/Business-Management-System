import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/other/classes';
import BusinessService from '@src/services/business.service';
import InventoryService from '@src/services/inventory.service';
import ProductService from '@src/services/product.service';
import { getLocals } from '@src/util/locals';
import { withTransaction } from '@src/util/withTransaction';

export const addInventory = withTransaction(async (manager, req, res) => {
  const payload = getLocals(res.locals, 'payload');
  const productService = new ProductService(manager);
  const inventoryService = new InventoryService(manager);
  const businessService = new BusinessService(manager);
  const business = await businessService.findByOwner(payload.userId);
  if (!business) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Please create a business first. Your account doesn\'t have a registered business');
  }

  const productId = productService.validateId(req.body.product_id);
  const product = await productService.findOne({
    id: productId,
    business_id: business.id,
  });
  if (!product) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Product doesn\'t exists');
  }
  const inventory = await inventoryService.createInventory(req.body);
  return {
    data: inventory,
    statusCode: HttpStatusCodes.CREATED,
    message: 'Inventory has been added to product',
  };
});

export const getInventory = withTransaction(async (manager, req, res) => {
  const payload = getLocals(res.locals, 'payload');
  const productService = new ProductService(manager);
  const inventoryService = new InventoryService(manager);
  const businessService = new BusinessService(manager);
  const business = await businessService.findByOwner(payload.userId);
  if (!business) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Please create a business first. Your account doesn\'t have a registered business');
  }
  if (!req.query.product_id || typeof req.query.product_id !== 'string') {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'Product id is required');
  }
  const productId = productService.validateId(req.query.product_id);
  const product = await productService.findOne({ 
    id: productId,
    business_id: business.id,
  });
  if (!product) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Product doesn\'t exists');
  }

  const inventory = await inventoryService.getProductInventory(productId);

  return {
    data: inventory,
    statusCode: HttpStatusCodes.CREATED,
    message: 'Inventory has been added to product',
  };
});