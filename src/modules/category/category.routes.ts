import { Router } from 'express';
import CategoryController from './category.controller';

class CategoryRoute {
  public path = '/category';
  public router = Router();
  public CategoryController = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.CategoryController.getCategories);
    this.router.get(`${this.path}/:id(\\d+)`, this.CategoryController.getCategoryById);
    this.router.post(`${this.path}`, this.CategoryController.createCategory);
    this.router.put(`${this.path}/:id(\\d+)`, this.CategoryController.updateCategory);
    this.router.delete(`${this.path}/:id(\\d+)`, this.CategoryController.deleteCategory);
  }
}

export default CategoryRoute;
