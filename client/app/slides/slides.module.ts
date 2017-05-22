
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL DESIGN MODULES
import { MaterialModule, OverlayContainer, TooltipPosition } from '@angular/material';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {XHRBackend, Http, RequestOptions} from '@angular/http';
import {SearchComponent} from './components/search/search.component';
// SLIDES COMPONENTS
import { SlidesPresentationComponent, 
    FullScreenGraphSlideComponent,
    TitleSlideComponent,
    GraphTextSlideComponent,
    TextSlideComponent,
    SlidesListComponent, 
    SlidesCreatorComponent, 
    SlideCreatorComponent 
} from '.';

// SLIDES SERVICES
import {SlidesService,ValidService, ChartsService} from '.';

// SLIDES ROUTES MODULE
import { SlidesRoutingModule } from '.';
import { CoreModule } from "app/core";
import { FileUploadModule } from 'ng2-file-upload';




import { ScrollDirective } from './components/slides-presentation/scroll.directive';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import {DragulaModule} from 'ng2-dragula';
import { BarChartComponent } from '../charts';
import { ForceDirectedGraphComponent } from '../charts/force-directed-graph/force-directed-graph.component';
import { LineChartComponent } from '../charts/line-chart/line-chart.component';
import { TreemapChartComponent } from '../charts/treemap-chart/treemap-chart.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';


import { CsvInputComponent } from './components/editor/slide-creator/csv-input/csv-input.component';
import { ImageUploadComponent } from './components/editor/slide-creator/image-upload/image-upload.component';

import { SlidesEditorComponent } from './components/slides-editor/slides-editor.component';
import { SlidesSettingComponent } from './components/editor/slides-setting/slides-setting.component';
import { EditorComponent } from './components/editor/editor.component';

import { FilterComponent } from './components/filter/filter.component';
import { SlidesManagerComponent } from './components/slides-manager/slides-manager.component';



@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SlidesRoutingModule,
        DragulaModule,
        Ng2PageScrollModule.forRoot(),
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        FileUploadModule
    ],
    entryComponents: [BarChartComponent, LineChartComponent, ForceDirectedGraphComponent,TreemapChartComponent, FullScreenGraphSlideComponent],
    declarations: [
        ScrollDirective,
        SlidesPresentationComponent,
        SlidesListComponent,
        SlidesCreatorComponent,
        SlideCreatorComponent,
        CsvInputComponent,
        ImageUploadComponent,
        SearchComponent,
        BarChartComponent,
        ForceDirectedGraphComponent,
        LineChartComponent,
        TreemapChartComponent,
        SlidesEditorComponent,
        SlidesSettingComponent,
        EditorComponent,
        FilterComponent,
        SlidesManagerComponent,
        FullScreenGraphSlideComponent,
        TitleSlideComponent,
        GraphTextSlideComponent,
        TextSlideComponent,
    ],
    exports:[
      FilterComponent,
      SlidesListComponent,
      SearchComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [OverlayContainer, SlidesService, ChartsService]

})
export class SlidesModule {
}
