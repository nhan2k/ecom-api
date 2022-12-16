import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';
export class ProductMetaModel extends Model {
  declare id: number;
  declare productId: number;
  declare key: string;
  declare content: string | Array<string>;
  declare createdAt: Date;
  declare updatedAt: Date;
}

ProductMetaModel.init(
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
    key: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'product_meta',
    sequelize,
    paranoid: false,
    deletedAt: false,
  },
);

export default ProductMetaModel;
