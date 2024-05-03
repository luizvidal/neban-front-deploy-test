import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonTools } from '@common/tools/common-tools';
import { ButtonComponent } from '@components/button/button.component';
import { InputComponent } from '@components/input/input.component';
import { CustomerBankAccountService } from '@core/services/customer-bank-account.service';
import { TranslateModule } from '@ngx-translate/core';
import {
  blankStringValidator,
  onlyOneFieldRequiredValidator,
} from '@shared/helpers/validators';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-customer-bank-account-form',
  standalone: true,
  imports: [
    PanelModule,
    ReactiveFormsModule,
    ButtonComponent,
    RouterLink,
    InputComponent,
    TranslateModule,
  ],
  templateUrl: './customer-bank-account-form.component.html',
})
export default class CustomerBankAccountFormComponent extends CommonTools {
  service = inject(CustomerBankAccountService);
  formGroup = this.getFormGroup();

  get controls() {
    return this.formGroup.controls;
  }

  get dto() {
    const dto: any = { ...this.formGroup.getRawValue() };

    for (const key in dto) {
      if (!dto[key]) delete dto[key];
    }

    return dto;
  }

  ngOnInit() {
    this.id.set(this.route.snapshot.params['id']);

    if (this.id()) {
      this.service.getOne(this.id()).subscribe((res) => {
        this.formGroup.patchValue(res as any);
      });
    }
    onlyOneFieldRequiredValidator(
      [this.controls['ownerCpf'], this.controls['ownerCnpj']],
      this.destroyRef
    );
  }

  save() {
    const subscription = this.id()
      ? this.service.update(this.dto, this.id())
      : this.service.create(this.dto);

    this.loading.set(true);
    subscription.subscribe({
      next: ({ id }) => {
        this.loading.set(false);
        this.router.navigate(['/home/customer-bank-account/edit', id]);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  getFormGroup() {
    return this.formBuilder.group({
      ownerName: ['', [Validators.required, blankStringValidator()]],
      ownerCpf: ['', Validators.required],
      ownerCnpj: ['', Validators.required],
      bankNumber: [null, Validators.required],
      accountNumber: [null, Validators.required],
      agencyNumber: [null, Validators.required],
      country: ['', [Validators.required, blankStringValidator()]],
    });
  }
}
