import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ARTICLES COMPONENTS
import { ArticlesComponent, ArticlesListComponent, ArticleDetailsComponent } from './components';

import { Auth } from '../users';

const articlesRoutes: Routes = [{
        path: '', 
        component: ArticlesComponent,
        canActivate: [Auth],
        data : {
          roles : ['user', 'admin']
        }, 
        children: [{
            path: '',
            component: ArticlesListComponent
          },
          {
          path: 'article/:id',
          component: ArticleDetailsComponent
        }]
      }
    ];
  
@NgModule({
  imports: [
    RouterModule.forChild(articlesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ArticlesRoutingModule { }
