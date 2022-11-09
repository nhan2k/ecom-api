import ProductTagModel from './product.tag.model';
import { logger } from '@utils/logger';
import ProductModel from '@modules/product/product.model';
import TagModel from '@modules/tag/tag.model';

class ProductTagService {
  public logFile = __filename;

  public async findAllProductCategories(): Promise<ProductTagModel[] | { message: string }> {
    try {
      const allProductTag: ProductTagModel[] = await ProductTagModel.findAll();
      return allProductTag;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async findProductTagById(ProductTagId: number): Promise<ProductTagModel | null | { message: string }> {
    try {
      const findProductTag = await ProductTagModel.findByPk(ProductTagId);
      if (!findProductTag) {
        return { message: "Cart Item doesn't exist" };
      }
      return findProductTag;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async createProductTag(ProductTagData: any): Promise<ProductTagModel | { message: string }> {
    try {
      const res = await ProductTagModel.create({ ...ProductTagData });
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async updateProductTag(ProductTagId: number, ProductTagData: any): Promise<ProductTagModel | null | { message: string }> {
    try {
      const findProductTag: ProductTagModel | null = await ProductTagModel.findByPk(ProductTagId);
      if (!findProductTag) {
        return { message: "ProductTag doesn't exist" };
      }
      await ProductTagModel.update({ ...ProductTagData }, { where: { id: ProductTagId } });
      const res = ProductTagModel.findByPk(ProductTagId);
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async deleteProductTag(ProductTagId: number): Promise<{ id: number } | { message: string }> {
    try {
      const findProductTag: any = await ProductTagModel.findByPk(ProductTagId);
      if (!findProductTag) {
        return { message: "ProductTag doesn't exist" };
      }
      await ProductTagModel.destroy({ where: { id: ProductTagId } });

      return { id: ProductTagId };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default ProductTagService;
