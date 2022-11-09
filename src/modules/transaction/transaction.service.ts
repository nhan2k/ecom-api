import TransactionModel from './transaction.model';
import { logger } from '@utils/logger';

class TransactionService {
  public logFile = __filename;

  public async findAllTransactions(): Promise<TransactionModel[] | { message: string }> {
    try {
      const allTransaction = await TransactionModel.findAll();
      return allTransaction;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async findTransactionById(TransactionId: number): Promise<TransactionModel | null | { message: string }> {
    try {
      const findTransaction = await TransactionModel.findByPk(TransactionId);
      if (!findTransaction) {
        return { message: "Cart Item doesn't exist" };
      }
      return findTransaction;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async createTransaction(TransactionData: any): Promise<TransactionModel | { message: string }> {
    try {
      const res = await TransactionModel.create({ ...TransactionData });
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async updateTransaction(TransactionId: number, TransactionData: any): Promise<TransactionModel | null | { message: string }> {
    try {
      const findTransaction: TransactionModel | null = await TransactionModel.findByPk(TransactionId);
      if (!findTransaction) {
        return { message: "Transaction doesn't exist" };
      }
      await TransactionModel.update({ ...TransactionData }, { where: { id: TransactionId } });
      const res = TransactionModel.findByPk(TransactionId);
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async deleteTransaction(TransactionId: number): Promise<{ id: number } | { message: string }> {
    try {
      const findTransaction: any = await TransactionModel.findByPk(TransactionId);
      if (!findTransaction) {
        return { message: "Transaction doesn't exist" };
      }
      await TransactionModel.destroy({ where: { id: TransactionId } });

      return { id: TransactionId };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default TransactionService;
