'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('order', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: Sequelize.BIGINT(20),
      },
      userId: {
        type: Sequelize.BIGINT(20),
      },
      sessionId: {
        type: Sequelize.STRING(100),
      },
      token: {
        type: Sequelize.STRING(100),
      },
      status: {
        type: Sequelize.SMALLINT,
      },
      subTotal: {
        type: Sequelize.FLOAT,
      },
      itemDiscount: {
        type: Sequelize.FLOAT,
      },
      tax: {
        type: Sequelize.FLOAT,
      },
      shipping: {
        type: Sequelize.FLOAT,
      },
      total: {
        type: Sequelize.FLOAT,
      },
      promo: {
        type: Sequelize.STRING(50),
      },
      discount: {
        type: Sequelize.FLOAT,
      },
      grandTotal: {
        type: Sequelize.FLOAT,
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
      line1: {
        type: Sequelize.STRING(50),
      },
      line2: {
        type: Sequelize.STRING(50),
      },
      city: {
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
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('order');
  },
};
