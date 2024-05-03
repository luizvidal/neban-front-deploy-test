import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export function blankStringValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == null) return null;
    if (control.value && control.value.trim()) return null;
    return {
      blankString: true,
    };
  };
}

export function onlyOneFieldRequiredValidator(
  controls: FormControl[],
  destroyRef: DestroyRef
) {
  controls.forEach((control) => {
    const remainingControls = controls.filter((c) => c != control);
    control.valueChanges
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe((value) => {
        if (value) {
          remainingControls.forEach((remainingControl) => {
            remainingControl.patchValue('', { emitEvent: false });
            toggleRequiredValidator(remainingControl, false);
          });
        } else {
          remainingControls.forEach((remainingControl) => {
            toggleRequiredValidator(remainingControl, true);
          });
        }
      });
  });
}

export function atLeastOneFieldRequiredValidator(
  controls: FormControl[],
  destroyRef: DestroyRef
) {
  controls.forEach((control) => {
    const remainingControls = controls.filter((c) => c != control);

    control.valueChanges
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe((value) => {
        const hasValueInRemainingControls = remainingControls.every(
          (c) => c.value
        );

        if (!value && !hasValueInRemainingControls) {
          toggleRequiredValidator(control, true)

        } else {
          controls.forEach((control) => {
            toggleRequiredValidator(control, false)
          });
        }
      });
  });
}

export function toggleRequiredValidator(
  control: AbstractControl<any, any> | null,
  required: boolean,
  emitEvent = false
) {
  if (required) control?.addValidators(Validators.required);
  else control?.removeValidators(Validators.required);
  control?.updateValueAndValidity({ emitEvent });
}
