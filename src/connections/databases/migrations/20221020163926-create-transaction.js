'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transaction', {
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
      code: {
        type: Sequelize.STRING(100),
      },
      type: {
        type: Sequelize.SMALLINT,
      },
      mode: {
        type: Sequelize.SMALLINT,
      },
      status: {
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
    return queryInterface.dropTable('transaction');
  },
};