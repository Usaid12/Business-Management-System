import ProductService from '@src/services/product.service';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { withTransaction } from '@src/util/withTransaction';
import { CreateProductPayload } from '@src/validators/product.validator';

export const createProduct = withTransaction(async (manager, req) => {
  const productSerivce = new ProductService(manager);
  const data = req.body as CreateProductPayload;
  const product = await productSerivce.create(data);
  return {
    data: product,
    message: 'Product has been created successfully',
    statusCode: HttpStatusCodes.CREATED,
  };
});