import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { TableListComponent } from '@common/components/table-list/table-list.component';
import { DropdownDataInterface } from '@common/interfaces/dropdown-data.interface';
import { RequestParamsInterface } from '@common/interfaces/request.interface';
import { TableColumnsInterface } from '@common/interfaces/table-columns.interface';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { DestinationInterface } from '@core/interfaces/destination.interface';
import { CategoryService } from '@core/services/category.service';
import { DestinationService } from '@core/services/destination.service';
import { NebanBankAccountService } from '@core/services/neban-bank-account.service';
import { TranslateModule } from '@ngx-translate/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-destination-list',
  standalone: true,
  imports: [ConfirmDialogComponent, TableListComponent, TranslateModule],
  template: `
    <app-table-list
      [title]="'COMMON.DESTINATIONS' | translate"
      dataKey="id"
      stateStorage="local"
      stateKey="neban-destinations-list-table"
      [emptyRecordsMessage]="'DESTINATION.LIST.EMPTY' | translate"
      [value]="destinations()"
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
      (onDelete)="deleteDestination($event)"
    />
    <app-confirm-dialog />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DestinationListComponent extends TableListComponent<DestinationInterface> {
  service = inject(DestinationService);
  categoryService = inject(CategoryService);
  NebanBankAccountService = inject(NebanBankAccountService);
  destinations = signal<DestinationInterface[]>([]);
  walletBankAccounts = signal<DropdownDataInterface[]>([]);
  columns: TableColumnsInterface[] = [];

  @ViewChild(ConfirmDialogComponent)
  confirmDialog!: ConfirmDialogComponent;

  override ngOnInitExtends(): void {
    this.loadTranslation('COMMON').subscribe(() => {
      this.columns = this.getColumns();
    });
    this.loadFilterData();
  }

  deleteDestination({ id }: DestinationInterface) {
    this.confirmDialog.header = this.translateService.instant(
      'DESTINATION.LIST.DELTE'
    );
    this.confirmDialog.acceptCb = () => {
      this.loading.set(true);
      this.service.delete(id).subscribe(() => {
        this.destinations.set([
          ...this.destinations().filter((d) => d.id != id),
        ]);
        this.totalRecords.update((totalRecords) => --totalRecords);
        this.loading.set(false);
      });
    };

    this.confirmDialog.showDialog();
  }

  handleLazyLoad(event: TableLazyLoadEvent) {
    const matchMode = 'equals';
    const eventDto: any = {
      ...event,
    };

    if (
      eventDto?.filters?.category &&
      eventDto?.filters?.category[0]?.matchMode
    ) {
      eventDto.filters.category[0].matchMode = matchMode;
    }

    if (
      eventDto?.filters?.walletBankAccount &&
      eventDto?.filters?.walletBankAccount[0]?.matchMode
    ) {
      eventDto.filters.walletBankAccount[0].matchMode = matchMode;
    }

    this.loadData(this.getRequestParams(eventDto));
  }

  loadData(params: RequestParamsInterface) {
    this.loading.set(true);
    this.service.getAll(params).subscribe({
      next: (res) => {
        this.destinations.set(res.content);
        this.totalRecords.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.destinations.set([]);
        this.totalRecords.set(0);
        this.loading.set(false);
      },
    });
  }

  loadFilterData() {
    const params = {
      page: 0,
      size: 1000,
    };

    forkJoin([
      this.categoryService.getDropdownData(),
      this.NebanBankAccountService.getAll(params).pipe(
        map((response) =>
          response.content.map((account) => ({
            label: account.accountNumber,
            value: account.id,
          }))
        )
      ),
    ]).subscribe(([categories, walletBankAccounts]) => {
      this.columns[0].customFilterDropdownOptions = categories;
      this.columns[1].customFilterDropdownOptions = walletBankAccounts;
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
        field: 'walletBankAccount',
        label: this.translateService.instant('COMMON.NEBAN_ACCOUNT'),
        customTemplate: true,
        customFilterDropdownOptions: [],
        showAddButton: false,
        showMatchModes: false,
        showOperator: false,
      },
      {
        field: 'initialAmount',
        label: this.translateService.instant('COMMON.INITIAL_VALUE'),
        currencyPipe: true,
        type: 'numeric',
      },
      {
        field: 'finalAmount',
        label: this.translateService.instant('COMMON.FINAL_VALUE'),
        currencyPipe: true,
        type: 'numeric',
      },
    ];
  }
}
