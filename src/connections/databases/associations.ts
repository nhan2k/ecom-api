import { logger } from '@utils/logger';
import CartModel from '@modules/cart/cart.model';
import CartItemModel from '@modules/cart-item/cart.item.model';
import CategoryModel from '@modules/category/category.model';
import OrderModel from '@modules/order/order.model';
import OrderItemModel from '@modules/order-item/order.item.model';
import ProductModel from '@modules/product/product.model';
import ProductCategoryModel from '@modules/product-category/product.category.model';
import ProductMetaModel from '@modules/product-meta/product.meta.model';
import ProductReviewModel from '@modules/product-review/product.review.model';
import ProductTagModel from '@modules/product-tag/product.tag.model';
import TagModel from '@modules/tag/tag.model';
import TransactionModel from '@modules/transaction/transaction.model';
import UserModel from '@modules/user/user.model';

class Associations {
  public logFile = __filename;

  constructor() {}

  associations() {
    try {
      ProductModel.belongsToMany(CategoryModel, { through: ProductCategoryModel, foreignKey: 'productId' });
      CategoryModel.belongsToMany(ProductModel, { through: ProductCategoryModel, foreignKey: 'categoryId' });

      ProductModel.hasMany(ProductReviewModel, { foreignKey: 'productId' });
      ProductReviewModel.belongsTo(ProductModel, { foreignKey: 'productId' });

      ProductReviewModel.hasMany(ProductReviewModel, { foreignKey: 'parentId' });
      ProductReviewModel.belongsTo(ProductReviewModel, { foreignKey: 'parentId' });

      ProductModel.hasMany(ProductMetaModel, { foreignKey: 'productId' });
      ProductMetaModel.belongsTo(ProductReviewModel, { foreignKey: 'productId' });

      ProductModel.belongsToMany(TagModel, { through: ProductTagModel, foreignKey: 'productId' });
      TagModel.belongsToMany(ProductModel, { through: ProductTagModel, foreignKey: 'tagId' });

      ProductModel.hasMany(OrderItemModel, { foreignKey: 'productId' });
      OrderItemModel.belongsTo(ProductModel, { foreignKey: 'productId' });

      ProductModel.hasMany(CartItemModel, { foreignKey: 'productId' });
      CartItemModel.belongsTo(ProductModel, { foreignKey: 'productId' });

      UserModel.hasMany(ProductModel, { foreignKey: 'userId' });
      ProductModel.belongsTo(UserModel, { foreignKey: 'userId' });

      CartModel.hasMany(CartItemModel, { foreignKey: 'cartId' });
      CartItemModel.belongsTo(CartModel, { foreignKey: 'cartId' });

      UserModel.hasMany(CartModel, { foreignKey: 'userId' });
      CartModel.belongsTo(UserModel, { foreignKey: 'userId' });

      UserModel.hasMany(TransactionModel, { foreignKey: 'userId' });
      TransactionModel.belongsTo(UserModel, { foreignKey: 'userId' });

      UserModel.hasMany(OrderModel, { foreignKey: 'userId' });
      OrderModel.belongsTo(UserModel, { foreignKey: 'userId' });

      OrderModel.hasMany(TransactionModel, { foreignKey: 'orderId' });
      TransactionModel.belongsTo(OrderModel, { foreignKey: 'orderId' });

      OrderModel.hasMany(OrderItemModel, { foreignKey: 'orderId' });
      OrderItemModel.belongsTo(OrderModel, { foreignKey: 'orderId' });

      logger.info(`${this.logFile} associations enable`);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
    }
  }
}

export default Associations;
