import { Component, ViewChild, inject, signal } from '@angular/core';
import { TableListComponent } from '@common/components/table-list/table-list.component';
import { RequestParamsInterface } from '@common/interfaces/request.interface';
import { TableColumnsInterface } from '@common/interfaces/table-columns.interface';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { CategoryInterface } from '@core/interfaces/category.interface';
import { CategoryService } from '@core/services/category.service';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [TableListComponent, ConfirmDialogComponent, TranslateModule],
  providers: [ConfirmationService],
  template: `
    <app-table-list
      [title]="'COMMON.TRANSACTION_CATEGORIES' | translate"
      dataKey="id"
      stateStorage="local"
      stateKey="neban-categories-list-table"
      [emptyRecordsMessage]="'CATEGORY.LIST.EMPTY' | translate"
      [value]="categories()"
      [tableColumns]="columns"
      [loading]="loading()"
      [globalFilterFields]="['name', 'description']"
      [totalRecords]="totalRecords()"
      (onLazyLoad)="handleLazyLoad($event)"
      (onDelete)="deleteCategory($event)"
    />
    <app-confirm-dialog />
  `,
})
export default class CategoryListComponent extends TableListComponent<CategoryInterface> {
  checked = signal(false);
  service = inject(CategoryService);
  categories = signal<CategoryInterface[]>([]);
  columns: TableColumnsInterface[] = [];

  @ViewChild(ConfirmDialogComponent)
  confirmDialog!: ConfirmDialogComponent;

  override ngOnInitExtends(): void {
    this.loadTranslation('COMMON').subscribe(() => {
      this.columns = this.getColumns();
    });
  }

  deleteCategory({ name, id }: CategoryInterface) {
    this.confirmDialog.header = this.translateService.instant(
      'COMMON.CONFIRM_DELETE',
      { value: name }
    );
    this.confirmDialog.acceptCb = () => {
      this.loading.set(true);
      this.service.delete(id).subscribe(() => {
        this.categories.set([...this.categories().filter((c) => c.id != id)]);
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
        this.categories.set(res.content);
        this.totalRecords.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.categories.set([]);
        this.totalRecords.set(0);
        this.loading.set(false);
      },
    });
  }

  getColumns() {
    return [
      {
        field: 'name',
        label: this.translateService.instant('COMMON.NAME'),
      },
      {
        field: 'description',
        label: this.translateService.instant('COMMON.DESCRIPTION'),
      },
    ];
  }
}
