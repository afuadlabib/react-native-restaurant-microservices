'use strict';
const { hashPassword } = require('../helpers/bcrypt');
const { User, Category } = require('../models');
const { v4: uuid } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let dataCategories = require('../db/category.json');
    let dataItems = require('../db/item.json');

    await queryInterface.bulkInsert('Categories', dataCategories);
    console.log(dataCategories);

    await queryInterface.bulkInsert('Items', dataItems);
    console.log(dataItems);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await queryInterface.bulkDelete('Categories', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
