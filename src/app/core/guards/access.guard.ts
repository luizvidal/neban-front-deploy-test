import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CustomerService } from '@core/services/customer.service';
import { firstValueFrom } from 'rxjs';

export const acessGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const userAccess = ['home', 'data', 'customer-bank-account', 'transaction'];
  const customerService = inject(CustomerService);
  let permission = customerService.customerPermission();

  if (!permission) {
    const response = await firstValueFrom(customerService.registerCustomer());
    permission = response.permission;
  }

  if (permission === 'USER') {
    if (userAccess.includes(state.url.replace('/app/', ''))) {
      return true;
    } else {
      return router.createUrlTree(['app/home']);
    }
  } else {
    return true;
  }
};
