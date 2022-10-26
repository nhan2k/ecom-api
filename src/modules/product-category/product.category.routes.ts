import { Router } from 'express';
import ProductCategoryController from './product.category.controller';

class ProductCategoryRoute {
  public path = '/product-category';
  public router = Router();
  public ProductCategoryController = new ProductCategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.ProductCategoryController.getProductCategories);
    this.router.get(`${this.path}/:id(\\d+)`, this.ProductCategoryController.getProductCategoryById);
    this.router.post(`${this.path}`, this.ProductCategoryController.createProductCategory);
    this.router.put(`${this.path}/:id(\\d+)`, this.ProductCategoryController.updateProductCategory);
    this.router.delete(`${this.path}/:id(\\d+)`, this.ProductCategoryController.deleteProductCategory);
  }
}

export default ProductCategoryRoute;
