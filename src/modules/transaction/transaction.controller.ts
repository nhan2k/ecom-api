import { Request, Response } from 'express';
import TransactionService from './transaction.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import { TTransaction } from './transaction.interface';

class TransactionController {
  private logFile = __filename;
  public TransactionService = new TransactionService();

  public getTransactions = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllTransactionsData: TTransaction[] = await this.TransactionService.findAllTransactions();

      return new HttpResponse(HttpStatus.Created, findAllTransactionsData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getTransactionById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const TransactionId = Number(req.params.id);
      const findOneTransactionData: TTransaction | null = await this.TransactionService.findTransactionById(TransactionId);

      return new HttpResponse(HttpStatus.Created, findOneTransactionData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createTransaction = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const TransactionData: any = req.body;
      const createTransactionData: { message: string } = await this.TransactionService.createTransaction(TransactionData);

      return new HttpResponse(HttpStatus.Created, createTransactionData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateTransaction = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const TransactionId = Number(req.params.id);
      const TransactionData: any = req.body;
      const updateTransactionData: any = await this.TransactionService.updateTransaction(TransactionId, TransactionData);

      return new HttpResponse(HttpStatus.Created, updateTransactionData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteTransaction = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const TransactionId = Number(req.params.id);
      const deleteTransactionData: any = await this.TransactionService.deleteTransaction(TransactionId);

      return new HttpResponse(HttpStatus.Created, deleteTransactionData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default TransactionController;
