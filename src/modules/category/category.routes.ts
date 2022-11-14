import { Router } from 'express';
import CategoryController from './category.controller';
import UploadMiddleware from '@middlewares/multer.middleware';

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
    this.router.post(`${this.path}`, UploadMiddleware, this.CategoryController.createCategory);
    this.router.put(`${this.path}/:id(\\d+)`, UploadMiddleware, this.CategoryController.updateCategory);
    this.router.delete(`${this.path}/:id(\\d+)`, this.CategoryController.deleteCategory);
  }
}

export default CategoryRoute;
