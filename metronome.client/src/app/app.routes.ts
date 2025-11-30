import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: 'composers',
  loadComponent: () => import('./pages/composer-page/composer-page.component').then(m => m.ComposerPageComponent)
}];
