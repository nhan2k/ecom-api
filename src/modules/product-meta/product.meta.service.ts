import ProductMetaModel from './product.meta.model';
import { logger } from '@utils/logger';

class ProductMetaService {
  public logFile = __filename;

  public async findAllProductCategories(): Promise<ProductMetaModel[]> {
    try {
      const allProductMeta: ProductMetaModel[] = await ProductMetaModel.findAll();
      return allProductMeta;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return [];
    }
  }

  public async findProductMetaById(ProductMetaId: number): Promise<ProductMetaModel | null> {
    try {
      const findProductMeta: ProductMetaModel | null = await ProductMetaModel.findByPk(ProductMetaId);
      return findProductMeta;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return null;
    }
  }

  public async createProductMeta(ProductMetaData: any): Promise<{ message: string }> {
    try {
      console.log(ProductMetaData);
      await ProductMetaModel.create({ ...ProductMetaData });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async updateProductMeta(ProductMetaId: number, ProductMetaData: any): Promise<{ message: string }> {
    try {
      const findProductMeta: ProductMetaModel | null = await ProductMetaModel.findByPk(ProductMetaId);
      if (!findProductMeta) {
        return { message: "ProductMeta doesn't exist" };
      }
      await ProductMetaModel.update({ ...ProductMetaData }, { where: { id: ProductMetaId } });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async deleteProductMeta(ProductMetaId: number): Promise<any> {
    try {
      const findProductMeta: any = await ProductMetaModel.findByPk(ProductMetaId);
      if (!findProductMeta) {
        return { message: "ProductMeta doesn't exist" };
      }
      await ProductMetaModel.destroy({ where: { id: ProductMetaId } });

      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }
}

export default ProductMetaService;
