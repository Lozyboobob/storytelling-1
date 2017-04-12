import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
// FONT AWESOME
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';

// MATERIAL DESIGN MODULES
import { MaterialModule, OverlayContainer } from '@angular/material';
import 'hammerjs';


//  REDUX
import { NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';

//  ROUTING APP
import { APP_ROUTES } from './app.routes';

//  SERVICES
import { UsersService, AuthInterceptor } from './users/index';
import {SessionActions} from './core/actions/session.actions';
import {SessionEpics} from './core/epics';

//  COMPONENTS
import { AppComponent } from './app.component';
import { AppToolbarComponent } from './app-toolbar/index';
import { LoginComponent, RegisterComponent } from './users/index';
import { HomeComponent } from './home/home.component';
import { AppSidenavComponent } from './app-sidenav/index';
import { SlidesCreatorComponent } from './home/slides-creator/slides-creator.component';
import { SlideCreatorComponent } from './home/slides-creator/slide-creator/slide-creator.component';
import { SlidesComponent } from './home/slides/slides.component';
import { ScrollDirective } from './home/slides/scroll.directive';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { BarChartComponent } from './charts/test/bar-chart/bar-chart.component';
import { SlidesListComponent } from './home/slides-list/slides-list.component';
import { ForceDirectedGraphComponent } from './charts/force-directed-graph/force-directed-graph.component';

import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';




@NgModule({
    declarations: [
        AppComponent,
        AppToolbarComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        AppSidenavComponent,
        SlidesCreatorComponent,
        SlideCreatorComponent,
        SlidesComponent,
        ScrollDirective,
        BarChartComponent,
        SlidesListComponent,
        ForceDirectedGraphComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        NgReduxModule,
        NgReduxRouterModule,
        APP_ROUTES,
        Angular2FontAwesomeModule,
        MaterialModule.forRoot(),
        Ng2PageScrollModule.forRoot(),
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot()

    ],
    providers: [
        OverlayContainer,
        AuthInterceptor,
        SessionActions,
        SessionEpics,
        UsersService
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
