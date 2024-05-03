import { Routes } from '@angular/router';
import { KeycloakAuth } from './utility/keycloack/keycloack.config';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    loadComponent: () => import('./pages/landing/landing.component'),
  },
  {
    path: 'app',
    loadComponent: () => import('./layout/layout.component'),
    canActivate: [KeycloakAuth],
    // canActivateChild: [acessGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'category',
        loadChildren: () => import('./pages/category/category.routes'),
      },
      {
        path: 'customer',
        loadComponent: () =>
          import('./pages/customer/customer-list/customer-list.component'),
      },
      {
        path: 'neban-bank-account',
        loadChildren: () =>
          import('./pages/neban-bank-account/neban-bank-account.routes'),
      },
      {
        path: 'destination',
        loadChildren: () => import('./pages/destination/destination.routes'),
      },
      {
        path: 'quotation',
        loadComponent: () =>
          import('./pages/quotation/quotation-form/quotation-form.component'),
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component'),
      },
      {
        path: 'data',
        loadComponent: () =>
          import('./pages/customer/customer-form/customer-form.component'),
      },
      {
        path: 'customer-bank-account',
        loadChildren: () =>
          import('./pages/customer-bank-account/customer-bank-account.routes'),
      },
      {
        path: 'transaction',
        loadChildren: () => import('./pages/transaction/transaction.routes'),
      },
      {
        path: 'transaction-status',
        loadChildren: () =>
          import('./pages/transaction-status/transactoin-status.routes'),
      },
    ],
  },
];
