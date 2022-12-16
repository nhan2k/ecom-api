import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';

export class CartItemModel extends Model {
  declare id: number;
  declare sku: string;
  declare price: number;
  declare discount: number;
  declare quantity: number;
  declare active: number;
  declare content: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare productId: number;
  declare cartId: number;
}

CartItemModel.init(
  {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    sku: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    price: {
      allowNull: false,
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.SMALLINT,
      defaultValue: 0,
    },
    active: {
      type: DataTypes.SMALLINT,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    content: {
      type: DataTypes.TEXT,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    productId: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    cartId: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
  },
  {
    tableName: 'cart_item',
    sequelize,
    paranoid: false,
    deletedAt: false,
  },
);

export default CartItemModel;
