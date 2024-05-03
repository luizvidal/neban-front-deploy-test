import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./category-list/category-list.component'),
  },
  {
    path: 'new',
    loadComponent: () => import('./category-form/category-form.component'),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./category-form/category-form.component'),
  },
];

export default routes;
