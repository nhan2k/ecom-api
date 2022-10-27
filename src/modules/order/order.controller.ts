import { Request, Response } from 'express';
import OrderService from './order.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import { TOrder } from './order.interface';

class OrderController {
  private logFile = __filename;
  public OrderService = new OrderService();

  public getOrders = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllOrdersData: TOrder[] = await this.OrderService.findAllOrders();

      return new HttpResponse(HttpStatus.Created, findAllOrdersData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getOrderById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const OrderId = Number(req.params.id);
      const findOneOrderData: TOrder | null = await this.OrderService.findOrderById(OrderId);

      return new HttpResponse(HttpStatus.Created, findOneOrderData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createOrder = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const OrderData: any = req.body;
      const createOrderData: { message: string } = await this.OrderService.createOrder(OrderData);

      return new HttpResponse(HttpStatus.Created, createOrderData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateOrder = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const OrderId = Number(req.params.id);
      const OrderData: any = req.body;
      const updateOrderData: any = await this.OrderService.updateOrder(OrderId, OrderData);

      return new HttpResponse(HttpStatus.Created, updateOrderData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteOrder = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const OrderId = Number(req.params.id);
      const deleteOrderData: any = await this.OrderService.deleteOrder(OrderId);

      return new HttpResponse(HttpStatus.Created, deleteOrderData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default OrderController;
