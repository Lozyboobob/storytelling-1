import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Router } from '@angular/router';
import {InterceptedHttp} from "./users/services/interceptors/http.interceptor";
// FONT AWESOME
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';

// MATERIAL DESIGN MODULES
import { MaterialModule, OverlayContainer } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

// APP ROUTING
import { AppRoutingModule } from './app-routing.module';

//  COMPONENTS
import { AppComponent } from './app.component';
import { CoreModule } from "./core";
import { LoginComponent, RegisterComponent } from './users/index';
import { UsersModule } from "./users";
import { HomeComponent } from './home/home.component';
//import { HomeModule } from './home/index';

import { SlidesCreatorComponent } from './home/slides-creator/slides-creator.component';
import { SlideCreatorComponent } from './home/slides-creator/slide-creator/slide-creator.component';
import { SlidesComponent } from './home/slides/slides.component';
import { ScrollDirective } from './home/slides/scroll.directive';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { SlidesListComponent } from './home/slides-list/slides-list.component';
import { ForceDirectedGraphComponent } from './charts/force-directed-graph/force-directed-graph.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { JsonValidatorDirective } from './home/slides-creator/json-validator.directive';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { CsvInputComponent } from './home/slides-creator/slide-creator/csv-input/csv-input.component';




@NgModule({
    declarations: [
        AppComponent,

        HomeComponent,
        SlidesCreatorComponent,
        SlideCreatorComponent,
        SlidesComponent,
        ScrollDirective,
        BarChartComponent,
        SlidesListComponent,
        ForceDirectedGraphComponent,
        JsonValidatorDirective,
        LineChartComponent,
        CsvInputComponent,
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
        AppRoutingModule,
        BrowserModule,
        Ng2PageScrollModule.forRoot(),
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot()
    ],
    providers: [
        OverlayContainer
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    // Diagnostic only: inspect router configuration
    constructor(router: Router) {
        // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }

}
