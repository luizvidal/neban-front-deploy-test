import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './customer-bank-account-list/customer-bank-account-list.component'
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import(
        './customer-bank-account-form/customer-bank-account-form.component'
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import(
        './customer-bank-account-form/customer-bank-account-form.component'
      ),
  },
];

export default routes;
