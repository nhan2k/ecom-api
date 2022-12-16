'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cart', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        autoIncrementIdentity: true,
        type: Sequelize.BIGINT(20),
      },
      sessionId: {
        type: Sequelize.STRING,
      },
      token: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.SMALLINT,
      },
      firstName: {
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
      line: {
        type: Sequelize.STRING(50),
      },
      ward: {
        type: Sequelize.STRING(50),
      },
      district: {
        type: Sequelize.STRING(50),
      },
      province: {
        type: Sequelize.STRING(50),
      },
      country: {
        type: Sequelize.STRING(50),
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      content: {
        type: Sequelize.TEXT,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cart');
  },
};
