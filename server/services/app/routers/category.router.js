const CategoryController = require('../controllers/category.controller');
const authAdmin = require('../middlewares/auth.admin');
const router = require('express').Router();

router
  .get('/', CategoryController.findAllCategory)
  .get('/:categoryId', CategoryController.findOneCategory)
  // .use(authAdmin)
  .post('/', CategoryController.createCategory)
  .put('/:categoryId', CategoryController.updateCategory)
  .delete('/:categoryId', CategoryController.deleteCategory);

module.exports = router;
