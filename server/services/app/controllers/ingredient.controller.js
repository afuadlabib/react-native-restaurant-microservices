const { Ingredient } = require('../models');

class IngredientController {
  static async createIngredient(req, res, next) {
    try {
      const { id, name } = await Ingredient.create({ ...req.body });
      res.status(201).json({ id, name });
    } catch (error) {
      next(error);
    }
  }
  static async findAllIngredient(req, res, next) {
    try {
      const ingredients = await Ingredient.findAll();
      res.status(200).json(ingredients);
    } catch (error) {
      next(error);
    }
  }
  static async findOneIngredient(req, res, next) {
    try {
      const ingredient = await Ingredient.findByPk(req.params.ingredientId);
      if (!ingredient) {
        throw { name: 'not_found' };
      } else {
        res.status(200).json(ingredient);
      }
    } catch (error) {
      next(error);
    }
  }
  static async updateIngredient(req, res, next) {
    try {
      const findIngredient = await Ingredient.findByPk(req.params.ingredientId);
      if (!findIngredient) {
        throw { name: 'not_found' };
      } else {
        const updateIngredient = await Ingredient.update(
          { ...req.body },
          { where: { id: findIngredient.id } }
        );
        if (!updateIngredient[0]) {
          throw { name: 'invalid_input' };
        } else {
          const findIngredientUpdate = await Ingredient.findByPk(
            findIngredient.id
          );
          res.status(200).json({
            message: 'success update ingredient',
            data: findIngredientUpdate,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
  static async deleteIngredient(req, res, next) {
    try {
      const findIngredient = await Ingredient.findByPk(req.params.ingredientId);
      if (!findIngredient) {
        throw { name: 'not_found' };
      } else {
        const deleteIngredient = await Ingredient.destroy({
          where: { id: findIngredient.id },
        });
        if (!deleteIngredient[0]) {
          throw { name: 'invalid_input' };
        } else {
          res.status(200).json({
            message: 'success delete ingradient',
            data: findIngredient,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = IngredientController;
