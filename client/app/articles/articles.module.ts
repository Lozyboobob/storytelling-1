import { NgModule,CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL DESIGN MODULES
import { MaterialModule, OverlayContainer, TooltipPosition } from '@angular/material';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';

// ARTICLES COMPONENTS
import { ArticlesComponent, ArticlesListComponent, ArticleDetailsComponent, ArticleComponent } from './index';

// ARTICLES SERVICES
import {ArticlesService} from './index';

// ARTICLE CONFIG
// import { ArticlesConfig, articlesFactory } from './index';

// ARTICLES ROUTES
// import { ARTICLES_ROUTES } from './index';
import { ArticlesRoutingModule } from "./articles-routing.module";

@NgModule({
  imports: [
    // ARTICLES_ROUTES,
    CommonModule,
    MaterialModule,
    ArticlesRoutingModule
  ],
  declarations: [
    ArticlesComponent,
    ArticlesListComponent,
    ArticleDetailsComponent,
    ArticleComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [OverlayContainer,ArticlesService],

})
export class ArticlesModule {
}
