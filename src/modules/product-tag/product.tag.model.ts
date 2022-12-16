import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';
import ProductModel from '@modules/product/product.model';
import TagModel from '@modules/tag/tag.model';
export class ProductTagModel extends Model {
  declare id: number;
  declare productId: number;
  declare tagId: number;
}

ProductTagModel.init(
  {
    productId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    tagId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: 'product_tag',
    sequelize,
    timestamps: false,
    paranoid: false,
    deletedAt: false,
  },
);

export default ProductTagModel;
