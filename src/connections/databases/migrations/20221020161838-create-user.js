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
      middleName: {
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
      registeredAt: {
        type: Sequelize.DATE,
      },
      lastLogin: {
        type: Sequelize.DATE,
      },
      intro: {
        type: Sequelize.STRING,
      },
      profile: {
        type: Sequelize.JSON,
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
