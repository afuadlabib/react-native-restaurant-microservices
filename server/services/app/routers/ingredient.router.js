const IngredientController = require('../controllers/ingredient.controller');
const authAdmin = require('../middlewares/auth.admin');
const router = require('express').Router();

router
  .get('/', IngredientController.findAllIngredient)
  .get('/:ingradientId', IngredientController.findOneIngredient)
  // .use(authAdmin)
  .post('/', IngredientController.createIngredient)
  .put('/:ingradientId', IngredientController.updateIngredient)
  .delete('/:ingradientId', IngredientController.deleteIngredient);

module.exports = router;
