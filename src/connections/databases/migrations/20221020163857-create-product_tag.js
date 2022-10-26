'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_tag', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: Sequelize.BIGINT,
      },
      productId: {
        type: Sequelize.BIGINT(20),
      },
      tagId: {
        type: Sequelize.BIGINT(20),
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
    return queryInterface.dropTable('product_tag');
  },
};
