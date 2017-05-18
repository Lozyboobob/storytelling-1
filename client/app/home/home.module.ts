import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// MATERIAL DESIGN MODULES
import { MaterialModule, OverlayContainer } from '@angular/material';
import { HOME_ROUTES } from './index';

// HOME COMPONENT
import { HomeComponent } from './index';
import { HomeConfig } from './index';
import { FilterComponent, SlidesListComponent, SearchComponent } from '../slides/components';
import { SlidesModule } from '../slides/slides.module';
export function homeFactory(config: HomeConfig) {
    return () => config.addMenu();
}

@NgModule({
    imports: [
        HOME_ROUTES,
        FormsModule,
        MaterialModule.forRoot(),
        CommonModule,
        SlidesModule
    ],
    declarations: [
        HomeComponent,
        //FilterComponent,
        //SlidesListComponent,
        //SearchComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [HomeConfig, OverlayContainer,
        { provide: APP_INITIALIZER, useFactory: homeFactory, deps: [HomeConfig], multi: true }
    ],

})
export class HomeModule { }
