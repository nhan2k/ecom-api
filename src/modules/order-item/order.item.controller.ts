import { Request, Response } from 'express';
import OrderItemService from './order.item.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import { TOrderItem } from './order.item.interface';

class OrderItemController {
  private logFile = __filename;
  public OrderItemService = new OrderItemService();

  public getOrderItems = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllOrderItemsData: TOrderItem[] = await this.OrderItemService.findAllOrderItems();

      return new HttpResponse(HttpStatus.OK, findAllOrderItemsData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getOrderItemById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const OrderItemId = Number(req.params.id);
      const findOneOrderItemData: TOrderItem | null = await this.OrderItemService.findOrderItemById(OrderItemId);

      return new HttpResponse(HttpStatus.OK, findOneOrderItemData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createOrderItem = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const OrderItemData: any = req.body;
      const createOrderItemData: { message: string } = await this.OrderItemService.createOrderItem(OrderItemData);

      return new HttpResponse(HttpStatus.Created, createOrderItemData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateOrderItem = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const OrderItemId = Number(req.params.id);
      const OrderItemData: any = req.body;
      const updateOrderItemData: any = await this.OrderItemService.updateOrderItem(OrderItemId, OrderItemData);

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

      return new HttpResponse(HttpStatus.OK, deleteOrderItemData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default OrderItemController;
