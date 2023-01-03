import { Request, Response } from 'express';
import OrderService from './order.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import _ from 'lodash';

class OrderController {
  private logFile = __filename;
  public OrderService = new OrderService();

  public getOrders = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllOrdersData = await this.OrderService.findAllOrders();
      if (!Array.isArray(findAllOrdersData)) {
        return new HttpResponse(HttpStatus.BadRequest, findAllOrdersData).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.OK, findAllOrdersData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getOrderById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const OrderId = Number(req.params.id);
      const findOneOrderData = await this.OrderService.findOrderById(OrderId);
      if (_.get(findOneOrderData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, findOneOrderData).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.OK, findOneOrderData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateOrder = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const OrderId = Number(req.params.id);
      const OrderData: any = req.body;
      const updateOrderData = await this.OrderService.updateOrder(OrderId, OrderData);
      if (_.get(updateOrderData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, updateOrderData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, updateOrderData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteOrder = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const OrderId = Number(req.params.id);
      const deleteOrderData = await this.OrderService.deleteOrder(OrderId);
      if (_.get(deleteOrderData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, deleteOrderData).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.OK, deleteOrderData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public countOrder = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      let id = req.user ? req.user['id'] : null;
      if (!id) {
        return new HttpResponse(HttpStatus.BadRequest, { message: 'Not Found User' }).sendResponse(res);
      }
      const countOrderData = await this.OrderService.countOrder(id);
      if (_.get(countOrderData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, countOrderData).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.OK, countOrderData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default OrderController;
