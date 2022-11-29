import ProductModel from './product.model';
import { logger } from '@utils/logger';
import { IProductData } from './type';
import slugify from 'slugify';
import ProductTagModel from '../product-tag/product.tag.model';
import ProductReviewModel from '../product-review/product.review.model';
import ProductMetaModel from '../product-meta/product.meta.model';
import TagModel from '../tag/tag.model';
import { sequelize } from '@connections/databases';

class ProductService {
  public logFile = __filename;

  public async findAllProducts(): Promise<ProductModel[] | { message: string }> {
    try {
      const allProduct: ProductModel[] = await ProductModel.findAll({
        attributes: [
          'id',
          'userId',
          'title',
          'metaTitle',
          'slug',
          'summary',
          'type',
          'sku',
          'price',
          'discount',
          'quantity',
          'shop',
          'publishedAt',
          'startsAt',
          'endsAt',
          'content',
          'createdAt',
          'updatedAt',
          'deletedAt',
        ],
      });
      return allProduct;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async findProductById(ProductId: number): Promise<{ findProduct: ProductModel | null; rating: number } | { message: string }> {
    try {
      const findProduct = await ProductModel.findByPk(ProductId, {
        include: [
          {
            model: ProductReviewModel,
          },
          {
            model: ProductMetaModel,
          },
          {
            model: TagModel,
          },
        ],
      });
      const count = await ProductReviewModel.count({ where: { productId: ProductId } });
      const sum = await ProductReviewModel.sum('rating');
      const rating = Math.fround(sum / count);
      if (!findProduct) {
        return { message: "Cart Item doesn't exist" };
      }
      return { findProduct, rating };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async createProduct(ProductData: IProductData, id: number): Promise<ProductModel | { message: string }> {
    try {
      console.log('🚀 ~ file: product.service.ts ~ line 75 ~ ProductService ~ createProduct ~ ProductData', ProductData);
      const { slug, sku, title, summary, userId, ...rest } = ProductData;
      const record = await ProductModel.findOne({ where: { title: title, deletedAt: null } });
      if (record) {
        return { message: 'Record already exists' };
      }
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
      const res = await ProductModel.create({ slug: newSlug, sku: newSku, title, summary, userId: id, ...rest });
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async updateProduct(ProductId: number, ProductData: IProductData): Promise<ProductModel | null | { message: string }> {
    try {
      const findProduct: ProductModel | null = await ProductModel.findByPk(ProductId);
      if (!findProduct) {
        return { message: "Product doesn't exist" };
      }
      const { slug, sku, title, summary, userId, ...rest } = ProductData;
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
      await ProductModel.update({ slug: newSlug, sku: newSku, title, summary, ...rest }, { where: { id: ProductId } });
      const res = ProductModel.findByPk(ProductId);
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async deleteProduct(ProductId: number): Promise<{ id: number } | { message: string }> {
    try {
      const findProduct = await ProductModel.findByPk(ProductId);
      if (!findProduct) {
        return { message: "Product doesn't exist" };
      }
      await ProductModel.destroy({ where: { id: ProductId } });

      return { id: ProductId };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async countProduct(id: number): Promise<number | { message: string }> {
    try {
      const count = await ProductModel.count({ where: { userId: id } });

      return count;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default ProductService;
