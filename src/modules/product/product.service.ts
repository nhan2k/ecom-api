import ProductModel from './product.model';
import { logger } from '@utils/logger';
import { IProductData } from './type';
import slugify from 'slugify';
import ProductReviewModel from '../product-review/product.review.model';
import ProductMetaModel from '../product-meta/product.meta.model';
import TagModel from '../tag/tag.model';
import CategoryModel from '../category/category.model';
import { v4 as uuidv4 } from 'uuid';
import ProductUtil from './product.util';
import { sequelize } from '@connections/databases';
import { shop } from './enum';
import { published } from '@modules/product-review/enum';
import fs from 'fs';

class ProductService {
  public logFile = __filename;

  public async findAllProducts(): Promise<ProductModel[] | { message: string }> {
    try {
      const allProduct: ProductModel[] = await new ProductUtil().getProducts(shop.available);
      return allProduct;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async findAllProductsUnavailable(): Promise<ProductModel[] | { message: string }> {
    try {
      const allProduct: ProductModel[] = await new ProductUtil().getProducts(shop.unavailable);
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

  public async createProduct(ProductData: IProductData | any, id: number): Promise<ProductModel | any | { message: string }> {
    try {
      const result = await sequelize.transaction(async t => {
        const { title, quantity, content, price, meta, summary } = ProductData;
        const record = await ProductModel.findOne({ where: { title: title }, transaction: t });
        if (record) {
          return { message: 'Record already exists' };
        }
        let newSlug = '';
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
        }

        let newSku = `${title}/${uuidv4()}`;
        const newProduct = await ProductModel.create(
          { slug: newSlug, sku: newSku, title, userId: id, quantity, content, price, summary, shop: shop.available },
          { transaction: t },
        );

        await ProductReviewModel.create(
          {
            productId: newProduct.id,
            published: published.public,
          },
          { transaction: t },
        );

        if (meta) {
          let newMetas = JSON.parse(meta);

          newMetas.map(async (e: any) => {
            await ProductMetaModel.create({
              productId: newProduct.id,
              key: e.key,
              content: e.content,
            });
          });
        }

        return newProduct;
      });
      return result;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async updateProduct(ProductId: number, ProductData: IProductData): Promise<ProductModel | any | { message: string }> {
    try {
      const findProduct: ProductModel | null = await ProductModel.findByPk(ProductId);
      if (!findProduct) {
        return { message: "Product doesn't exist" };
      }
      const { title, summary, ...rest } = ProductData;
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
      const res = await new ProductUtil().getProduct(ProductId);
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async updateShopProduct(ProductId: number, ProductData: IProductData): Promise<ProductModel | any | { message: string }> {
    try {
      const findProduct: ProductModel | null = await ProductModel.findByPk(ProductId);
      if (!findProduct) {
        return { message: "Product doesn't exist" };
      }
      const { shop } = ProductData;
      await ProductModel.update({ shop }, { where: { id: ProductId } });
      const res = await new ProductUtil().getProduct(ProductId);
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
      if (fs.existsSync(`public/${findProduct.content}`)) {
        fs.unlinkSync(`public/${findProduct.content}`);
      }

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

  public async findAllProductsForVendor(id: number): Promise<ProductModel[] | { message: string }> {
    try {
      const allProduct: ProductModel[] = await ProductModel.findAll({
        where: { userId: id },
        attributes: [
          'id',
          'title',
          'metaTitle',
          'summary',
          'type',
          'price',
          'discount',
          'quantity',
          'shop',
          'publishedAt',
          'startsAt',
          'endsAt',
          'content',
        ],
        include: [
          {
            model: CategoryModel,
            attributes: ['title'],
          },
          {
            model: ProductReviewModel,
            attributes: ['rating'],
          },
          {
            model: ProductMetaModel,
            attributes: ['key', 'content'],
          },
          {
            model: TagModel,
            attributes: ['title'],
          },
        ],
      });
      return allProduct;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default ProductService;
