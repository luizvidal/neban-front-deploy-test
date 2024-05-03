import { Injectable } from '@angular/core';
import { CrudService } from '@common/services/crud.service';
import { NebanBankAccountInterface } from '@core/interfaces/neban-bank-account';

@Injectable({
  providedIn: 'root',
})
export class NebanBankAccountService extends CrudService<NebanBankAccountInterface> {
  constructor() {
    super('wallet-bank-accounts');
  }
}
