import TagModel from './tag.model';
import { logger } from '@utils/logger';

class TagService {
  public logFile = __filename;

  public async findAllTags(): Promise<TagModel[]> {
    try {
      const allTag: TagModel[] = await TagModel.findAll();
      return allTag;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return [];
    }
  }

  public async findTagById(TagId: number): Promise<TagModel | null> {
    try {
      const findTag: TagModel | null = await TagModel.findByPk(TagId);
      return findTag;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return null;
    }
  }

  public async createTag(TagData: any): Promise<{ message: string }> {
    try {
      console.log(TagData);
      await TagModel.create({ ...TagData });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async updateTag(TagId: number, TagData: any): Promise<{ message: string }> {
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
