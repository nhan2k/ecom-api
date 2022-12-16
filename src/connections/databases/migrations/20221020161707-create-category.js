'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('category', {
      id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20),
      },
      title: {
        type: Sequelize.STRING(75),
      },
      metaTitle: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING(100),
      },
      content: {
        type: Sequelize.JSON,
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
    return queryInterface.dropTable('category');
  },
};
