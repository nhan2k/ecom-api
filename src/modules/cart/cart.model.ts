import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';
export class CartModel extends Model {
  declare id: number;
  declare userId: number;
  declare sessionId: string;
  declare token: string;
  declare status: number;
  declare firstName: string;
  declare middleName: string;
  declare lastName: string;
  declare mobile: string;
  declare email: string;
  declare line1: string;
  declare line2: string;
  declare city: string;
  declare province: string;
  declare country: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare content: string;
  declare deletedAt: Date;
}

CartModel.init(
  {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    userId: {
      type: DataTypes.BIGINT,
    },
    sessionId: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    token: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    firstName: {
      type: DataTypes.STRING(50),
    },
    middleName: {
      type: DataTypes.STRING(50),
    },
    lastName: {
      type: DataTypes.STRING(50),
    },
    mobile: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    line1: {
      type: DataTypes.STRING,
    },
    line2: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
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
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'cart',
    sequelize,
    paranoid: true,
  },
);

export default CartModel;
