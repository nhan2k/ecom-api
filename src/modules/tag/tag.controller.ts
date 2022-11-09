import { Request, Response } from 'express';
import TagService from './tag.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import { TTag } from './tag.interface';

class TagController {
  private logFile = __filename;
  public TagService = new TagService();

  public getTags = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllTagsData: TTag[] = await this.TagService.findAllTags();

      return new HttpResponse(HttpStatus.OK, findAllTagsData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getTagById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const TagId = Number(req.params.id);
      const findOneTagData: TTag | null = await this.TagService.findTagById(TagId);

      return new HttpResponse(HttpStatus.OK, findOneTagData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createTag = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const TagData: any = req.body;
      const createTagData: { message: string } = await this.TagService.createTag(TagData);

      return new HttpResponse(HttpStatus.Created, createTagData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateTag = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const TagId = Number(req.params.id);
      const TagData: any = req.body;
      const updateTagData: any = await this.TagService.updateTag(TagId, TagData);

      return new HttpResponse(HttpStatus.Created, updateTagData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteTag = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const TagId = Number(req.params.id);
      const deleteTagData: any = await this.TagService.deleteTag(TagId);

      return new HttpResponse(HttpStatus.OK, deleteTagData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default TagController;
