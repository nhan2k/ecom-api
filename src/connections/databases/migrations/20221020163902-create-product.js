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
      title: {
        type: Sequelize.STRING,
      },
      metaTitle: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
        unique: true,
      },
      summary: {
        type: Sequelize.JSON,
      },
      type: {
        type: Sequelize.SMALLINT,
      },
      sku: {
        type: Sequelize.STRING,
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
      image: {
        type: Sequelize.TEXT,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product');
  },
};
