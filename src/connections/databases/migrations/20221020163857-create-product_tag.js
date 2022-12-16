'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_tag', {
      // id: {
      //   autoIncrement: true,
      //   primaryKey: true,
      //   autoIncrementIdentity: true,
      //   type: Sequelize.BIGINT(20),
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
    return queryInterface.dropTable('product_tag');
  },
};
