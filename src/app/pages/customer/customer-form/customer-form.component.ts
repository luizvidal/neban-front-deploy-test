import { Component, inject } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DropdownDataInterface } from '@common/interfaces/dropdown-data.interface';
import { CommonTools } from '@common/tools/common-tools';
import { ButtonComponent } from '@components/button/button.component';
import { InputComponent } from '@components/input/input.component';
import { CustomerInterface } from '@core/interfaces/customer.interface';
import { CustomerService } from '@core/services/customer.service';
import { TranslateModule } from '@ngx-translate/core';
import { blankStringValidator } from '@shared/helpers/validators';
import { PanelModule } from 'primeng/panel';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  templateUrl: './customer-form.component.html',
  imports: [
    PanelModule,
    ReactiveFormsModule,
    ButtonComponent,
    RouterLink,
    InputComponent,
    TranslateModule,
  ],
  styles: `
    :host ::ng-deep {
      .p-panel-header {
        border-radius: 12px 12px 0 0;
      }

      .p-panel-content {
        border-radius: 0 0 12px 12px;
      }
    }

  `,
})
export default class CustomerFormComponent extends CommonTools {
  service = inject(CustomerService);
  formGroup = this.getFormGroup();
  loggedCustomer$ = toObservable(this.service.loggedCustomer);
  maritalStatuses: DropdownDataInterface[] = [];

  propertyRegime: DropdownDataInterface[] = [];

  get controls() {
    return this.formGroup.controls;
  }

  get dto() {
    return this.formGroup.getRawValue();
  }

  ngOnInit() {
    this.loggedCustomer$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((customer) => customer && this.formGroup.patchValue(customer));
    this.setTranslation();
  }

  setTranslation() {
    this.loadTranslation('COMMON').subscribe(() => {
      this.maritalStatuses = [
        {
          label: this.translateService.instant('COMMON.SINGLE'),
          value: 'SINGLE',
        },
        {
          label: this.translateService.instant('COMMON.MARRIED'),
          value: 'MARRIED',
        },
        {
          label: this.translateService.instant('COMMON.APARTED'),
          value: 'APARTED',
        },
        {
          label: this.translateService.instant('COMMON.DIVORCED'),
          value: 'DIVORCED',
        },
        {
          label: this.translateService.instant('COMMON.WIDOW'),
          value: 'WIDOW',
        },
      ];

      this.propertyRegime = [
        {
          label: this.translateService.instant('COMMON.PARTIALCOMMUNITY'),
          value: 'PARTIALCOMMUNITY',
        },
        {
          label: this.translateService.instant('COMMON.UNIVERSALCOMMUNITY'),
          value: 'UNIVERSALCOMMUNITY',
        },
        {
          label: this.translateService.instant('COMMON.CONVENTIONALSEPARATION'),
          value: 'CONVENTIONALSEPARATION',
        },
        {
          label: this.translateService.instant('COMMON.MANDATORYSEPARATION'),
          value: 'MANDATORYSEPARATION',
        },
        {
          label: this.translateService.instant('COMMON.FINALPARTICIPATION'),
          value: 'FINALPARTICIPATION',
        },
      ];
    });
  }

  save() {
    this.loading.set(true);
    this.service
      .save(this.dto)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe(
        ({ id }) =>
          id && this.service.loggedCustomer.set(this.dto as CustomerInterface)
      );
  }

  getFormGroup() {
    return this.formBuilder.group({
      firstName: [
        '',
        [Validators.required, Validators.minLength(3), blankStringValidator()],
      ],
      lastName: [
        '',
        [Validators.required, Validators.minLength(3), blankStringValidator()],
      ],
      nationality: ['', [blankStringValidator()]],
      maritalStatus: [''],
      propertyRegime: [''],
      profession: ['', [blankStringValidator()]],
      rg: [''],
      cpf: ['', [Validators.required]],
      address: ['', [blankStringValidator()]],
      cep: [''],
    });
  }
}
