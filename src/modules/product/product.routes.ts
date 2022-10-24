import { Router } from 'express';
import ProductController from './product.controller';
import authenticatedLocal from '@/middlewares/auth.middleware';

class ProductRoute {
  public path = '/product';
  public router = Router();
  public ProductController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authenticatedLocal, this.ProductController.getProducts);
    this.router.get(`${this.path}/:id(\\d+)`, authenticatedLocal, this.ProductController.getProductById);
    this.router.post(`${this.path}`, authenticatedLocal, this.ProductController.createProduct);
    this.router.put(`${this.path}/:id(\\d+)`, authenticatedLocal, this.ProductController.updateProduct);
    this.router.delete(`${this.path}/:id(\\d+)`, authenticatedLocal, this.ProductController.deleteProduct);
  }
}

export default ProductRoute;
