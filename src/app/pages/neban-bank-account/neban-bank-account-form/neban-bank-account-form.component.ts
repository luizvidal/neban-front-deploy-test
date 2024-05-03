import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '@components/button/button.component';
import { InputComponent } from '@components/input/input.component';
import { NebanBankAccountService } from '@core/services/neban-bank-account.service';
import { TranslateModule } from '@ngx-translate/core';
import {
  blankStringValidator,
  onlyOneFieldRequiredValidator,
} from '@shared/helpers/validators';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-neban-bank-account-form',
  standalone: true,
  imports: [
    PanelModule,
    ReactiveFormsModule,
    ButtonComponent,
    RouterLink,
    InputComponent,
    TranslateModule,
  ],
  templateUrl: './neban-bank-account-form.component.html',
})
export default class NebanBankAccountFormComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  service = inject(NebanBankAccountService);
  loading = signal(false);
  formGroup = this.getFormGroup();
  id = signal('');
  destroyRef = inject(DestroyRef);

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
      [
        this.controls.customerLegalDocument,
        this.controls.customerPersonalDocument,
      ],
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
        this.router.navigate(['/app/neban-bank-account/edit', id]);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  getFormGroup() {
    return this.formBuilder.group({
      customerName: ['', [Validators.required, blankStringValidator()]],
      customerPersonalDocument: ['', Validators.required],
      customerLegalDocument: ['', Validators.required],
      bankNumber: [null, Validators.required],
      accountNumber: [null, Validators.required],
      agencyNumber: [null, Validators.required],
      customerCountry: ['', [Validators.required, blankStringValidator()]],
    });
  }
}
