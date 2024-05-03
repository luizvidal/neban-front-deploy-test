import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { TableListComponent } from '@common/components/table-list/table-list.component';
import { RequestParamsInterface } from '@common/interfaces/request.interface';
import { TableColumnsInterface } from '@common/interfaces/table-columns.interface';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { CustomerBankAccountInterface } from '@core/interfaces/customer-bank-account';
import { CustomerBankAccountService } from '@core/services/customer-bank-account.service';
import { TranslateModule } from '@ngx-translate/core';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-customer-bank-account-list',
  standalone: true,
  imports: [ConfirmDialogComponent, TableListComponent, TranslateModule],
  template: `
    <app-table-list
      [title]="'COMMON.BANK_ACCOUNTS' | translate"
      dataKey="id"
      stateStorage="local"
      stateKey="neban-customer-bank-accounts-list-table"
      [emptyRecordsMessage]="'CUSTOMER_BANK_ACCOUNT.LIST.EMPTY' | translate"
      [value]="walletBankAccounts()"
      [tableColumns]="columns"
      [loading]="loading()"
      [globalFilterFields]="[
        'customerName',
        'accountNumber',
        'agencyNumber',
        'customerCountry'
      ]"
      [totalRecords]="totalRecords()"
      (onLazyLoad)="handleLazyLoad($event)"
      (onDelete)="deleteWalletBankAccount($event)"
    />
    <app-confirm-dialog />
  `,
})
export default class CustomerBankAccountListComponent
  extends TableListComponent<CustomerBankAccountInterface>
  implements OnInit
{
  service = inject(CustomerBankAccountService);
  walletBankAccounts = signal<CustomerBankAccountInterface[]>([]);
  columns: TableColumnsInterface[] = [];

  @ViewChild(ConfirmDialogComponent)
  confirmDialog!: ConfirmDialogComponent;

  override ngOnInitExtends(): void {
    this.loadTranslation('COMMON').subscribe(() => {
      this.columns = this.getColumns();
    });
  }

  deleteWalletBankAccount({ id, accountNumber }: CustomerBankAccountInterface) {
    this.confirmDialog.header = this.translateService.instant(
      'CUSTOMER_BANK_ACCOUNT.LIST.DELETE_ACCOUNT',
      { value: accountNumber }
    );
    this.confirmDialog.acceptCb = () => {
      this.loading.set(true);
      this.service.delete(id).subscribe(() => {
        this.walletBankAccounts.set([
          ...this.walletBankAccounts().filter((c) => c.id != id),
        ]);
        this.totalRecords.update((totalRecords) => --totalRecords);
        this.loading.set(false);
      });
    };

    this.confirmDialog.showDialog();
  }

  handleLazyLoad(event: TableLazyLoadEvent) {
    this.loadData(this.getRequestParams(event));
  }

  loadData(params: RequestParamsInterface) {
    this.loading.set(true);
    this.service.getAll(params).subscribe({
      next: (res) => {
        this.walletBankAccounts.set(res.content);
        this.totalRecords.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.walletBankAccounts.set([]);
        this.totalRecords.set(0);
        this.loading.set(false);
      },
    });
  }

  getColumns() {
    return [
      {
        field: 'ownerName',
        label: this.translateService.instant('COMMON.NAME'),
      },
      {
        field: 'accountNumber',
        label: this.translateService.instant('COMMON.ACCOUNT'),
      },
      {
        field: 'agencyNumber',
        label: this.translateService.instant('COMMON.AGENCY'),
      },
      {
        field: 'country',
        label: this.translateService.instant('COMMON.COUNTRY'),
      },
    ];
  }
}
