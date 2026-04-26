import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'afnd/iot', pathMatch: 'full' },
  { path: 'afnd/iot',       loadComponent: () => import('./afnd/iot.component').then(m => m.IotComponent) },
  { path: 'afnd/slack',     loadComponent: () => import('./afnd/slack.component').then(m => m.SlackComponent) },
  { path: 'afnd/genetic',   loadComponent: () => import('./afnd/genetic.component').then(m => m.GeneticComponent) }
];