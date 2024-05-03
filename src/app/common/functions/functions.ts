import { ValidationErrors } from '@angular/forms';

export function getTranslatedErrorMessageKey(errors: ValidationErrors | null) {
  if (errors) {
    if (errors['required']) {
      return 'VALIDATION.REQUIRED';
    }
    if (errors['minlength']) {
      return 'VALIDATION.MIN_LENGTH';
    }
    if (errors['blankString']) {
      return 'VALIDATION.BLANK_STRING';
    }
    if (errors['pattern']) {
      return 'VALIDATION.PATTERN';
    }
  }
  return '';
}

export function getErrorAditionalInfo(errors: ValidationErrors | null) {
  if (errors) {
    if (errors['minlength']) {
      return errors['minlength']['requiredLength'];
    }
  }
  return '';
}

export function removeEmptyFields(obj: any) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v));
}
