import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';
export class TransactionModel extends Model {
  declare id: number;
  declare productId: number;
  declare orderId: number;
  declare code: string;
  declare type: number;
  declare mode: number;
  declare status: number;
  declare content: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

TransactionModel.init(
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
    code: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    mode: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
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
    tableName: 'transaction',
    sequelize,
    paranoid: true,
  },
);

export default TransactionModel;
