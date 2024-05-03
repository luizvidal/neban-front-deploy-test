import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./destination-list/destination-list.component'),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./destination-form/destination-form.component'),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./destination-form/destination-form.component'),
  },
];

export default routes;
