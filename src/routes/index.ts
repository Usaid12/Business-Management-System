import { Router } from 'express';
import UserRouter from './user.router';
import AuthRouter from './auth.router';
import CategoryRouter from './category.router';
import ProductRouter from './product.router';
import BusinessRouter from './business.router';

const apiRouter = Router();
apiRouter.use('/users', UserRouter);
apiRouter.use('/auth', AuthRouter);
apiRouter.use('/category', CategoryRouter);
apiRouter.use('/products', ProductRouter);
apiRouter.use('/business', BusinessRouter);


export default apiRouter;
