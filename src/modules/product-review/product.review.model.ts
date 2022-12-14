import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';
export class ProductReviewModel extends Model {
  declare id: number;
  declare productId: number;
  declare parentId: number;
  declare title: string;
  declare rating: number;
  declare published: number;
  declare publishedAt: Date;
  declare content: number;
  declare createdAt: Date;
  declare updatedAt: Date;
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
      validate: {
        min: 0,
        max: 5,
      },
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
  },
  {
    tableName: 'product_review',
    sequelize,
    paranoid: false,
    deletedAt: false,
  },
);

export default ProductReviewModel;
