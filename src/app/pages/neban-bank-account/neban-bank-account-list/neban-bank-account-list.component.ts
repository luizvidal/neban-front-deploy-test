import { Component, ViewChild, inject, signal } from '@angular/core';
import { TableListComponent } from '@common/components/table-list/table-list.component';
import { RequestParamsInterface } from '@common/interfaces/request.interface';
import { TableColumnsInterface } from '@common/interfaces/table-columns.interface';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { NebanBankAccountInterface } from '@core/interfaces/neban-bank-account';
import { NebanBankAccountService } from '@core/services/neban-bank-account.service';
import { TranslateModule } from '@ngx-translate/core';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-neban-bank-account-list',
  standalone: true,
  imports: [ConfirmDialogComponent, TableListComponent, TranslateModule],
  template: `
    <app-table-list
      [title]="'COMMON.NEBAN_ACCOUNTS' | translate"
      dataKey="id"
      stateStorage="local"
      stateKey="neban-bank-accounts-list-table"
      [emptyRecordsMessage]="'NEBAN_BANK_ACCOUNT.LIST.EMPTY' | translate"
      [value]="nebanBankAccounts()"
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
      (onDelete)="deleteNebanBankAccount($event)"
    />
    <app-confirm-dialog />
  `,
})
export default class NebanBankAccountListComponent extends TableListComponent<NebanBankAccountInterface> {
  service = inject(NebanBankAccountService);
  nebanBankAccounts = signal<NebanBankAccountInterface[]>([]);

  columns: TableColumnsInterface[] = [];

  @ViewChild(ConfirmDialogComponent)
  confirmDialog!: ConfirmDialogComponent;

  override ngOnInitExtends(): void {
    this.loadTranslation('COMMON').subscribe(() => {
      this.columns = this.getColumns();
    });
  }

  deleteNebanBankAccount({ id, accountNumber }: NebanBankAccountInterface) {
    this.confirmDialog.header = this.translateService.instant(
      'NEBAN_BANK_ACCOUNT.LIST.DELETE_ACCOUNT',
      {
        value: accountNumber,
      }
    );
    this.confirmDialog.acceptCb = () => {
      this.loading.set(true);
      this.service.delete(id).subscribe(() => {
        this.nebanBankAccounts.set([
          ...this.nebanBankAccounts().filter((c) => c.id != id),
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
        this.nebanBankAccounts.set(res.content);
        this.totalRecords.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.nebanBankAccounts.set([]);
        this.totalRecords.set(0);
        this.loading.set(false);
      },
    });
  }

  getColumns() {
    return [
      {
        field: 'customerName',
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
        field: 'customerCountry',
        label: this.translateService.instant('COMMON.COUNTRY'),
      },
    ];
  }
}
