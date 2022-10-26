import { Router } from 'express';
import TagController from './tag.controller';

class TagRoute {
  public path = '/tag';
  public router = Router();
  public TagController = new TagController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.TagController.getTags);
    this.router.get(`${this.path}/:id(\\d+)`, this.TagController.getTagById);
    this.router.post(`${this.path}`, this.TagController.createTag);
    this.router.put(`${this.path}/:id(\\d+)`, this.TagController.updateTag);
    this.router.delete(`${this.path}/:id(\\d+)`, this.TagController.deleteTag);
  }
}

export default TagRoute;
