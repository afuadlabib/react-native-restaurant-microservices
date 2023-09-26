'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    static associate(models) {}
  }
  Ingredient.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      itemId: {
        allowNull: false,
        type: DataTypes.UUID,
        validate: {
          notEmpty: { msg: 'itemId is required' },
          notNull: { msg: 'itemId is required' },
        },
      },
      item_id: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: 'itemId is required' },
          notNull: { msg: 'itemId is required' },
        },
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
      modelName: 'Ingredient',
    }
  );
  return Ingredient;
};
