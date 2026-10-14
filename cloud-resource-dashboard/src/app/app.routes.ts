
import { Routes } from '@angular/router';

import { Servers } from './pages/servers/servers';
import { Storage } from './pages/storage/storage';
import { Functions } from './pages/functions/functions';

export const routes: Routes = [
  { path: '', redirectTo: 'servers', pathMatch: 'full' },
  { path: 'servers', component: Servers, title: 'Servers' },
  { path: 'storage', component: Storage, title: 'Storage' },
  { path: 'functions', component: Functions, title: 'Functions' },
  { path: '**', redirectTo: 'servers' }
];
