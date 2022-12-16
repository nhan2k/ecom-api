'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_category', {
      // id: {
      //   primaryKey: true,
      //   autoIncrement: true,
      //   autoIncrementIdentity: true,
      //   type: Sequelize.BIGINT,
      // },
      // createdAt: {
      //   type: Sequelize.DATE,
      // },
      // updatedAt: {
      //   type: Sequelize.DATE,
      // },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_category');
  },
};
