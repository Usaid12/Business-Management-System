import { Router } from 'express';
import UserRouter from './UserRouter';
import AuthRouter from './AuthRouter';


const apiRouter = Router();
apiRouter.use('/users', UserRouter);
apiRouter.use('/auth', AuthRouter);

export default apiRouter;
