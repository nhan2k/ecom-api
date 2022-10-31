'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_category', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: Sequelize.BIGINT,
      },
      productId: {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'product',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      categoryId: {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'category',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    return queryInterface.dropTable('product_category');
  },
};
