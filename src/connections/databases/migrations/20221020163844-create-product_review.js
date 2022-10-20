'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_review', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20),
      },
      productId: {
        type: Sequelize.BIGINT(20),
      },
      parentId: {
        type: Sequelize.BIGINT(20),
      },
      title: {
        type: Sequelize.STRING(100),
      },
      rating: {
        type: Sequelize.SMALLINT,
      },
      published: {
        type: Sequelize.SMALLINT,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      publishedAt: {
        type: Sequelize.DATE,
      },
      content: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable('product_review');
  },
};
