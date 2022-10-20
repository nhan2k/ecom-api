'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cart_item', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20),
      },
      productId: {
        type: Sequelize.BIGINT(20),
      },
      cartId: {
        type: Sequelize.STRING(100),
      },
      slug: {
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
      active: {
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
    return queryInterface.dropTable('cart_item');
  },
};
