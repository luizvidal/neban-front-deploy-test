import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./transaction-status-list/transaction-status-list.component'),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./transaction-status-form/transaction-status-form.component'),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./transaction-status-form/transaction-status-form.component'),
  },
];

export default routes;
