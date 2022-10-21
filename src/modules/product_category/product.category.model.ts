import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';
export class ProductCategoryModel extends Model {
  declare productId: number;
  declare categoryId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

ProductCategoryModel.init(
  {
    productId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'product_category',
    sequelize,
    paranoid: true,
  },
);

export default ProductCategoryModel;
