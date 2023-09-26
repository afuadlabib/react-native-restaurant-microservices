import { Router } from 'express';
export const router = Router();
import users from './user.router.js';
import errorHendler from '../middlewares/error.hendler.js';

router.use('/users', users).use(errorHendler);

export default router;
