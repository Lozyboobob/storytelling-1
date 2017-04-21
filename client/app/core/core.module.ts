import { NgModule,CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// MATERIAL DESIGN MODULES
import { MaterialModule } from '@angular/material';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';

// CORE COMPONENTS
import { AppToolbarComponent, AppSidenavComponent } from "./index";

// REDUX
import { NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';

// SERVICES
import {SessionActions, SessionEpics, MenuService, ToggleNavService } from './index';


@NgModule({
  imports: [
    NgReduxModule,
    RouterModule,
    NgReduxRouterModule,
    Angular2FontAwesomeModule,
    MaterialModule.forRoot(),
    CommonModule
  ],
  declarations: [
    AppToolbarComponent,
    AppSidenavComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    SessionActions,
    SessionEpics,
    MenuService,
    ToggleNavService
  ], 
  exports: [ AppToolbarComponent, AppSidenavComponent ]
})
export class CoreModule {}
