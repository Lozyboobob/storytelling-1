
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL DESIGN MODULES
import { MaterialModule, OverlayContainer, TooltipPosition } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {XHRBackend, Http, RequestOptions} from '@angular/http';

// NGX-CHARTS MODULE
import { PieChartModule, GaugeModule, NgxChartsModule } from '@swimlane/ngx-charts';
import { CodemirrorModule } from 'ng2-codemirror';



import {SearchComponent} from './components/search/search.component';
// SLIDES COMPONENTS
import { SlidesPresentationComponent,
    FullScreenGraphSlideComponent,
    TitleSlideComponent,
    LeftGraphRightTextSlideComponent,
    RightGraphLeftTextSlideComponent,
    TextSlideComponent,
    SlidesCreatorComponent,
    SlideCreatorComponent
} from '.';

// SLIDES SERVICES
import {SlidesService, ValidService, ChartsService} from '.';

// SLIDES ROUTES MODULE
import { SlidesRoutingModule } from '.';
import { CoreModule } from 'app/core';
import { FileUploadModule } from 'ng2-file-upload';
import { FlexLayoutModule } from '@angular/flex-layout';


import { ScrollDirective } from './components/slides-presentation/scroll.directive';
import { KeySwitchDirective } from './components/slides-presentation/key-switch.directive';

import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { DragulaModule } from 'ng2-dragula';
import { BarChartComponent } from '../charts';
import { GaugeChartComponent } from '../charts';
import { NgGraphComponent } from "../charts";
import { HierarchicalEdgeBundlingComponent } from '../charts/hierarchical-edge-bundling/hierarchical-edge-bundling.component';

import { AdvancedPieChartComponent } from '../charts';
import { ForceDirectedGraphComponent } from '../charts/force-directed-graph/force-directed-graph.component';
import { LineChartComponent } from '../charts/line-chart/line-chart.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { DendogramComponent } from '../charts/dendogram/dendogram.component';
import { PieChartComponent } from '../charts/pie-chart/pie-chart.component';


import { CsvInputComponent } from './components/editor/slide-creator/csv-input/csv-input.component';
import { ImageUploadComponent } from './components/editor/slide-creator/image-upload/image-upload.component';

import { SlidesEditorComponent } from './components/slides-editor/slides-editor.component';
import { SlidesSettingComponent } from './components/editor/slides-setting/slides-setting.component';
import { ChartsBuilderComponent, CodeEditorComponent } from "./components/editor/charts-builder";
import { EditorComponent } from './components/editor/editor.component';

import { PrezManagerComponent } from './components/prez-manager/prez-manager.component';
import { SlidesCardComponent } from './components/slides-card/slides-card.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ToggleFullscreenDirective } from './components/slides-presentation/toggle-fullscreen.directive';



@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        SlidesRoutingModule,
        DragulaModule,
        PieChartModule,
        GaugeModule,
        NgxChartsModule,
        CodemirrorModule,
        FlexLayoutModule,
        Ng2PageScrollModule.forRoot(),
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        FileUploadModule
    ],
    entryComponents: [
        BarChartComponent,
        LineChartComponent,
        ForceDirectedGraphComponent,
        HierarchicalEdgeBundlingComponent,
        PieChartComponent,
        FullScreenGraphSlideComponent,
        GaugeChartComponent,
        AdvancedPieChartComponent,
        DialogComponent,
        DendogramComponent,
        NgGraphComponent],
    declarations: [
        ScrollDirective,
        KeySwitchDirective,
        SlidesPresentationComponent,
        SlidesCreatorComponent,
        SlideCreatorComponent,
        CsvInputComponent,
        ImageUploadComponent,
        SearchComponent,
        BarChartComponent,
        ForceDirectedGraphComponent,
        LineChartComponent,
        SlidesEditorComponent,
        SlidesSettingComponent,
        CodeEditorComponent,
        ChartsBuilderComponent,
        EditorComponent,
        PrezManagerComponent,
        FullScreenGraphSlideComponent,
        GaugeChartComponent,
        AdvancedPieChartComponent,
        TitleSlideComponent,
        LeftGraphRightTextSlideComponent,
        RightGraphLeftTextSlideComponent,
        TextSlideComponent,
        PieChartComponent,
        SlidesCardComponent,
        HierarchicalEdgeBundlingComponent,
        DialogComponent,
        NgGraphComponent,
        DendogramComponent,
        KeySwitchDirective,
        ToggleFullscreenDirective
    ],
    exports:[
      SlidesCardComponent,
      SearchComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [OverlayContainer, SlidesService, ChartsService]

})
export class SlidesModule {
}
