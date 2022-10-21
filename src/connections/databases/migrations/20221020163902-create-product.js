'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        autoIncrementIdentity: true,
        type: Sequelize.BIGINT(20),
      },
      userId: {
        type: Sequelize.BIGINT(20),
      },
      title: {
        type: Sequelize.STRING(75),
      },
      metaTitle: {
        type: Sequelize.STRING(100),
      },
      slug: {
        type: Sequelize.STRING(100),
      },
      summary: {
        type: Sequelize.TEXT,
      },
      type: {
        type: Sequelize.SMALLINT,
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
      shop: {
        type: Sequelize.SMALLINT,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      publishedAt: {
        type: Sequelize.DATE,
      },
      startsAt: {
        type: Sequelize.DATE,
      },
      endsAt: {
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
    return queryInterface.dropTable('product');
  },
};
