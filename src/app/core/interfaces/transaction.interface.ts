import { CategoryInterface } from './category.interface';
import { CustomerBankAccountInterface } from './customer-bank-account';

export interface TransactionInterface {
  id: string;
  amount: number;
  transactionType: 'BANK' | 'BILLET' | 'OTHER';
  transactionDate?: string;
  originCurrency: string;
  destinationCurrency: string;
  description?: string;
  billet?: string;
  status: string;
  category: CategoryInterface;
  customerBankAccount: CustomerBankAccountInterface;
}
