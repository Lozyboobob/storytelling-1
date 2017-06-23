import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// SLIDES COMPONENTS
import { SlidesPresentationComponent, PrezFormComponent, PrezListComponent} from '.';

import { Auth } from 'app/users';


const slidesRoutes: Routes = [
  {
    path: '',
    component: PrezListComponent,
    canActivate: [Auth],
    data: {
      roles: ['*'],
      title: 'slides Manager'
    },
    pathMatch: 'full'
  }, {
    path: 'createSlides',
    component: PrezFormComponent,
    data: { title: 'Slides Creator' }
  }, {
    path: 'slides/:id',
    component: PrezFormComponent,
    data: {
      roles: ['user'],
      title: 'Slides Editor'
    }
  }, {
    path: 'slidesPresentation/:id',
    component: SlidesPresentationComponent,
    data: { title: 'Presentation' }
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
