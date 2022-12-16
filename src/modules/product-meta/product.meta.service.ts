import ProductMetaModel from './product.meta.model';
import { logger } from '@utils/logger';
import ProductMetaUtil from './product.meta.util';
import ProductModel from '@modules/product/product.model';

class ProductMetaService {
  private logFile = __filename;
  private productMetaUtil: ProductMetaUtil = new ProductMetaUtil();

  public async findAllProductCategories(id: number): Promise<ProductMetaModel[] | { message: string }> {
    try {
      const allProductMeta = await ProductMetaModel.findAll({
        attributes: ['key', 'content'],
      });

      allProductMeta.map(e => {
        if (e.content) {
          e.content = this.productMetaUtil.convertContent(e.content);
        }
      });

      return allProductMeta;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async findProductMetaById(ProductMetaId: number): Promise<ProductMetaModel | null | { message: string }> {
    try {
      const findProductMeta = await ProductMetaModel.findByPk(ProductMetaId, { attributes: ['key', 'content'] });
      if (!findProductMeta) {
        return { message: "Cart Item doesn't exist" };
      }
      findProductMeta.content = this.productMetaUtil.convertContent(findProductMeta.content);
      return findProductMeta;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async createProductMeta(ProductMetaData: any): Promise<ProductMetaModel | { message: string }> {
    try {
      const { content, ...rest } = ProductMetaData;
      let formatContent = this.productMetaUtil.convertContent(content);
      const res = await ProductMetaModel.create({ content: formatContent, ...rest });
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
      const { content, ...rest } = ProductMetaData;
      let formatContent = this.productMetaUtil.convertContent(content);
      await ProductMetaModel.update({ content: formatContent, ...rest }, { where: { id: ProductMetaId } });
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
