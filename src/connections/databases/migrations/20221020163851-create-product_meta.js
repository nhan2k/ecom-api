'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_meta', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20),
      },
      productId: {
        type: Sequelize.BIGINT(20),
      },
      key: {
        type: Sequelize.STRING(50),
      },
      content: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_meta');
  },
};
