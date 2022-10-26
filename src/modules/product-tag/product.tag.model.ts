import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';
export class ProductTagModel extends Model {
  declare productId: number;
  declare tagId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

ProductTagModel.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
    },
    productId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    tagId: {
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
    tableName: 'product_tag',
    sequelize,
    paranoid: true,
  },
);

export default ProductTagModel;
