import { Router } from 'express';
import ProductTagController from './product.tag.controller';

class ProductTagRoute {
  public path = '/product-tag';
  public router = Router();
  public ProductTagController = new ProductTagController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.ProductTagController.getProductCategories);
    this.router.get(`${this.path}/:id(\\d+)`, this.ProductTagController.getProductTagById);
    this.router.post(`${this.path}`, this.ProductTagController.createProductTag);
    this.router.put(`${this.path}/:id(\\d+)`, this.ProductTagController.updateProductTag);
    this.router.delete(`${this.path}/:id(\\d+)`, this.ProductTagController.deleteProductTag);
  }
}

export default ProductTagRoute;
