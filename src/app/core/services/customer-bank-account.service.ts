import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedDataInterface } from '@common/interfaces/paginated-data.interface';
import { CrudService } from '@common/services/crud.service';
import { CustomerBankAccountInterface } from '@core/interfaces/customer-bank-account';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerBankAccountService extends CrudService<CustomerBankAccountInterface> {
  constructor() {
    super('customer-bank-accounts');
  }

  public getDropdownData() {
    const params = new HttpParams({
      fromObject: {
        page: 0,
        size: 1000,
        sort: 'asc',
        sortField: 'ownerName',
      },
    });

    return this.httpClient
      .get<PaginatedDataInterface<CustomerBankAccountInterface>>(
        `${this.apiUrl}/${this.uri}`,
        {
          params,
        }
      )
      .pipe(
        take(1),
        map((response) =>
          response.content.map((account) => ({
            label: `${account.ownerName} - ${account.accountNumber}`,
            value: account.id,
          }))
        )
      );
  }
}
