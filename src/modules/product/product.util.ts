import CategoryModel from '@modules/category/category.model';
import ProductReviewModel from '@modules/product-review/product.review.model';
import ProductModel from './product.model';
import { published } from '@modules/product-review/enum';
import ProductMetaModel from '@modules/product-meta/product.meta.model';
import TagModel from '@modules/tag/tag.model';

class ProductUtil {
  public async getProducts(shop: number) {
    const allProduct = await ProductModel.findAll({
      where: { shop: shop },
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
        'image',
      ],
      include: [
        {
          model: CategoryModel,
          attributes: ['title'],
        },
        {
          model: ProductReviewModel,
          attributes: ['title', 'rating'],
          // where: { published: published.public },
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
  }

  public async getProduct(id: number) {
    const allProduct = await ProductModel.findOne({
      where: { id: id },
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
        'image',
      ],
      include: [
        {
          model: CategoryModel,
          attributes: ['title'],
        },
        {
          model: ProductReviewModel,
          attributes: ['title', 'rating'],
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
  }
}

export default ProductUtil;
