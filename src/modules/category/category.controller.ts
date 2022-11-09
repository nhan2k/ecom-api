import { Request, Response } from 'express';
import CategoryService from './category.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import _ from 'lodash';

class CategoryController {
  private logFile = __filename;
  public categoryService = new CategoryService();

  public getCategories = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllCategoriesData = await this.categoryService.findAllCategories();
      if (!Array.isArray(findAllCategoriesData)) {
        return new HttpResponse(HttpStatus.BadRequest, findAllCategoriesData).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.OK, findAllCategoriesData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getCategoryById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const CategoryId = Number(req.params.id);
      const findOneCategoryData = await this.categoryService.findCategoryById(CategoryId);
      if (_.findKey(findOneCategoryData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, findOneCategoryData).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.OK, findOneCategoryData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createCategory = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const CategoryData = req.body;
      const createCategoryData = await this.categoryService.createCategory(CategoryData);
      if (_.findKey(createCategoryData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, createCategoryData).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.Created, createCategoryData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateCategory = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const CategoryId = Number(req.params.id);
      const CategoryData = req.body;
      const updateCategoryData = await this.categoryService.updateCategory(CategoryId, CategoryData);
      if (_.findKey(updateCategoryData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, updateCategoryData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, updateCategoryData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteCategory = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const CategoryId = Number(req.params.id);
      const deleteCategoryData = await this.categoryService.deleteCategory(CategoryId);
      if (_.findKey(deleteCategoryData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, deleteCategoryData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, deleteCategoryData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default CategoryController;
