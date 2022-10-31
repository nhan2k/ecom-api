import TransactionModel from './transaction.model';
import { logger } from '@utils/logger';

class TransactionService {
  public logFile = __filename;

  public async findAllTransactions(): Promise<TransactionModel[]> {
    try {
      const allTransaction: TransactionModel[] = await TransactionModel.findAll();
      return allTransaction;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return [];
    }
  }

  public async findTransactionById(TransactionId: number): Promise<TransactionModel | null> {
    try {
      const findTransaction: TransactionModel | null = await TransactionModel.findByPk(TransactionId);
      return findTransaction;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return null;
    }
  }

  public async createTransaction(TransactionData: any): Promise<{ message: string }> {
    try {
      await TransactionModel.create({ ...TransactionData });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async updateTransaction(TransactionId: number, TransactionData: any): Promise<{ message: string }> {
    try {
      const findTransaction: TransactionModel | null = await TransactionModel.findByPk(TransactionId);
      if (!findTransaction) {
        return { message: "Transaction doesn't exist" };
      }
      await TransactionModel.update({ ...TransactionData }, { where: { id: TransactionId } });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async deleteTransaction(TransactionId: number): Promise<any> {
    try {
      const findTransaction: any = await TransactionModel.findByPk(TransactionId);
      if (!findTransaction) {
        return { message: "Transaction doesn't exist" };
      }
      await TransactionModel.destroy({ where: { id: TransactionId } });

      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }
}

export default TransactionService;
