import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./transaction-list/transaction-list.component'),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./transaction-form/transaction-form.component'),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./transaction-form/transaction-form.component'),
  },
];

export default routes;
