import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@components/button/button.component';
import { InputComponent } from '@components/input/input.component';
import { QuotationService } from '@core/services/quotation.service';
import { TranslateModule } from '@ngx-translate/core';
import { PanelModule } from 'primeng/panel';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-quotation-form',
  standalone: true,
  imports: [
    PanelModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    TranslateModule,
  ],
  templateUrl: './quotation-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class QuotationFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  service = inject(QuotationService);
  cd = inject(ChangeDetectorRef);
  formGroup = this.getFormGroup();
  loading = signal(false);

  ngOnInit(): void {
    this.loadData();
  }

  getFormGroup() {
    return this.formBuilder.group({
      brlAmount: [null, Validators.required],
      arsAmount: [null, Validators.required],
      percentualTax: [null, Validators.required],
    });
  }

  save() {
    this.loading.set(true);
    this.service
      .create(this.dto)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe();
  }

  loadData() {
    this.service
      .getAll(undefined, undefined, { 'Disable-Error-Toast': 'True' })
      .subscribe((res) => {
        const quotation: any = res;
        if (quotation?.percentualTax) {
          quotation.percentualTax *= 100;
        }
        this.formGroup.patchValue(quotation);
        this.cd.markForCheck();
      });
  }

  get dto() {
    const dto: any = this.formGroup.getRawValue();
    if (dto.percentualTax) {
      dto.percentualTax /= 100;
    }
    return dto;
  }
}
