import { RouterModule, Routes } from '@angular/router';

// ARTICLES COMPONENTS
import { ArticlesComponent, ArticleDetailsComponent, ArticleComponent } from './components/index';
import { Auth } from '../users/services/auth.service';

const ARTICLESROUTES: Routes = [{
        path: '', 
        component: ArticlesComponent,
        canActivate: [Auth],
        data : {
          roles : ['user', 'admin']
        }, 
        children: [{
          path: 'article/:id',
          component: ArticleDetailsComponent,
          canActivateChild: [Auth],
          data : {
            roles : ['user', 'admin']
          }
        }]
      }
    ];


export const ARTICLES_ROUTES = RouterModule.forChild(ARTICLESROUTES);
