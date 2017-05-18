import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// FONT AWESOME
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';

// MATERIAL DESIGN MODULES
import { MaterialModule, OverlayContainer } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

// APP ROUTING
import { AppRoutingModule } from './app-routing.module';

// APP COMPONENTS
import { AppComponent } from ".";

import { CoreModule, StoreModule } from "app/core";
import { HomeModule } from 'app/home';
import { ArticlesConfigModule } from 'app/articles/config';
import { SlidesConfigModule } from 'app/slides/config';
import { UsersModule } from "app/users";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    Angular2FontAwesomeModule,
    MaterialModule.forRoot(),
    BrowserAnimationsModule,
    StoreModule,
    CoreModule,
    UsersModule.forRoot(),
    ArticlesConfigModule.forRoot(),
    SlidesConfigModule.forRoot(),
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
