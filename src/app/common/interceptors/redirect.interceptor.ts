import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const redirectInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    tap({
      error: (error) => {
        if (error.status == HttpStatusCode.Unauthorized) {
          router.navigate(['/landing']);
        }
      },
    })
  );
};
