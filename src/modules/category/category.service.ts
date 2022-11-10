import CategoryModel from './category.model';
import { logger } from '@utils/logger';
import { ICategoryData } from './type';
import slugify from 'slugify';
class CategoryService {
  public logFile = __filename;

  public async findAllCategories(): Promise<CategoryModel[] | { message: string }> {
    try {
      const allCategory: CategoryModel[] = await CategoryModel.findAll();
      return allCategory;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async findCategoryById(CategoryId: number): Promise<CategoryModel | null | { message: string }> {
    try {
      const findCategory = await CategoryModel.findByPk(CategoryId);
      if (!findCategory) {
        return { message: "Cart doesn't exist" };
      }
      return findCategory;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async createCategory(categoryData: ICategoryData): Promise<CategoryModel | { message: string }> {
    try {
      const { title, slug, ...rest } = categoryData;
      const record = await CategoryModel.findOne({ where: { title: title } });
      if (record) {
        return { message: 'Record already exists' };
      }
      let newSlug = '';
      if (title) {
        newSlug = slugify(title);
      }
      const res = await CategoryModel.create({ title, slug: newSlug, ...rest });
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async updateCategory(CategoryId: number, CategoryData: ICategoryData): Promise<CategoryModel | null | { message: string }> {
    try {
      const findCategory: CategoryModel | null = await CategoryModel.findByPk(CategoryId);
      if (!findCategory) {
        return { message: "Category doesn't exist" };
      }
      await CategoryModel.update({ ...CategoryData }, { where: { id: CategoryId } });
      const res = CategoryModel.findByPk(CategoryId);
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async deleteCategory(CategoryId: number): Promise<{ id: number } | { message: string }> {
    try {
      const findCategory: any = await CategoryModel.findByPk(CategoryId);
      if (!findCategory) {
        return { message: "Category doesn't exist" };
      }
      await CategoryModel.destroy({ where: { id: CategoryId } });

      return { id: CategoryId };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default CategoryService;
