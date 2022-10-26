import { Router } from 'express';
import ProductReviewController from './product.review.controller';

class ProductReviewRoute {
  public path = '/product-review';
  public router = Router();
  public ProductReviewController = new ProductReviewController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.ProductReviewController.getProductCategories);
    this.router.get(`${this.path}/:id(\\d+)`, this.ProductReviewController.getProductReviewById);
    this.router.post(`${this.path}`, this.ProductReviewController.createProductReview);
    this.router.put(`${this.path}/:id(\\d+)`, this.ProductReviewController.updateProductReview);
    this.router.delete(`${this.path}/:id(\\d+)`, this.ProductReviewController.deleteProductReview);
  }
}

export default ProductReviewRoute;
