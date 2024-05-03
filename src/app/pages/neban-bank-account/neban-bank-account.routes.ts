import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./neban-bank-account-list/neban-bank-account-list.component'),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./neban-bank-account-form/neban-bank-account-form.component'),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./neban-bank-account-form/neban-bank-account-form.component'),
  },
];

export default routes;
