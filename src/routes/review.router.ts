import { Router } from 'express';
const router = Router();
import * as ReviewController from '@src/controllers/reviews.controller';
import * as ReviewValidator from '@src/validators/reviews.validator';
import { validate } from '@src/middlewares/validate';
import { auth } from '@src/middlewares/auth';

router.post(
    '/',
    auth,
    validate(ReviewValidator.createReviews),
    ReviewController.addReviews
  );


router.get(
    '/',
    auth,
    ReviewController.searchReviews,
  );


router.delete(
    '/',
    auth,
    validate(ReviewValidator.createReviews),
    ReviewController.deleteReview
  );