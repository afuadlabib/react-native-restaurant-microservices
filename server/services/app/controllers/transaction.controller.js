const { sequelize } = require('../models');
const { Item, Ingredient } = require('../models');
const { v4: uuid } = require('uuid');

class Transaction {
  static async createTransaction(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let { name, description, price, imgUrl, categoryId, ingredients } =
        req.body;

      const createItem = await Item.create(
        {
          name,
          description,
          price,
          imgUrl,
          categoryId,
          authorId: req.user.id,
        },
        { transaction: t }
      );
      ingredients = ingredients.map((e) => {
        e.id = uuid();
        e.itemId = createItem.id;
        return e;
      });
      const createIngredient = await Ingredient.bulkCreate(ingredients, {
        transaction: t,
      });
      await t.commit();
      return res.status(201).json(createItem);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

module.exports = Transaction;
