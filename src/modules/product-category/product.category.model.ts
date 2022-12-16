import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';

export class ProductCategoryModel extends Model {
  declare productId: number;
  declare categoryId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
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
  },
  {
    tableName: 'product_category',
    sequelize,
    timestamps: false,
    paranoid: false,
    deletedAt: false,
  },
);

export default ProductCategoryModel;
