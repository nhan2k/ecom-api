import ProductModel from './product.model';
import { logger } from '@utils/logger';
import { IProductData } from './type';
import slugify from 'slugify';

class ProductService {
  public logFile = __filename;

  public async findAllProducts(): Promise<ProductModel[]> {
    try {
      const allProduct: ProductModel[] = await ProductModel.findAll();
      return allProduct;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return [];
    }
  }

  public async findProductById(ProductId: number): Promise<ProductModel | null> {
    try {
      const findProduct: ProductModel | null = await ProductModel.findByPk(ProductId);
      return findProduct;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return null;
    }
  }

  public async createProduct(ProductData: IProductData): Promise<{ message: string }> {
    try {
      const { slug, sku, title, summary, ...rest } = ProductData;
      let newSlug = '';
      let newSku = '';
      if (title) {
        newSlug = slugify(title);
      }
      if (summary) {
        let arrSummary: Array<string | number> = [];
        for (const key in summary) {
          if (Object.prototype.hasOwnProperty.call(summary, key)) {
            let element = summary[key];
            arrSummary.push(element);
          }
        }
        newSku = arrSummary.join('-').toLowerCase();
      }
      await ProductModel.create({ slug: newSlug, sku: newSku, title, summary, ...rest });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async updateProduct(ProductId: number, ProductData: IProductData): Promise<{ message: string }> {
    try {
      const findProduct: ProductModel | null = await ProductModel.findByPk(ProductId);
      if (!findProduct) {
        return { message: "Product doesn't exist" };
      }
      await ProductModel.update({ ...ProductData }, { where: { id: ProductId } });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async deleteProduct(ProductId: number): Promise<any> {
    try {
      const findProduct: any = await ProductModel.findByPk(ProductId);
      if (!findProduct) {
        return { message: "Product doesn't exist" };
      }
      await ProductModel.destroy({ where: { id: ProductId } });

      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }
}

export default ProductService;
