import { Router } from 'express';
import UserRouter from './user.router';
import AuthRouter from './auth.router';
import CategoryRouter from './category.router';

const apiRouter = Router();
apiRouter.use('/users', UserRouter);
apiRouter.use('/auth', AuthRouter);
apiRouter.use('/category', CategoryRouter);
export default apiRouter;
