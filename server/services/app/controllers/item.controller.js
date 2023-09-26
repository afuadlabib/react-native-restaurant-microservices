const { Item } = require('../models');

class ItemController {
  static async creatItem(req, res, next) {
    try {
      const { id, name, description, price, imgUrl, authorId, categoryId } =
        await Item.create({
          ...req.body,
          price: parseInt(req.body.price),
        });
      res
        .status(201)
        .json({ id, name, description, price, imgUrl, authorId, categoryId });
    } catch (error) {
      next(error);
    }
  }
  static async findAllItem(req, res, next) {
    try {
      // query pagination belum
      let items = await Item.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }
  static async findOneItem(req, res, next) {
    try {
      const item = await Item.findOne({
        where: { id: req.params.itemId },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      if (!item) {
        throw { name: 'not_found' };
      } else {
        res.status(200).json(item);
      }
    } catch (error) {
      next(error);
    }
  }
  static async updateItem(req, res, next) {
    try {
      const findItem = await Item.findByPk(req.params.itemId);
      if (!findItem) {
        throw { name: 'not_found' };
      } else {
        const update = await Item.update(
          { ...req.body },
          { where: { id: findItem.id } }
        );
        if (!update[0]) {
          throw { name: 'invalid_input' };
        } else {
          const findItemUpdate = await Item.findByPk(findItem.id);
          
          res
            .status(200)
            .json({ message: 'Success update item', data: findItemUpdate });
        }
      }
    } catch (error) {
      next(error);
    }
  }
  static async deleteItem(req, res, next) {
    try {
      const findItem = await Item.findByPk(req.params.itemId);
      if (!findItem) {
        throw { name: 'not_found' };
      } else {
        const deleteItem = await Item.destroy({ where: { id: findItem.id } });
        if (!deleteItem) {
          throw { name: 'invalid_input' };
        } else {
          res
            .status(200)
            .json({ message: 'success delete item', data: findItem });
        }
      }
    } catch (error) {
      next(error);
    }
  }
  static async bulkUpdate(req, res, next) {
    try {
      const data = req.body;
      let result = [];
      for (let el of data) {
        const update = await Item.update(
          { authorId: el.authorId },
          { where: { id: el.id } }
        );
        if (update[0]) {
          result.push(1);
        }
      }
      if (data.length === result.length) {
        return res.status(200).json({ message: 'update migration success' });
      } else {
        return res
          .status(400)
          .json({ name: 'migration_failed', message: 'data base error' });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ItemController;
