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
      parentId: {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'category',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
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
      content: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable('category');
  },
};
