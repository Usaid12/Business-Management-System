import { validate } from '@src/middlewares/validate';
import { Router } from 'express';
import * as AuthController from '@src/controllers/auth.controller';
import * as AuthValidator from '@src/validators/auth.validator';

const router = Router();

router.post(
  '/register',
  validate(AuthValidator.register),
  AuthController.register,
);

export default router;