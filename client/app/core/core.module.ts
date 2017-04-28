import { NgModule,CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// MATERIAL DESIGN MODULES
import { MaterialModule } from '@angular/material';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';

// REDUX
import { NgReduxModule, DevToolsExtension, NgRedux } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';

// HTTP INTERCEPTOR
import { HttpInterceptorModule, HttpInterceptorService } from "ng-http-interceptor";

// CORE COMPONENTS
import { AppToolbarComponent, AppSidenavComponent, NotFoundPageComponent, BadRequestPageComponent } from ".";

// CORE SERVICES
import { SessionActions, SessionEpics, MenuService, ToggleNavService, HttpInterceptableService } from '.';


@NgModule({
  imports: [
    NgReduxModule,
    RouterModule,
    NgReduxRouterModule,
    HttpInterceptorModule,
    Angular2FontAwesomeModule,
    MaterialModule.forRoot(),
    CommonModule
  ],
  declarations: [
    AppToolbarComponent,
    AppSidenavComponent,
    NotFoundPageComponent,
    BadRequestPageComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    SessionActions,
    SessionEpics,
    MenuService,
    ToggleNavService,
    { provide: HttpInterceptableService, useClass: HttpInterceptableService,
       deps: [ HttpInterceptorService, NgRedux, Router, SessionActions ], multi: true }
  ], 
  exports: [ 
    AppToolbarComponent,
    AppSidenavComponent, 
    NotFoundPageComponent, 
    BadRequestPageComponent 
  ]
})
export class CoreModule {}
