import CategoryModel from './category.model';
import { logger } from '@utils/logger';

class CategoryService {
  public logFile = __filename;

  public async findAllCategories(): Promise<CategoryModel[]> {
    try {
      const allCategory: CategoryModel[] = await CategoryModel.findAll();
      return allCategory;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return [];
    }
  }

  public async findCategoryById(CategoryId: number): Promise<CategoryModel | null> {
    try {
      const findCategory: CategoryModel | null = await CategoryModel.findByPk(CategoryId);
      return findCategory;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return null;
    }
  }

  public async createCategory(CategoryData: any): Promise<{ message: string }> {
    try {
      console.log(CategoryData);
      await CategoryModel.create({ ...CategoryData });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async updateCategory(CategoryId: number, CategoryData: any): Promise<{ message: string }> {
    try {
      const findCategory: CategoryModel | null = await CategoryModel.findByPk(CategoryId);
      if (!findCategory) {
        return { message: "Category doesn't exist" };
      }
      await CategoryModel.update({ ...CategoryData }, { where: { id: CategoryId } });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async deleteCategory(CategoryId: number): Promise<any> {
    try {
      const findCategory: any = await CategoryModel.findByPk(CategoryId);
      if (!findCategory) {
        return { message: "Category doesn't exist" };
      }
      await CategoryModel.destroy({ where: { id: CategoryId } });

      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }
}

export default CategoryService;
