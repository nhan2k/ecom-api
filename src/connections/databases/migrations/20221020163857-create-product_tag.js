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
        references: {
          model: 'product',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      tagId: {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'tag',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
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
