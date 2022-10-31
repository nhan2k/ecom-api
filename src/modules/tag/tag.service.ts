import TagModel from './tag.model';
import { logger } from '@utils/logger';
import { ITagData } from './type';
import slugify from 'slugify';
import ProductTagModel from '@modules/product-tag/product.tag.model';

class TagService {
  public logFile = __filename;
  public attributes = ['id', 'title', 'metaTitle', 'slug', 'content', 'createdAt'];

  public async findAllTags(): Promise<TagModel[]> {
    try {
      const allTag: TagModel[] = await TagModel.findAll({ attributes: this.attributes });
      return allTag;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return [];
    }
  }

  public async findTagById(TagId: number): Promise<TagModel | null> {
    try {
      const findTag: TagModel | null = await TagModel.findByPk(TagId, { attributes: this.attributes });
      return findTag;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return null;
    }
  }

  public async createTag(TagData: ITagData): Promise<{ message: string }> {
    try {
      const { title, slug, ...rest } = TagData;
      let newSlug = '';
      if (title) {
        newSlug = slugify(title);
      }
      await TagModel.create({ title, slug: newSlug, ...rest });

      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async updateTag(TagId: number, TagData: ITagData): Promise<{ message: string }> {
    try {
      const findTag: TagModel | null = await TagModel.findByPk(TagId);
      if (!findTag) {
        return { message: "Tag doesn't exist" };
      }
      await TagModel.update({ ...TagData }, { where: { id: TagId } });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async deleteTag(TagId: number): Promise<any> {
    try {
      const findTag: any = await TagModel.findByPk(TagId);
      if (!findTag) {
        return { message: "Tag doesn't exist" };
      }
      await TagModel.destroy({ where: { id: TagId } });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }
}

export default TagService;
