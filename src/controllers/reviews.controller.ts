import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { Product } from '@src/entities/product.entity';
import { RouteError } from '@src/other/classes';
import ProductService from '@src/services/product.service';
import ReviewService from '@src/services/reviews.service';
import { withTransaction } from '@src/util/withTransaction';
import { CreateReviewPayload } from '@src/validators/reviews.validator';
import { request } from 'express';
import logger from 'jet-logger';

logger.info('Reached reviews.controller')
export const addReviews = withTransaction(async (manager, req, res) => {
    const data = req.body as CreateReviewPayload;
    const reviewService = new ReviewService(manager);
      const review = await reviewService.writeReviews(data);
      return {
        message: 'Review Posted',
        data: review,
        statusCode: HttpStatusCodes.CREATED,
      };
});

export const searchReviews = withTransaction(async (manager, req, res) => {
    const prod_data = req.body as CreateReviewPayload;
    const reviewService = new ReviewService(manager);
    const productService = new ProductService(manager);
    const product_data = await productService.findById(prod_data.product_id)
    if (!product_data) {
          throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Product doesn\'t exist');
    }
    const data = await reviewService.findReviews({product_id:prod_data.product_id})
    return{
      message: 'Search Successful',
      data,
      statusCode: HttpStatusCodes.FOUND
    }
})


export const deleteReview = withTransaction(async (manager,req,res) => {
  const prod_data = req.body as CreateReviewPayload;
  const reviewService = new ReviewService(manager);
  const productService = new ProductService(manager);
  const product_data = await productService.findById(prod_data.product_id)
    if (!product_data) {
          throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Product doesn\'t exist');
    }
    await reviewService.deleteReview({ ...prod_data});
  return {
    data: null,
    message: 'Review deleted successfully!',
    statusCode: HttpStatusCodes.OK,
  };
});
