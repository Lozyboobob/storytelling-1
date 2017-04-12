import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS

 import { HomeComponent,  SlidesComponent,SlidesListComponent,SlidesCreatorComponent} from './home/index';
 import { LoginComponent, RegisterComponent } from './users/index';
 import { AuthInterceptor } from './users/index';

const ROUTES: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthInterceptor]  },
    { path: '', component: SlidesListComponent },
     { path: '', component: HomeComponent },
     { path: 'login', component: LoginComponent },
     { path: 'register', component: RegisterComponent },
     { path: 'slides/:slidesId', component: SlidesComponent },
     { path: 'createSlides', component: SlidesCreatorComponent },

     // otherwise redirect to home
     { path: '**', redirectTo: '' }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);
