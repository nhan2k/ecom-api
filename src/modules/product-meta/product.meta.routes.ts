import { Router } from 'express';
import ProductMetaController from './product.meta.controller';

class ProductMetaRoute {
  public path = '/product-meta';
  public router = Router();
  public ProductMetaController = new ProductMetaController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.ProductMetaController.getProductCategories);
    this.router.get(`${this.path}/:id(\\d+)`, this.ProductMetaController.getProductMetaById);
    this.router.post(`${this.path}`, this.ProductMetaController.createProductMeta);
    this.router.put(`${this.path}/:id(\\d+)`, this.ProductMetaController.updateProductMeta);
    this.router.delete(`${this.path}/:id(\\d+)`, this.ProductMetaController.deleteProductMeta);
  }
}

export default ProductMetaRoute;
