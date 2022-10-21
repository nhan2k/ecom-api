import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';
export class ProductReviewModel extends Model {
  declare id: number;
  declare productId: string;
  declare parentId: string;
  declare title: string;
  declare rating: string;
  declare published: string;
  declare publishedAt: string;
  declare content: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

ProductReviewModel.init(
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
    parentId: {
      type: DataTypes.BIGINT,
    },
    title: {
      type: DataTypes.STRING(100),
    },
    rating: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    published: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    publishedAt: {
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
    tableName: 'product_review',
    sequelize,
    paranoid: true,
  },
);

export default ProductReviewModel;
