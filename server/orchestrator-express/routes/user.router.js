import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import auth from '../middlewares/auth.js';

const user = new UserController();
const router = Router();

router
  .post('/register', user.create)
  .post('/login', user.login)
  // .use(auth)
  .post('/register-admin', user.createAdmin)
  .delete('/:userId', user.delete);

export default router;
