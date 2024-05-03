import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DropdownDataInterface } from '@common/interfaces/dropdown-data.interface';
import { ButtonComponent } from '@components/button/button.component';
import { InputComponent } from '@components/input/input.component';
import { NebanBankAccountInterface } from '@core/interfaces/neban-bank-account';
import { CategoryService } from '@core/services/category.service';
import { DestinationService } from '@core/services/destination.service';
import { NebanBankAccountService } from '@core/services/neban-bank-account.service';
import { TranslateModule } from '@ngx-translate/core';
import { atLeastOneFieldRequiredValidator } from '@shared/helpers/validators';
import { PanelModule } from 'primeng/panel';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-destination-form',
  standalone: true,
  imports: [
    PanelModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    RouterLink,
    TranslateModule,
  ],
  templateUrl: './destination-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DestinationFormComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  service = inject(DestinationService);
  categoryService = inject(CategoryService);
  NebanBankAccountService = inject(NebanBankAccountService);
  formBuilder = inject(NonNullableFormBuilder);
  destroyRef = inject(DestroyRef);
  formGroup = this.getFormGroup();
  id = signal('');
  loading = signal(false);
  categories = signal<DropdownDataInterface[]>([]);
  walletBankAccounts = signal<NebanBankAccountInterface[]>([]);
  walletBankAccountsOptions = signal<DropdownDataInterface[]>([]);

  ngOnInit() {
    this.loadData();
    atLeastOneFieldRequiredValidator(
      [
        this.formGroup.controls.initialAmount,
        this.formGroup.controls.finalAmount,
      ],
      this.destroyRef
    );
  }

  getFormGroup() {
    return this.formBuilder.group({
      category: this.formBuilder.group({
        id: ['', Validators.required],
      }),
      walletBankAccount: this.formBuilder.group({
        id: ['', Validators.required],
      }),
      initialAmount: [null, Validators.required],
      finalAmount: [null, Validators.required],
    });
  }

  loadData() {
    this.id.set(this.route.snapshot.params['id']);
    this.loading.set(true);

    const params = { page: 0, size: 1000 };
    forkJoin([
      this.service
        .getOne(this.id(), undefined, { 'Disable-Error-toast': 'True' })
        .pipe(catchError(() => of(undefined))),
      this.categoryService.getDropdownData(),
      this.NebanBankAccountService.getAll(params),
    ])
      .pipe()
      .subscribe(([formData, categories, walletBankAccounts]) => {
        const walletBankAccountsOptions = walletBankAccounts.content.map(
          ({ id, accountNumber, customerName }) => ({
            value: id,
            label: customerName + ' - ' + accountNumber,
          })
        );
        this.walletBankAccountsOptions.set(walletBankAccountsOptions);
        this.categories.set(categories);
        this.walletBankAccounts.set(walletBankAccounts.content);

        if (formData) {
          this.formGroup.patchValue(formData as any);
        }

        this.loading.set(false);
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
        this.router.navigate(['/app/destination/edit', id]);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  get dto() {
    const dto: any = this.formGroup.getRawValue();

    Object.keys(dto).forEach((key) => {
      if (!dto[key]) delete dto[key];
    });

    return dto;
  }
}
