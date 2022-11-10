import { Request, Response } from 'express';
import OrderItemService from './order.item.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import { TOrderItem } from './order.item.interface';
import _ from 'lodash';

class OrderItemController {
  private logFile = __filename;
  public OrderItemService = new OrderItemService();

  public getOrderItems = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllOrderItemsData = await this.OrderItemService.findAllOrderItems();
      if (!Array.isArray(findAllOrderItemsData)) {
        return new HttpResponse(HttpStatus.BadRequest, findAllOrderItemsData).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.OK, findAllOrderItemsData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getOrderItemById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const OrderItemId = Number(req.params.id);
      const findOneOrderItemData = await this.OrderItemService.findOrderItemById(OrderItemId);
      if (_.get(findOneOrderItemData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, findOneOrderItemData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, findOneOrderItemData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createOrderItem = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const OrderItemData: any = req.body;
      const createOrderItemData = await this.OrderItemService.createOrderItem(OrderItemData);
      if (_.get(createOrderItemData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, createOrderItemData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, createOrderItemData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateOrderItem = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const OrderItemId = Number(req.params.id);
      const OrderItemData = req.body;
      const updateOrderItemData = await this.OrderItemService.updateOrderItem(OrderItemId, OrderItemData);
      if (_.get(updateOrderItemData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, updateOrderItemData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, updateOrderItemData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteOrderItem = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const OrderItemId = Number(req.params.id);
      const deleteOrderItemData: any = await this.OrderItemService.deleteOrderItem(OrderItemId);
      if (_.get(deleteOrderItemData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, deleteOrderItemData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, deleteOrderItemData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default OrderItemController;
