import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';
export class ProductModel extends Model {
  declare id: number;
  declare userId: number;
  declare title: string;
  declare metaTitle: string;
  declare slug: string;
  declare summary: string;
  declare type: number;
  declare sku: string;
  declare price: number;
  declare discount: number;
  declare quantity: number;
  declare shop: number;
  declare publishedAt: Date;
  declare startsAt: Date;
  declare endsAt: Date;
  declare content: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

ProductModel.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(75),
      allowNull: false,
    },
    metaTitle: {
      type: DataTypes.STRING(100),
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
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
    shop: {
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
    publishedAt: {
      type: DataTypes.DATE,
    },
    startsAt: {
      type: DataTypes.DATE,
    },
    endsAt: {
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
    tableName: 'product',
    sequelize,
    paranoid: true,
  },
);

export default ProductModel;
