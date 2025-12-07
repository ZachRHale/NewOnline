import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'composers',
    loadComponent: () =>
      import('./pages/composer-page/composer-page.component').then(
        (m) => m.ComposerPageComponent,
      ),
  },
  {
    path: 'metronome/:id',
    loadComponent: () =>
      import('./pages/metronome/metronome.component').then(
        (m) => m.MetronomeComponent,
      ),
  },
  {
    path: 'composer/:composerId/scores',
    loadComponent: () =>
      import('./pages/composer-scores/composer-scores.component').then(
        (m) => m.ComposerScoresComponent,
      ),
  },
];
