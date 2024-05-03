import { Injectable } from '@angular/core';
import { CrudService } from '@common/services/crud.service';
import { TransactionInterface } from '@core/interfaces/transaction.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends CrudService<TransactionInterface> {
  constructor() {
    super('transaction');
  }
}
