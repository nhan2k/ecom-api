import { Router } from 'express';
import TransactionController from './transaction.controller';

class TransactionRoute {
  public path = '/transaction';
  public router = Router();
  public TransactionController = new TransactionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.TransactionController.getTransactions);
    this.router.get(`${this.path}/:id(\\d+)`, this.TransactionController.getTransactionById);
    this.router.post(`${this.path}`, this.TransactionController.createTransaction);
    this.router.put(`${this.path}/:id(\\d+)`, this.TransactionController.updateTransaction);
    this.router.delete(`${this.path}/:id(\\d+)`, this.TransactionController.deleteTransaction);
    this.router.get(`${this.path}/count`, this.TransactionController.countTransaction);
  }
}

export default TransactionRoute;
