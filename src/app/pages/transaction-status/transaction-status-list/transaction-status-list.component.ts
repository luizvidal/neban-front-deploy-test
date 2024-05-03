import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { TableListComponent } from '@common/components/table-list/table-list.component';
import { RequestParamsInterface } from '@common/interfaces/request.interface';
import { TableColumnsInterface } from '@common/interfaces/table-columns.interface';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { TransactionInterface } from '@core/interfaces/transaction.interface';
import { CategoryService } from '@core/services/category.service';
import { TransactionService } from '@core/services/transaction.service';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-transaction-status-list',
  standalone: true,
  imports: [TableListComponent, ConfirmDialogComponent, TranslateModule],
  template: `
    <app-table-list
      [title]="'COMMON.TRANSACTIONS' | translate"
      dataKey="id"
      stateStorage="local"
      stateKey="neban-transactions-list-table"
      [emptyRecordsMessage]="'TRANSACTION.LIST.EMPTY' | translate"
      currency="BRL"
      [value]="transactions()"
      [tableColumns]="columns"
      [loading]="loading()"
      [globalFilterFields]="['name', 'description']"
      [totalRecords]="totalRecords()"
      (onLazyLoad)="handleLazyLoad($event)"
      (onDelete)="deleteTransaction($event)"
    />
    <app-confirm-dialog />
  `,
  providers: [ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TransactionStatusListComponent extends TableListComponent<TransactionInterface> {
  transactions = signal<TransactionInterface[]>([]);
  service = inject(TransactionService);
  categoryService = inject(CategoryService);
  columns: TableColumnsInterface[] = [];

  @ViewChild(ConfirmDialogComponent)
  confirmDialog!: ConfirmDialogComponent;

  override ngOnInitExtends(): void {
    this.loadTranslation('COMMON').subscribe(() => {
      this.columns = this.getColumns();
    });
    this.loadFilterData();
  }

  handleLazyLoad(event: TableLazyLoadEvent) {
    this.loadData(this.getRequestParams(event));
  }

  deleteTransaction({ amount, id }: TransactionInterface) {
    //TODO: Add way to identify which transaction is being deleted
    this.confirmDialog.header = this.translateService.instant(
      'TRANSACTION.LIST.DELETE_TRANSACTION'
    );
    this.confirmDialog.acceptCb = () => {
      this.loading.set(true);
      this.service.delete(id).subscribe(() => {
        this.transactions.set([
          ...this.transactions().filter((c) => c.id != id),
        ]);
        this.totalRecords.update((totalRecords) => --totalRecords);
        this.loading.set(false);
      });
    };

    this.confirmDialog.showDialog();
  }

  loadData(params: RequestParamsInterface) {
    this.loading.set(true);
    this.service.getAll(params).subscribe({
      next: (res) => {
        this.transactions.set(res.content);
        this.totalRecords.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.transactions.set([]);
        this.totalRecords.set(0);
        this.loading.set(false);
      },
    });
  }

  loadFilterData() {
    this.categoryService.getDropdownData().subscribe((categories) => {
      this.columns[0].customFilterDropdownOptions = categories;
    });
  }

  getColumns() {
    return [
      {
        field: 'category',
        label: this.translateService.instant('COMMON.CATEGORY'),
        customTemplate: true,
        customFilterDropdownOptions: [],
        showAddButton: false,
        showMatchModes: false,
        showOperator: false,
      },
      {
        field: 'originCurrency',
        label: this.translateService.instant('COMMON.ORIGIN_CURRENCY'),
        customTemplate: true,
        customFilterDropdownOptions: [
          { value: 'BRL', label: 'BRL' },
          { value: 'ARS', label: 'ARS' },
        ],
        showAddButton: false,
        showMatchModes: false,
        showOperator: false,
      },
      {
        field: 'destinationCurrency',
        label: this.translateService.instant('COMMON.DESTINY_CURRENCY'),
        customTemplate: true,
        customFilterDropdownOptions: [
          { value: 'BRL', label: 'BRL' },
          { value: 'ARS', label: 'ARS' },
        ],
        showAddButton: false,
        showMatchModes: false,
        showOperator: false,
      },

      {
        field: 'amount',
        label: this.translateService.instant('COMMON.AMOUNT'),
        type: 'numeric',
        currencyPipe: true,
      },

      {
        field: 'status',
        label: this.translateService.instant('COMMON.STATUS'),
        customTemplate: true,
        enumColumnField: true,
        enumData: {
          PENDING: this.translateService.instant('COMMON.PENDING'),
          APPROVED: this.translateService.instant('COMMON.APPROVED'),
        },
        customFilterDropdownOptions: [
          {
            label: this.translateService.instant('COMMON.PENDING'),
            value: 'PENDING',
          },
          {
            label: this.translateService.instant('COMMON.APPROVED'),
            value: 'APPROVED',
          },
        ],
        showAddButton: false,
        showMatchModes: false,
        showOperator: false,
      },
    ];
  }
}
