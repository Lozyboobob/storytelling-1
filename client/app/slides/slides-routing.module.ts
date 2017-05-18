import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// SLIDES COMPONENTS
import { SlidesPresentationComponent, SlidesCreatorComponent, SlidesListComponent, SlidesEditorComponent,SlidesManagerComponent} from '.';

import { Auth } from 'app/users';


const slidesRoutes: Routes = [{
    path: '',
    component: SlidesManagerComponent,
    canActivate: [Auth],
    data: {
        roles: ['*'],
        title: 'slides Manager'
    },
    pathMatch: 'full'
},
    {
        path: 'manager/createSlides',
        component: SlidesCreatorComponent,
        data: { title: 'Slides Creator' }
    },
    {
        path: 'manager/slidesPresentation/:id',
        component: SlidesPresentationComponent,
        data: { title: 'Presentation' }
    },
    {
        path: 'manager/slides/:id',
        component: SlidesEditorComponent,
        data: {
            roles: ['user'],
            title: 'Slides Editor'
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(slidesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class SlidesRoutingModule { }
