import { Request, Response } from 'express';
import CategoryService from './category.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import { TCategory } from './category.interface';

class CategoryController {
  private logFile = __filename;
  public categoryService = new CategoryService();

  public getCategories = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllCategoriesData: TCategory[] = await this.categoryService.findAllCategories();

      return new HttpResponse(HttpStatus.Created, findAllCategoriesData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getCategoryById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const CategoryId = Number(req.params.id);
      const findOneCategoryData: TCategory | null = await this.categoryService.findCategoryById(CategoryId);

      return new HttpResponse(HttpStatus.Created, findOneCategoryData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createCategory = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const CategoryData: any = req.body;
      const createCategoryData: { message: string } = await this.categoryService.createCategory(CategoryData);

      return new HttpResponse(HttpStatus.Created, createCategoryData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateCategory = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const CategoryId = Number(req.params.id);
      const CategoryData: any = req.body;
      const updateCategoryData: any = await this.categoryService.updateCategory(CategoryId, CategoryData);

      return new HttpResponse(HttpStatus.Created, updateCategoryData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteCategory = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const CategoryId = Number(req.params.id);
      const deleteCategoryData: any = await this.categoryService.deleteCategory(CategoryId);

      return new HttpResponse(HttpStatus.Created, deleteCategoryData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default CategoryController;
