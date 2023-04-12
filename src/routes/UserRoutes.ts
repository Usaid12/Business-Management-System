import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = Router();

router.get('/', UserController.getAll);
router.post('/', UserController.add);
router.delete('/:id', UserController.delete_);

export default router;