import { TitleCasePipe } from '@angular/common';
import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { TableListComponent } from '@common/components/table-list/table-list.component';
import { RequestParamsInterface } from '@common/interfaces/request.interface';
import { TableColumnsInterface } from '@common/interfaces/table-columns.interface';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { CustomerInterface } from '@core/interfaces/customer.interface';
import { CustomerService } from '@core/services/customer.service';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [ConfirmDialogComponent, TableListComponent, TranslateModule],
  providers: [ConfirmationService, TitleCasePipe],
  template: `
    <app-table-list
      [title]="'COMMON.CUSTOMERS' | translate"
      dataKey="id"
      stateStorage="local"
      stateKey="neban-customers-list-table"
      [emptyRecordsMessage]="'CUSTOMER.LIST.EMPTY' | translate"
      [value]="customers()"
      [tableColumns]="columns"
      [loading]="loading()"
      [globalFilterFields]="['fullName', 'cpf', 'rg', 'status']"
      [totalRecords]="totalRecords()"
      [showSwitch]="true"
      [showEditButton]="false"
      [showAddButton]="false"
      [showDeleteButton]="false"
      (onLazyLoad)="handleLazyLoad($event)"
      switchFieldModel="active"
      (onInputSwitchChange)="
        toggleCustomerActivation($event.checked, $event.data)
      "
    />
    <app-confirm-dialog />
  `,
})
export default class CustomerListComponent
  extends TableListComponent<CustomerInterface>
  implements OnInit
{
  service = inject(CustomerService);
  customers = signal<CustomerInterface[]>([]);
  columns: TableColumnsInterface[] = [];

  @ViewChild(ConfirmDialogComponent)
  confirmDialog!: ConfirmDialogComponent;
  titleCasePipe = inject(TitleCasePipe);

  override ngOnInitExtends(): void {
    this.loadTranslation('COMMON').subscribe(() => {
      this.columns = this.getColumns();
    });
  }

  handleLazyLoad(event: TableLazyLoadEvent) {
    this.loadData(this.getRequestParams(event));
  }

  loadData(params: RequestParamsInterface) {
    this.loading.set(true);
    this.service.getAll(params).subscribe({
      next: (res) => {
        const loggedUserPermission = this.service.customerPermission();

        res.content.forEach((customer) => {
          if (
            customer.permission === 'SUPER' ||
            loggedUserPermission === customer.permission
          )
            customer['disableSwitch'] = true;
        });

        this.customers.set(res.content);
        this.totalRecords.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.customers.set([]);
        this.totalRecords.set(0);
        this.loading.set(false);
      },
    });
  }

  toggleCustomerActivation(active: boolean, customer: CustomerInterface) {
    if (active) {
      this.confirmDialog.header = this.translateService.instant(
        'CUSTOMER.LIST.ENABLE_CUSTOMER'
      );
      this.confirmDialog.message = this.translateService.instant(
        'CUSTOMER.LIST.ENABLE_QUESTION',
        { value: customer.fullName }
      );
      this.confirmDialog.acceptCb = () => {
        this.service.unblock(customer.id).subscribe({
          error: () => (customer.active = !active),
        });
      };

      this.confirmDialog.acceptButtonStyleClass = `p-button-success p-button-text`;
    } else {
      this.confirmDialog.header = this.translateService.instant(
        'CUSTOMER.LIST.DISABLE_CUSTOMER'
      );
      this.confirmDialog.message = this.translateService.instant(
        'CUSTOMER.LIST.DISABLE_QUESTION',
        { value: customer.fullName }
      );
      this.confirmDialog.acceptButtonStyleClass = `p-button-danger p-button-text`;
      this.confirmDialog.acceptCb = () => {
        this.service.block(customer.id).subscribe({
          error: () => (customer.active = !active),
        });
      };
    }

    this.confirmDialog.rejectCb = () => {
      customer.active = !active;
    };
    this.confirmDialog.showDialog();
  }

  getColumns() {
    return [
      {
        field: 'fullName',
        label: this.translateService.instant('COMMON.NAME'),
      },
      {
        field: 'cpf',
        label: 'CPF',
      },
      {
        field: 'rg',
        label: 'RG',
      },
      {
        field: 'permission',
        label: this.translateService.instant('COMMON.TYPE'),
        titleCasePipe: true,
      },
      {
        field: 'active',
        label: this.translateService.instant('COMMON.STATUS'),
        customTemplate: true,
        customFilterDropdownOptions: [
          {
            label: this.translateService.instant('COMMON.ACTIVE'),
            value: 'true',
          },
          {
            label: this.translateService.instant('COMMON.BLOCKED'),
            value: 'false',
          },
        ],
        showAddButton: false,
        showMatchModes: false,
        showOperator: false,
        booleanColumnField: true,
        trueMessage: this.translateService.instant('COMMON.ACTIVE'),
        falseMessage: this.translateService.instant('COMMON.BLOCKED'),
      },
    ];
  }
}
