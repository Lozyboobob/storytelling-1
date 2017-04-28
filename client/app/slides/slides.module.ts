
import { NgModule,CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL DESIGN MODULES
import { MaterialModule, OverlayContainer, TooltipPosition } from '@angular/material';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';

// SLIDES COMPONENTS
import { SlidesPresentationComponent, SlidesListComponent,SlidesCreatorComponent } from '.';

// SLIDES SERVICES
import {SlidesService} from '.';

// SLIDES ROUTES MODULE
import { SlidesRoutingModule } from ".";




import { ScrollDirective } from './components/slides-presentation/scroll.directive';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { BarChartComponent } from '../charts';
import { ForceDirectedGraphComponent } from '../charts/force-directed-graph/force-directed-graph.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { JsonValidatorDirective } from './components/slides-creator/json-validator.directive';
import { LineChartComponent } from '../charts/line-chart/line-chart.component';
import { CsvInputComponent } from './components/slides-creator/slide-creator/csv-input/csv-input.component';
import { ImageUploadComponent } from './components/slides-creator/slide-creator/image-upload/image-upload.component';




@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SlidesRoutingModule,
    Ng2PageScrollModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  declarations: [
    SlidesPresentationComponent,
    SlidesListComponent,
    SlidesCreatorComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [OverlayContainer,SlidesService],

})
export class SlidesModule {
}
