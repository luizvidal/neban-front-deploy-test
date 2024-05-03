import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { CommonTools } from '@common/tools/common-tools';
import { TranslationService } from '@common/translation/translation.service';
import { CustomerService } from '@core/services/customer.service';
import { environment } from '@environments/environment';
import { PrimeNGConfig } from 'primeng/api';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  template: ` <router-outlet />`,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent extends CommonTools implements OnInit {
  primengConfig = inject(PrimeNGConfig);
  customerService = inject(CustomerService);
  customerId$ = toObservable(this.customerService.customerId);
  http = inject(HttpClient);
  environment = environment;
  translationService = inject(TranslationService);

  ngOnInit(): void {
    this.configurePrimeng();
    this.loadLoggeddCustomerData();
    this.translateService.setDefaultLang('pt-BR');
  }

  configurePrimeng() {
    this.primengConfig.ripple = true;
    this.loadTranslation('PRIMENG').subscribe((translation) => {
      this.primengConfig.setTranslation(translation);
    });
  }

  loadLoggeddCustomerData() {
    if (this.customerService.isCustomerLoggedIn()) {
      this.customerService
        .registerCustomer()
        .pipe(
          tap((response) => {
            this.customerService.customerPermission.set(response.permission);
            this.customerService.customerId.set(response.id);
          }),
          switchMap((response) => this.customerService.getOne(response.id))
        )
        .subscribe((res) => this.customerService.loggedCustomer.set(res));
    }
  }
}
