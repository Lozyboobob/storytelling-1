import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// SLIDES COMPONENTS
import { SlidesPresentationComponent,SlidesListComponent,SlidesCreatorComponent} from '.';

import { Auth } from 'app/users';

const slidesRoutes: Routes = [{
        path: '',
        component: SlidesPresentationComponent,
        canActivate: [Auth],
        data : {
          roles : ['user', 'admin'],
          title : 'slides'
        },
        children: [{
            path: 'slides-list',
            component: SlidesListComponent,
            data : { title : 'slides List'}
          },
          {
          path: 'slides/:id',
          component: SlidesCreatorComponent,
          data : { title : 'Slide Detail'}
        }]
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
