import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {ProfileComponent} from './profile.component';
import {canActivate} from './canActivate';

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [canActivate]
  },
  {
    path: 'login',
    component: AppComponent,
  }
];
