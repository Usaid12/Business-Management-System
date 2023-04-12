import { Router } from 'express';
import UserRouter from './UserRoutes';
const apiRouter = Router();
apiRouter.use('/users', UserRouter);
export default apiRouter;
