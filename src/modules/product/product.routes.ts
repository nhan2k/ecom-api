import { Router } from 'express';
import ProductController from './product.controller';

class ProductRoute {
  public path = '/product';
  public router = Router();
  public ProductController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.ProductController.getProducts);
    this.router.get(`${this.path}/:id(\\d+)`, this.ProductController.getProductById);
    this.router.post(`${this.path}`, this.ProductController.createProduct);
    this.router.put(`${this.path}/:id(\\d+)`, this.ProductController.updateProduct);
    this.router.delete(`${this.path}/:id(\\d+)`, this.ProductController.deleteProduct);
  }
}

export default ProductRoute;
