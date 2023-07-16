import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/other/classes';
import ProductService from '@src/services/product.service';
import ReviewService from '@src/services/reviews.service';
import { getLocals } from '@src/util/locals';
import { withTransaction } from '@src/util/withTransaction';
import { CreateReviewPayload, DeleteReviewPayload } from '@src/validators/reviews.validator';

export const addReviews = withTransaction(async (manager, req, res) => {
  const data = req.body as CreateReviewPayload;
  const payload = getLocals(res.locals, 'payload');
  const reviewService = new ReviewService(manager);
  const review = await reviewService.writeReviews({ ...data, user_id: payload.userId });
  return {
    message: 'Review Posted',
    data: review,
    statusCode: HttpStatusCodes.CREATED,
  };
});

export const getReviews = withTransaction(async (manager, req, _res) => {
  const productId = req.query.product_id;
  if (!productId || typeof productId !== 'string') {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'product_id must be passed as a query param');
  }
  const productIdAsNumeric = parseInt(productId, 10);
  if (isNaN(productIdAsNumeric) || productIdAsNumeric > 0) {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'product_id must be a number and greater than 0');
  }
  const reviewService = new ReviewService(manager);
  const productService = new ProductService(manager);
  const product = await productService.findById(productIdAsNumeric);
  if (!product) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Product doesn\'t exist');
  }
  const data = await reviewService.findReviews({ product_id: productIdAsNumeric });
  return {
    message: `Review List for product with id ${productId}`,
    data,
    statusCode: HttpStatusCodes.FOUND,
  };
});


export const deleteReview = withTransaction(async (manager, req, res) => {
  const data = req.body as DeleteReviewPayload;
  const payload = getLocals(res.locals, 'payload');
  const reviewService = new ReviewService(manager);
  const productService = new ProductService(manager);
  const product_data = await productService.findById(data.product_id);
  if (!product_data) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Product doesn\'t exist');
  }
  await reviewService.deleteReview({
    product_id: data.product_id,
    user_id: payload.userId,
  });
  return {
    data: null,
    message: 'Review deleted successfully!',
    statusCode: HttpStatusCodes.OK,
  };
});
