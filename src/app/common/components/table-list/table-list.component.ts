import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RequestParamsInterface } from '@common/interfaces/request.interface';
import { TableColumnsInterface } from '@common/interfaces/table-columns.interface';
import { CommonTools } from '@common/tools/common-tools';
import { ButtonComponent } from '@components/button/button.component';
import { InputComponent } from '@components/input/input.component';
import { TranslateModule } from '@ngx-translate/core';
import { FilterMetadata } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonComponent,
    FormsModule,
    InputTextModule,
    ButtonModule,
    SkeletonModule,
    ReactiveFormsModule,
    SkeletonModule,
    InputGroupModule,
    RouterLink,
    TitleCasePipe,
    InputSwitchModule,
    DropdownModule,
    CurrencyPipe,
    InputComponent,
    TranslateModule,
  ],
  templateUrl: './table-list.component.html',
  styles: `
    :host ::ng-deep {
      .p-highlight p-columnfilter > div > button {
        color: var(--primary);

      }

      @media only screen and (max-width: 576px) {
        .p-paginator-last	 {
          display: none
        }

        .p-paginator-rpp-options	 {
          display: none
        }

        .p-paginator-page-options	 {
          display: none
        }

        .p-paginator  {
          display: flex;
          flex-direction: column
        }

        .p-paginator-first	 {
          display: none
        }

        .p-paginator-pages	 {
          display: flex
        }
      }
    }
   `,
})
export class TableListComponent<T> extends CommonTools implements OnInit {
  constructor() {
    super();
  }

  @Input() value: T[] = [];
  @Input() title = '';
  @Input() emptyRecordsMessage = 'Não há categorias!';
  @Input() scrollHeight = '54vh';
  @Input() responsiveLayout = 'stack';
  @Input() dataKey = 'id';
  @Input() stateStorage: 'session' | 'local' = 'local';
  @Input() stateKey = '';
  @Input() styleClass = 'p-datatable-sm';
  @Input() loadingIcon = 'pi pi-spin pi-spinner text-primary';
  @Input() addButtonRouterLink = ['new'];
  @Input() currency = 'BRL';
  @Input() globalFilterFields = [''];
  @Input('loading') loading_ = false;
  @Input() rowsPerPageOptions = [1, 10, 20, 50, 100];
  @Input() tableColumns: TableColumnsInterface[] = [];
  @Input() showSwitch = false;
  @Input() switchFieldModel = '';
  @Input() showEditButton = true;
  @Input() showAddButton = true;
  @Input() showDeleteButton = true;

  @Output() onDelete = new EventEmitter<T>();
  @Output() onLazyLoad = new EventEmitter<TableLazyLoadEvent>();
  @Output() onInputSwitchChange = new EventEmitter<{
    checked: boolean;
    data: T;
  }>();

  @ViewChild(Table) table!: Table;

  @Input('totalRecords') totalRecords_ = 0;
  searchInput = new FormControl('');
  currentPageReportTemplate = '{currentPage} de {totalPages}';
  emptyMessage = 'Sem resultados';
  emptyFilterMessage = 'Sem resultados';
  ngOnInit(): void {
    this.searchInputChanges();
    this.loadGlobalFilterValue();
    this.ngOnInitExtends();
    this.loadTranslation('PRIMENG').subscribe(
      ({ currentPageReportTemplate, emptyMessage, emptyFilterMessage }) => {
        this.currentPageReportTemplate = currentPageReportTemplate;
        this.emptyMessage = emptyMessage;
        this.emptyFilterMessage = emptyFilterMessage;
      }
    );
  }

  ngOnInitExtends(): void {}

  loadGlobalFilterValue() {
    const item = localStorage.getItem(this.stateKey);
    if (item) {
      this.searchInput.patchValue(JSON.parse(item)?.filters?.global?.value, {
        emitEvent: false,
      });
    }
  }

  searchInputChanges() {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        map((value) => value?.trim()),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {
        this.table.filterGlobal(value, 'contains');
      });
  }

  onClearFilters() {
    this.table.clear();
    localStorage.removeItem(this.stateKey);
    this.searchInput.setValue('', { emitEvent: false });
  }

  getRequestParams(params_?: TableLazyLoadEvent): RequestParamsInterface {
    const params: RequestParamsInterface = {
      page: 0,
      size: 10,
    };

    if (params_?.first != undefined && params_?.rows != undefined) {
      params.page = params_.first / params_.rows;
      params.size = params_.rows;
    }
    if (params_?.sortOrder) {
      params.sort = params_?.sortOrder == 1 ? 'asc' : 'desc';
    }
    if (params_?.sortField) {
      params.sortField = Array.isArray(params_?.sortField)
        ? params_?.sortField[0]
        : params_?.sortField;
    }

    let filters = { ...params_?.filters };
    delete filters['global'];
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filters[key] = (filters[key] as FilterMetadata[]).filter(
          (filter) => filter.value
        );
      }
    });

    params.filterGlobal = params_?.globalFilter
      ? (params_.globalFilter as string)
      : '';

    Object.keys(filters).forEach((key) => {
      if (!(filters[key] as FilterMetadata[]).length) {
        delete filters[key];
      }
    });

    params.filters = JSON.stringify(filters);

    return params;
  }
}
