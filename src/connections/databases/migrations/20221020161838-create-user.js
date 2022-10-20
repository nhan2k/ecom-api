'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      id: {
        autoIncrement: true,
        primaryKey: true,
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
      },
      email: {
        type: Sequelize.STRING(50),
      },
      passwordhash: {
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
