import { Router } from 'express';
import items from './item.router.js';
import users from './user.router.js';
import errorHandler from '../middlewares/errorHandler.js';

const router = Router();

router.use('/items', items).use('/users', users).use(errorHandler);

export default router;
