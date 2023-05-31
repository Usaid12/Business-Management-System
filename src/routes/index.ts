import { Router } from 'express';
import UserRouter from './user.router';
import AuthRouter from './auth.router';


const apiRouter = Router();
apiRouter.use('/users', UserRouter);
apiRouter.use('/auth', AuthRouter);

export default apiRouter;
