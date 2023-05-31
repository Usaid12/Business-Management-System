import { validate } from '@src/middlewares/validate';
import { Router } from 'express';
import * as AuthController from '@src/controllers/auth.controller';
import * as AuthValidator from '@src/validators/auth.validator';

const router = Router();

// To Register A User
router.post(
  '/register',
  validate(AuthValidator.register),
  AuthController.register,
);

// router.post(
//   '/'
// )

// For User Login
router.post(
  '/login',
  validate(AuthValidator.login),
  AuthController.login,
);

export default router;