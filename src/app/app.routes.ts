import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./pages/list/list.component').then(m => m.ListComponent),
  },
  {
    path: 'list/:id',
    loadComponent: () =>
      import('./pages/list/list.component').then(m => m.ListComponent),
  },
];
