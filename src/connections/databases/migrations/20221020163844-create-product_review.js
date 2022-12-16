'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_review', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        autoIncrementIdentity: true,
        type: Sequelize.BIGINT(20),
      },
      title: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.SMALLINT,
      },
      published: {
        type: Sequelize.SMALLINT,
      },
      publishedAt: {
        type: Sequelize.DATE,
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_review');
  },
};
