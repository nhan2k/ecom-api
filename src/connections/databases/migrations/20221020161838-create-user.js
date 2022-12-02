'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        autoIncrementIdentity: true,
        type: Sequelize.BIGINT(20),
      },
      firstName: {
        type: Sequelize.STRING(50),
      },
      lastName: {
        type: Sequelize.STRING(50),
      },
      mobile: {
        type: Sequelize.STRING(15),
        unique: true,
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true,
      },
      passwordHash: {
        type: Sequelize.STRING(150),
      },
      admin: {
        type: Sequelize.SMALLINT,
      },
      vendor: {
        type: Sequelize.SMALLINT,
      },
      lastLogin: {
        type: Sequelize.DATE,
      },
      intro: {
        type: Sequelize.STRING,
      },
      profile: {
        type: Sequelize.TEXT,
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
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user');
  },
};
