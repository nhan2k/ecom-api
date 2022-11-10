import { Request, Response } from 'express';
import TagService from './tag.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import _ from 'lodash';

class TagController {
  private logFile = __filename;
  public TagService = new TagService();

  public getTags = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllTagsData = await this.TagService.findAllTags();
      if (!Array.isArray(findAllTagsData)) {
        return new HttpResponse(HttpStatus.BadRequest, findAllTagsData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, findAllTagsData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getTagById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const TagId = Number(req.params.id);
      const findOneTagData = await this.TagService.findTagById(TagId);
      if (_.get(findOneTagData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, findOneTagData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, findOneTagData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createTag = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const TagData: any = req.body;
      const createTagData = await this.TagService.createTag(TagData);
      if (_.get(createTagData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, createTagData).sendResponse(res);
      }

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
      if (_.get(updateTagData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, updateTagData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, updateTagData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteTag = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const TagId = Number(req.params.id);
      const deleteTagData = await this.TagService.deleteTag(TagId);
      if (_.get(deleteTagData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, deleteTagData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, deleteTagData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default TagController;
