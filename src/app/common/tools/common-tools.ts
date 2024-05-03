import { ChangeDetectorRef, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointService } from '@common/services/breakpoint.service';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

export abstract class CommonTools {
  cd = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  translateService = inject(TranslateService);
  breakpointService = inject(BreakpointService);

  id = signal('');
  loading = signal(false);
  totalRecords = signal(0);

  loadTranslation(key: string | string[]) {
    return this.translateService.stream(key).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((translation) => typeof translation !== 'string')
    );
  }
}
