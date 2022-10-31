'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('category', 'parentId', {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'category',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
      queryInterface.addColumn('product_category', 'productId', {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'product',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
      queryInterface.addColumn('product_category', 'categoryId', {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'category',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
      queryInterface.addColumn('product_review', 'productId', {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'product',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
      queryInterface.addColumn('product_review', 'parentId', {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'product_review',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
      queryInterface.addColumn('product_meta', 'productId', {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'product',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
      queryInterface.addColumn('product_tag', 'productId', {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'product',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
      queryInterface.addColumn('product_tag', 'tagId', {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'tag',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
      queryInterface.addColumn('product', 'userId', {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
      queryInterface.addColumn('order_item', 'productId', {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'product',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
      queryInterface.addColumn('order_item', 'orderId', {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'order',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
      queryInterface.addColumn('transaction', 'userId', {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
      queryInterface.addColumn('transaction', 'orderId', {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'order',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
      queryInterface.addColumn('order', 'userId', {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
      queryInterface.addColumn('cart_item', 'productId', {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'product',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
      queryInterface.addColumn('cart_item', 'cartId', {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'cart',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
      queryInterface.addColumn('cart', 'userId', {
        type: Sequelize.BIGINT(20),
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('transaction', 'productId')]);
  },
};
