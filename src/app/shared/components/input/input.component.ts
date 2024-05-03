import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Injector,
  Input,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  Validators,
} from '@angular/forms';
import {
  getErrorAditionalInfo,
  getTranslatedErrorMessageKey,
} from '@common/functions/functions';
import { DropdownDataInterface } from '@common/interfaces/dropdown-data.interface';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    InputTextModule,
    InputMaskModule,
    InputNumberModule,
    DropdownModule,
    TranslateModule,
  ],
  templateUrl: './input.component.html',
  styles: `

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor, AfterViewInit {
  getTranslatedErrorMessageKey = getTranslatedErrorMessageKey;
  getErrorAditionalInfo = getErrorAditionalInfo;
  control?: NgControl;
  controlInvalid = false;
  controlIsRequired = false;
  value: string | number | boolean = '';
  destoryRef = inject(DestroyRef);
  changeDetectorRef = inject(ChangeDetectorRef);
  errorInfo: any = {
    translationKey: null,
    requiredLength: null,
  };

  @Input() type:
    | 'text'
    | 'number'
    | 'checkbox'
    | 'switch'
    | 'dropdown'
    | 'currency'
    | 'mask' = 'text';
  @Input() iconPosition: 'right' | 'left' | '' = '';
  @Input() icon = '';
  @Input() mask = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() dropdownData: DropdownDataInterface[] = [];
  @Input() showClear = true;
  @Input() hideErrorMessage = false;
  @Input() inputId = 'input-id';
  @Input() useGrouping = false;
  @Input() locale = 'pt-BR';
  @Input() currency = 'BRL';
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() minFractionDigits = 0;
  @Input() maxFractionDigits = 0;
  @Input() disabled = false;

  constructor(private injector: Injector) {}

  onChanged = (event: any) => {};

  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  ngAfterViewInit() {
    this.control = this.injector.get(NgControl);

    this.control.statusChanges
      ?.pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe((status) => {
        this.controlInvalid = status === 'INVALID';
      });

    this.controlIsRequired = !!this.control.control?.hasValidator(
      Validators.required
    );
  }

  ngDoCheck() {
    this.changeDetectorRef.detectChanges();
  }
}
