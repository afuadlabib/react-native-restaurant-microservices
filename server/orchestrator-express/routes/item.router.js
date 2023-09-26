import { Router } from 'express';
import ItemController from '../controllers/item.controller.js';
import auth from '../middlewares/auth.js';
const router = Router();
const item = new ItemController();

router
  .get('/', item.findAll)
  .get('/:itemId', item.findOne)
  // .use(auth)
  .post('/', item.create)
  .put('/:itemId', item.updateOne)
  .delete('/:itemId', item.delete);

export default router;
