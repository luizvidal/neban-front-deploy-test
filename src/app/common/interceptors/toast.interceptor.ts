import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '@common/services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { catchError, tap, throwError } from 'rxjs';

export const toastInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const translateService = inject(TranslateService);

  return next(req).pipe(
    tap((event) =>
      onSuccessResponse(req, event, toastService, translateService)
    ),
    catchError((error) =>
      onErrorResponse(req, error, toastService, translateService)
    )
  );
};

function onSuccessResponse(
  req: HttpRequest<any>,
  event: HttpEvent<any>,
  toastService: ToastService,
  translateService: TranslateService
) {
  if (req.headers.get('Disable-Success-Toast')) return;
  if (event.type == HttpEventType.Response) {
    if (event.ok && req.method != 'GET' && req.method != 'OPTIONS') {
      const title = req.headers.get('Success-Toast-Title') || 'Sucesso';
      let description = req.headers.get('Success-Toast-Description') || '';
      if (!description) {
        switch (req.method) {
          case 'POST':
            description = translateService.instant('TOAST.POST');
            break;
          case 'PUT':
            description = translateService.instant('TOAST.PUT');
            break;
          default:
            description = translateService.instant('TOAST.DELETE');
        }
      }

      toastService.showMessage({
        severity: 'success',
        summary: title,
        detail: description,
      });
    }
  }
}

function onErrorResponse(
  req: HttpRequest<any>,
  errorResponse: HttpErrorResponse,
  toastService: ToastService,
  translateService: TranslateService
) {
  if (!req.headers.get('Disable-Error-Toast')) {
    const title =
      req.headers.get('Error-Toast-Title') ||
      translateService.instant('COMMON.ERROR');
    const description =
      errorResponse?.error?.message || translateService.instant('TOAST.ERROR');

    toastService.showMessage({
      severity: 'error',
      summary: title,
      detail: description,
    });
  }
  return throwError(() => errorResponse);
}
