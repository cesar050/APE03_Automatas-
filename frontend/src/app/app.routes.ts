import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'afnd/iot', pathMatch: 'full' },
  { path: 'afnd/iot',       loadComponent: () => import('./afnd/iot.component').then(m => m.IotComponent) },
  { path: 'afnd/slack',     loadComponent: () => import('./afnd/slack.component').then(m => m.SlackComponent) },
  { path: 'afnd/genetic',   loadComponent: () => import('./afnd/genetic.component').then(m => m.GeneticComponent) },

  { path: 'afd/banking',    loadComponent: () => import('./afd/banking.component').then(m => m.BankingComponent) },
  { path: 'afd/lock',       loadComponent: () => import('./afd/lock.component').then(m => m.LockComponent) },
  { path: 'afd/scientific', loadComponent: () => import('./afd/scientific.component').then(m => m.ScientificComponent) },
];