import ProductMetaModel from './product.meta.model';
import { logger } from '@utils/logger';

class ProductMetaService {
  public logFile = __filename;

  public async findAllProductCategories(): Promise<ProductMetaModel[] | { message: string }> {
    try {
      const allProductMeta = await ProductMetaModel.findAll();
      return allProductMeta;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async findProductMetaById(ProductMetaId: number): Promise<ProductMetaModel | null | { message: string }> {
    try {
      const findProductMeta = await ProductMetaModel.findByPk(ProductMetaId);
      if (!findProductMeta) {
        return { message: "Cart Item doesn't exist" };
      }
      return findProductMeta;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async createProductMeta(ProductMetaData: any): Promise<ProductMetaModel | { message: string }> {
    try {
      const res = await ProductMetaModel.create({ ...ProductMetaData });
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async updateProductMeta(ProductMetaId: number, ProductMetaData: any): Promise<ProductMetaModel | null | { message: string }> {
    try {
      const findProductMeta = await ProductMetaModel.findByPk(ProductMetaId);
      if (!findProductMeta) {
        return { message: "ProductMeta doesn't exist" };
      }
      await ProductMetaModel.update({ ...ProductMetaData }, { where: { id: ProductMetaId } });
      const res = ProductMetaModel.findByPk(ProductMetaId);
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async deleteProductMeta(ProductMetaId: number): Promise<{ id: number } | { message: string }> {
    try {
      const findProductMeta: any = await ProductMetaModel.findByPk(ProductMetaId);
      if (!findProductMeta) {
        return { message: "ProductMeta doesn't exist" };
      }
      await ProductMetaModel.destroy({ where: { id: ProductMetaId } });

      return { id: ProductMetaId };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default ProductMetaService;
