import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Router } from '@angular/router';

// FONT AWESOME
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';

// MATERIAL DESIGN MODULES
import { MaterialModule, OverlayContainer } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

// APP ROUTING 
import { AppRoutingModule } from './app-routing.module';

// APP COMPONENTS
import { AppComponent } from "./index";

import { CoreModule } from "./core";
import { HomeModule } from './home/index';
import { ArticlesConfigModule } from './articles/config';
import { UsersModule } from "./users";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    Angular2FontAwesomeModule,
    MaterialModule.forRoot(),
    BrowserAnimationsModule, 
    CoreModule,
    UsersModule.forRoot(),
    ArticlesConfigModule.forRoot(),
    AppRoutingModule,
    HomeModule,
    BrowserModule
  ],
  providers: [
    OverlayContainer],
  bootstrap: [AppComponent]
})
export class AppModule { 
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }

}
