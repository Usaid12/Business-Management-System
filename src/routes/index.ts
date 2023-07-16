import { Router } from 'express';
import UserRouter from './user.router';
import AuthRouter from './auth.router';
import CategoryRouter from './category.router';
import ProductRouter from './product.router';
import BusinessRouter from './business.router';
import CartRouter from './cart.router';
import ReviewRouter from './review.router';
import InventoryRouter from './inventory.router';

import cors from 'cors';

const apiRouter = Router();
apiRouter.use(cors());
apiRouter.use('/users', UserRouter);
apiRouter.use('/auth', AuthRouter);
apiRouter.use('/category', CategoryRouter);
apiRouter.use('/products', ProductRouter);
apiRouter.use('/business', BusinessRouter);
apiRouter.use('/cart', CartRouter);
apiRouter.use('/review', ReviewRouter);
apiRouter.use('/inventory', InventoryRouter);

export default apiRouter;
