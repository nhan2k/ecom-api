'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_category', {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_category');
  },
};
