'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {}
  }
  Item.init(
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
      description: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: 'description is required' },
          notNull: { msg: 'description is required' },
        },
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: 'price is required' },
          notNull: { msg: 'price is required' },
          min: {
            args: 10000,
            msg: 'minimum price 10000',
          },
        },
      },
      imgUrl: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: 'imgUrl is required' },
          notNull: { msg: 'imgUrl is required' },
        },
      },
      authorId: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: 'authorId is required' },
          notNull: { msg: 'authorId is required' },
        },
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: 'categoryId is required' },
          notNull: { msg: 'categoryId is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Item',
    }
  );
  return Item;
};
