import { Router } from 'express';
const router = Router();
import * as BusinessController from '@src/controllers/business.controller';

router.post(
  '/',  
  BusinessController.createBusiness,
)

router.get(
  '/',  
  BusinessController.getBusinesses,
);

export default router;