import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslationService } from './translation.service';

export const translationInterceptor: HttpInterceptorFn = (req, next) => {
  const translationService = inject(TranslationService)

  const request = req.clone({
    headers: req.headers.append('Accept-Language', translationService.currentLanguage$.value),
  });

  return next(request);
};
