const { Category } = require('../models');

class CategoryController {
  static async createCategory(req, res, next) {
    try {
      const { id, name } = await Category.create({ ...req.body });
      res.status(201).json({ id, name });
    } catch (error) {
      next(error);
    }
  }
  static async findAllCategory(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async findOneCategory(req, res, next) {
    try {
      const category = await Category.findByPk(req.params.categoryId);
      if (!category) {
        throw { name: 'not_found' };
      } else {
        res.status(200).json(category);
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const findCategory = await Category.findByPk(req.params.categoryId);
      if (!findCategory) {
        throw { name: 'not_found' };
      } else {
        const updateCategory = await Category.update(
          { ...req.body },
          { where: { id: req.params.categoryId } }
        );
        if (!updateCategory[0]) {
          throw { name: 'invalid_input' };
        } else {
          const findCategoryUpdate = await Category.findByPk(findCategory.id);
          res.status(200).json({
            message: 'success update category',
            data: findCategoryUpdate,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      const findCategory = await Category.findByPk(req.params.categoryId);
      if (!findCategory) {
        throw { name: 'not_found' };
      } else {
        const deleteCategory = await Category.destroy({
          where: { id: findCategory.id },
        });
        if (!deleteCategory) {
          throw { name: 'invalid_input' };
        } else {
          res
            .status(200)
            .json({ message: 'success delete category', data: findCategory });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = CategoryController;
