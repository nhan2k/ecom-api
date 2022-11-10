import { Request, Response } from 'express';
import TransactionService from './transaction.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import _ from 'lodash';

class TransactionController {
  private logFile = __filename;
  public TransactionService = new TransactionService();

  public getTransactions = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllTransactionsData = await this.TransactionService.findAllTransactions();
      if (!Array.isArray(findAllTransactionsData)) {
        return new HttpResponse(HttpStatus.BadRequest, findAllTransactionsData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, findAllTransactionsData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getTransactionById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const TransactionId = Number(req.params.id);
      const findOneTransactionData = await this.TransactionService.findTransactionById(TransactionId);
      if (_.get(findOneTransactionData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, findOneTransactionData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, findOneTransactionData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createTransaction = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      let id = req.user ? req.user['id'] : null;
      if (!id) {
        return new HttpResponse(HttpStatus.BadRequest, { message: 'Not Found User' }).sendResponse(res);
      }
      const TransactionData: any = req.body;
      const createTransactionData = await this.TransactionService.createTransaction(TransactionData, id);
      if (_.get(createTransactionData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, createTransactionData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, createTransactionData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateTransaction = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const TransactionId = Number(req.params.id);
      const TransactionData = req.body;
      const updateTransactionData = await this.TransactionService.updateTransaction(TransactionId, TransactionData);
      if (_.get(updateTransactionData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, updateTransactionData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, updateTransactionData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteTransaction = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const TransactionId = Number(req.params.id);
      const deleteTransactionData = await this.TransactionService.deleteTransaction(TransactionId);
      if (_.get(deleteTransactionData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, deleteTransactionData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, deleteTransactionData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default TransactionController;
