import { Router } from 'express';
import ProductController from './product.controller';
import UploadMiddleware from '@middlewares/multer.middleware';

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
    this.router.post(`${this.path}`, UploadMiddleware, this.ProductController.createProduct);
    this.router.put(`${this.path}/:id(\\d+)`, UploadMiddleware, this.ProductController.updateProduct);
    this.router.delete(`${this.path}/:id(\\d+)`, this.ProductController.deleteProduct);
    this.router.get(`${this.path}/count`, this.ProductController.countProducts);
  }
}

export default ProductRoute;
