import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { Auth } from './users/services/auth.service';
 import { HomeComponent,  SlidesComponent,SlidesListComponent,SlidesCreatorComponent} from './home/index';

const appRoutes: Routes = [
    { path: '', component: SlidesListComponent },
    { path: 'user', loadChildren: 'app/users/users.module#UsersModule' },
    { path: 'slides/:slidesId', component: SlidesComponent },
    { path: 'createSlides', component: SlidesCreatorComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        Auth
    ]
})
export class AppRoutingModule { }
