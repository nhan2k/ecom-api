import TagModel from './tag.model';
import { logger } from '@utils/logger';
import { ITagData } from './type';
import slugify from 'slugify';

class TagService {
  public logFile = __filename;
  public attributes = ['id', 'title', 'metaTitle', 'slug', 'content', 'createdAt'];

  public async findAllTags(): Promise<TagModel[] | { message: string }> {
    try {
      const allTag = await TagModel.findAll({ attributes: this.attributes });
      return allTag;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async findTagById(TagId: number): Promise<TagModel | null | { message: string }> {
    try {
      const findTag = await TagModel.findByPk(TagId, { attributes: this.attributes });
      if (!findTag) {
        return { message: "Cart Item doesn't exist" };
      }
      return findTag;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async createTag(TagData: ITagData): Promise<TagModel | { message: string }> {
    try {
      const { title, slug, ...rest } = TagData;
      let newSlug = '';
      if (title) {
        newSlug = slugify(title);
      }
      const res = await TagModel.create({ title, slug: newSlug, ...rest });
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async updateTag(TagId: number, TagData: ITagData): Promise<TagModel | null | { message: string }> {
    try {
      const findTag: TagModel | null = await TagModel.findByPk(TagId);
      if (!findTag) {
        return { message: "Tag doesn't exist" };
      }
      const { title, slug, ...rest } = TagData;
      let newSlug = '';
      if (title) {
        newSlug = slugify(title);
      }
      await TagModel.update({ title, slug: newSlug, ...rest }, { where: { id: TagId } });
      const res = TagModel.findByPk(TagId);
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async deleteTag(TagId: number): Promise<{ id: number } | { message: string }> {
    try {
      const findTag: any = await TagModel.findByPk(TagId);
      if (!findTag) {
        return { message: "Tag doesn't exist" };
      }
      await TagModel.destroy({ where: { id: TagId } });
      return { id: TagId };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default TagService;
