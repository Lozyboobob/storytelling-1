import { RouterModule, Routes } from '@angular/router';
// APP COMPONENTS
 import { SettingsComponent } from './settings/index';
 import { LoginComponent, RegisterComponent, ListComponent } from './index';
 import { Auth } from './services/auth.service';

const USERSROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent , canActivateChild: [Auth]},
  { path: 'settings/profile', component: SettingsComponent, canActivateChild: [Auth],
  data : {
    roles : ['user', 'admin']
  } },
  { path:'list-users', component: ListComponent, canActivateChild: [Auth],
  data : {
    roles : ['admin']
  }}];

export const USERS_ROUTES = RouterModule.forChild(USERSROUTES);
