import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';
export class OrderItemModel extends Model {
  declare id: number;
  declare productId: number;
  declare orderId: number;
  declare sku: string;
  declare price: number;
  declare discount: number;
  declare quantity: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare content: string;
  declare deletedAt: Date;
}

OrderItemModel.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
    },
    productId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    quantity: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    content: {
      type: DataTypes.TEXT,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'order_item',
    sequelize,
    paranoid: true,
  },
);

export default OrderItemModel;
