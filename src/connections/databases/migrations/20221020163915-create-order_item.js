'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('order_item', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20),
      },
      productId: {
        type: Sequelize.BIGINT(20),
      },
      orderId: {
        type: Sequelize.BIGINT(20),
      },
      sku: {
        type: Sequelize.STRING(100),
      },
      price: {
        type: Sequelize.FLOAT,
      },
      discount: {
        type: Sequelize.FLOAT,
      },
      quantity: {
        type: Sequelize.SMALLINT,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      content: {
        type: Sequelize.TEXT,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('order_item');
  },
};
