import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { removeEmptyFields } from '@common/functions/functions';
import { DropdownDataInterface } from '@common/interfaces/dropdown-data.interface';
import { CommonTools } from '@common/tools/common-tools';
import { ButtonComponent } from '@components/button/button.component';
import { InputComponent } from '@components/input/input.component';
import { QuotationInterface } from '@core/interfaces/quotation.interface';
import { CategoryService } from '@core/services/category.service';
import { CustomerBankAccountService } from '@core/services/customer-bank-account.service';
import { QuotationService } from '@core/services/quotation.service';
import { TransactionService } from '@core/services/transaction.service';
import { TranslateModule } from '@ngx-translate/core';
import { toggleRequiredValidator } from '@shared/helpers/validators';
import { PanelModule } from 'primeng/panel';
import {
  Observable,
  catchError,
  distinctUntilChanged,
  forkJoin,
  of,
} from 'rxjs';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    PanelModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    RouterLink,
    AsyncPipe,
    TranslateModule,
  ],
  templateUrl: './transaction-form.component.html',
})
export default class TransactionFormComponent extends CommonTools {
  service = inject(TransactionService);
  customerBankAccountService = inject(CustomerBankAccountService);
  categoryService = inject(CategoryService);
  quotationService = inject(QuotationService);
  formGroup = this.getForm();
  quotation?: QuotationInterface;
  categories = signal<DropdownDataInterface[]>([]);
  customerAccounts = signal<DropdownDataInterface[]>([]);
  currencies = signal<DropdownDataInterface[]>([]);
  transactionTypes = signal<DropdownDataInterface[]>([]);
  params = { page: 0, size: 1000 };
  originCurrency = signal('BRL');
  destinationCurrency = signal('ARS');
  hideErrorMessage = signal(true);

  ngOnInit() {
    this.loadData();
    this.validateRequiredFields();
    this.handleConversion();
    this.setTranslation();
  }

  setTranslation() {
    this.loadTranslation('COMMON').subscribe(() => {
      this.transactionTypes.set([
        {
          label: this.translateService.instant('COMMON.BANK_ACCOUNT'),
          value: 'BANK',
        },
        {
          label: this.translateService.instant('COMMON.BILLET'),
          value: 'BILLET',
        },
        {
          label: this.translateService.instant('COMMON.OTHER_PAYMENT'),
          value: 'OTHER',
        },
      ]);
    });
  }

  getForm() {
    return this.formBuilder.group({
      category: this.formBuilder.group({
        id: ['', Validators.required],
      }),
      originCurrency: ['', Validators.required],
      destinationCurrency: ['', Validators.required],
      transactionType: ['', Validators.required],
      amount: [null, Validators.required],
      customerBankAccount: this.formBuilder.group({
        id: [''],
      }),
      billet: [null],
      description: [''],
      status: [''],
      totalAmount: [null],
      convertedAmount: [null],
    });
  }

  loadData() {
    const requests: Observable<any>[] = [
      this.categoryService.getDropdownData(),
      this.customerBankAccountService.getDropdownData(),
      this.quotationService.getAll(undefined, undefined, {
        'Disable-Error-Toast': 'True',
      }),
    ];

    this.id.set(this.route.snapshot.params['id']);

    if (this.id()) {
      requests.push(
        this.service
          .getOne(this.id(), undefined, { 'Disable-Error-toast': 'True' })
          .pipe(catchError(() => of(undefined)))
      );
    }

    forkJoin(requests).subscribe(
      ([categories, customerAccounts, quotation, transaction]) => {
        this.currencies.set([
          { value: 'BRL', label: 'BRL' },
          { value: 'ARS', label: 'ARS' },
        ]);

        if (categories) {
          this.categories.set(categories! as DropdownDataInterface[]);
        }

        if (customerAccounts) {
          this.customerAccounts.set(
            customerAccounts!! as DropdownDataInterface[]
          );
        }

        if (quotation) {
          this.quotation = quotation;
        }

        if (transaction) {
          this.formGroup.patchValue(transaction as any);
        }
      }
    );
  }

  handleConversion() {
    this.controls.totalAmount.disable({ emitEvent: false });
    this.controls.convertedAmount.disable({ emitEvent: false });

    this.formGroup.valueChanges.subscribe(
      ({ originCurrency, destinationCurrency, amount }) => {
        if (originCurrency) {
          this.originCurrency.set(originCurrency);
        }
        if (destinationCurrency) {
          this.destinationCurrency.set(destinationCurrency);
        }
        if (amount && this.quotation) {
          const tax = amount * this.quotation.percentualTax;
          const totalAmount = amount + tax;
          this.controls.totalAmount.setValue(totalAmount as any, {
            emitEvent: false,
          });

          const originField = `${this.originCurrency().toLowerCase()}Amount`;
          const destinationField = `${this.destinationCurrency().toLowerCase()}Amount`;

          const absoluteValue =
            (this.quotation as any)[destinationField] /
            (this.quotation as any)[originField];

          const convertedAmount = amount * absoluteValue;

          this.controls.convertedAmount.setValue(convertedAmount as any, {
            emitEvent: false,
          });
        } else {
          this.controls.totalAmount.setValue(null, { emitEvent: false });
          this.controls.convertedAmount.setValue(null, { emitEvent: false });
        }
      }
    );
  }

  validateRequiredFields() {
    this.formGroup.controls.transactionType.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), distinctUntilChanged())
      .subscribe((res) => {
        const requiredFields = new Map<string, string>();

        requiredFields.set('BANK', 'customerBankAccount.id');
        requiredFields.set('BILLET', 'billet');
        requiredFields.set('OTHER', 'description');

        for (const [key, value] of requiredFields.entries()) {
          const control = this.formGroup.get(value);
          if (key == res) toggleRequiredValidator(control, true);
          else toggleRequiredValidator(control, false);
        }
      });
  }

  save() {
    const subscription = this.id()
      ? this.service.update(this.dto, this.id())
      : this.service.create(this.dto);

    this.loading.set(true);
    subscription.subscribe({
      next: ({ id }) => {
        this.loading.set(false);
        this.router.navigate(['/app/transaction/edit', id]);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  get dto() {
    return removeEmptyFields(this.formGroup.getRawValue());
  }

  get controls() {
    return this.formGroup.controls;
  }
}
