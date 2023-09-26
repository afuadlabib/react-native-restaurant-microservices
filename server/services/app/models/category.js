'use strict';
const { Model } = require('sequelize');
const { v4: uuid } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {}
  Category.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: 'name is required' },
          notNull: { msg: 'name is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );
  Category.beforeCreate((category) => {
    category.id = uuid();
  });
  return Category;
};
