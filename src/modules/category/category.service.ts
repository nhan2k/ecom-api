import CategoryModel from './category.model';
import { logger } from '@utils/logger';
import { ICategoryData } from './type';
import slugify from 'slugify';
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

  public async createCategory(categoryData: ICategoryData): Promise<{ message: string }> {
    try {
      const { title, slug, ...rest } = categoryData;
      let newSlug = '';
      if (title) {
        newSlug = slugify(title);
      }
      await CategoryModel.create({ title, slug: newSlug, ...rest });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async updateCategory(CategoryId: number, CategoryData: ICategoryData): Promise<{ message: string }> {
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
