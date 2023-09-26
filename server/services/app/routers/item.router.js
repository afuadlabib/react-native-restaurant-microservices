const ItemController = require('../controllers/item.controller');
const authAdmin = require('../middlewares/auth.admin');
const router = require('express').Router();
const auth = require('../middlewares/auth');

router
  .get('/', ItemController.findAllItem)
  .get('/:itemId', ItemController.findOneItem)
  .put('/', ItemController.bulkUpdate)
  // .use(auth)
  // .use(authAdmin)
  .post('/', ItemController.creatItem)
  .put('/:itemId', ItemController.updateItem)
  .delete('/:itemId', ItemController.deleteItem);

module.exports = router;
