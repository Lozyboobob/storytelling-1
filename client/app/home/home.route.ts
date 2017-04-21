import { RouterModule, Routes } from '@angular/router';
// APP COMPONENTS
 import { HomeComponent } from './index';


const HOMEROUTES: Routes = [
     { path: 'home', component: HomeComponent}];

export const HOME_ROUTES = RouterModule.forChild(HOMEROUTES);
