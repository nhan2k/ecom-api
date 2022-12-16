import { Request, Response } from 'express';
import CategoryService from './category.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import _ from 'lodash';
import CategoryModel from './category.model';

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
      if (_.get(findOneCategoryData, 'message')) {
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
      const categoryData = req.body;

      const createCategoryData = await this.categoryService.createCategory(categoryData);
      if (_.get(createCategoryData, 'message')) {
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
      const categoryId = Number(req.params.id);
      const categoryData = req.body;

      let content: string = `{"img": "${String(req.file?.filename)}"}`;
      categoryData.content = JSON.parse(content);
      const updateCategoryData = await this.categoryService.updateCategory(categoryId, categoryData);
      if (_.get(updateCategoryData, 'message')) {
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
      if (_.get(deleteCategoryData, 'message')) {
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
