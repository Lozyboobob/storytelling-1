import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewChildren, OnChanges, ComponentFactoryResolver, ViewContainerRef, QueryList } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray  } from '@angular/forms';
import {ValidService} from '../../../../services/valid.service';
import { DragulaService } from 'ng2-dragula';
import { environment } from '../../../../../../environments/environment';
import * as slideOption from './slideOption';

import { Slide } from '../../../../models/slide';
import {TextBuilderComponent} from './text-builder/text-builder.component';
import {ElementTextComponent} from './slide-elements-type/element-text/element-text.component';
@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.scss'],
    providers: []
})

export class SlideComponent implements OnInit, OnChanges {

    @Output() confirmSlideOpt: EventEmitter<Object> = new EventEmitter();
    @Output() deleteSlideOpt: EventEmitter<number> = new EventEmitter();
    @Input() slideIndex: number;
    @Input() slideSetting: Slide;
    @Input() slideOpendIndex: number;
    @Output() openSlideIndex: EventEmitter<number> = new EventEmitter();

    showForm = true; // indicator for showing slide setting
    @Input() isInShuffle: boolean;
    slide: Slide = new Slide();
    form: FormGroup = this._buildForm();
    graphs: Array<any>;
    pageLayout: Array<any>;
    titleAlign: Array<string>;
    dataBuilder: any = {};
    editorOptions: Object;
    @ViewChild('dataInput') dataInputTab;
    @ViewChild('graphSelector') graphSelector;
    csvJson: any = [];
    curTab = 0;
    dragTransition = {
        drag: 0,
        drop: 0
    };
    //new builder
    @ViewChildren('elementContainer', { read: ViewContainerRef }) eleContainer: QueryList<ViewContainerRef>;
    slideGrid: Array<any> = [];
    constructor(private _fb: FormBuilder, private dragulaService: DragulaService, private validService: ValidService,
        private _componentFactoryResolver: ComponentFactoryResolver) {
        dragulaService.setOptions('element-bag', {
            accepts: function(el, target, source, sibling) {
                //  console.log(el,target.getAttribute('name'),source,sibling);
                if (target.getAttribute('name') === 'slide-col') return true;
                else return false; // elements can be dropped in any of the `containers` by default
            },
            copy: function(el, source) {
                return source.getAttribute('name') === 'selection-panel';
            },
            //copySortSource: true,             // elements in copy-source containers can be reordered
            revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
            //removeOnSpill: true,              // spilling will `.remove` the element, if this is true
        });
        dragulaService.drag.subscribe(value => {
            //  this.onDrag(value.slice(1));

        });

        dragulaService.drop.subscribe((value: any) => {
            //  this.onDrop(value.slice(1));

            let el = value[1];
            let target = value[2];
            let source = value[3];
            console.log(this.eleContainer.toArray()[0]);
            if (source.getAttribute('name') === "selection-panel" && target.getAttribute('name') === "slide-col") {
                //remove the element icon node
                target.removeChild(el);
                //add real element node
                const colIndex = target.getAttribute('id').split('-')[2];
                const factory = this._componentFactoryResolver.resolveComponentFactory(ElementTextComponent);
                const eleRef = this.eleContainer.toArray()[colIndex].createComponent(factory);
                eleRef.instance.to_undo();
                eleRef.changeDetectorRef.detectChanges();

            }
        });
        dragulaService.over.subscribe((value: any) => {
            //this.onOver(value.slice(1));

        });
        dragulaService.cancel.subscribe((value: any) => {
            //this.onOver(value.slice(1));

        });
        dragulaService.out.subscribe((value: any) => {
            //this.onOut(value.slice(1));

        });
    }
    ngOnInit() {
        if (!this.slide.pageTitle.title) {
            this.slide.pageTitle.title = '';
        }
        this.titleAlign = slideOption.titleAlign;
        this.graphs = slideOption.graphType;
        this.pageLayout = slideOption.pageLayoutOption;
        // set server path
        let baseURL = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseURL += `:${environment.backend.port}`;
        };
        this.editorOptions = {
            heightMin: 200,
            heightMax: 400,
            charCounterMax: 1000,
            toolbarSticky: false,
            imageUploadURL: `${baseURL}${environment.backend.endpoints.imagesServer}`,
            imageManagerLoadURL: `${baseURL}${environment.backend.endpoints.imagesServer}`
        };
    }

    ngOnChanges() {

        if (this.slideSetting) {
            this.slide = this.slideSetting;
        }
        if (this.slideIndex) {
            this.slide.index = this.slideIndex;
        }
        this.form = this._buildForm();
        this.validService.changeSlideValid(this.form.valid, this.slideIndex);
        this.form.valueChanges.subscribe(data => {
            this.validService.changeSlideValid(this.form.valid, this.slideIndex);
        });
        this.graphChanged();
        this.showForm = this.slideIndex === this.slideOpendIndex;
    }
    private _buildForm() {
        return this._fb.group({
            pageTitle: new FormControl(this.slide.pageTitle.title, Validators.nullValidator),
            titleAlign: new FormControl(this.slide.pageTitle.align, Validators.nullValidator),
            slideText: new FormControl(this.slide.text, Validators.nullValidator),
            slideGraph: new FormControl(this.slide.graph, Validators.nullValidator),
            graphData: this._fb.array([
                this.initData(),
            ])
        });
    }
    /* functions for shuffle slides drop down operation */
    /*    private hasClass(el: any, name: string): any {
            return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
        }

        private addClass(el: any, name: string): void {
            if (!this.hasClass(el, name)) {
                el.className = el.className ? [el.className, name].join(' ') : name;
            }
        }

        private removeClass(el: any, name: string): void {
            if (this.hasClass(el, name)) {
                el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
            }
        }

        private onDrag(args: any): void {
            let [el] = args;
            let index = [].slice.call(el.parentElement.children).indexOf(el);
            this.dragTransition.drag = index;
            this.removeClass(el, 'ex-moved');
        }

        private onDrop(args: any): void {
            let [el] = args;
            let index = [].slice.call(el.parentElement.children).indexOf(el)
            this.dragTransition.drop = index;
            this.addClass(el, 'ex-moved');
        }

        private onOver(args: any): void {
            let [el] = args;
            this.addClass(el, 'ex-over');
        }

        private onOut(args: any): void {
            let [el] = args;
            this.removeClass(el, 'ex-over');
        }
    */
    /* toggle the slideSetting*/
    toggleForm() {
        this.slideOpendIndex = null;
        this.showForm = !this.showForm;
        if (this.showForm) {
            this.openSlideIndex.emit(this.slideIndex);
        }
    }
    validChildForm(isValid) {
        this.validService.changeSlideValid(isValid, this.slideIndex);
    }

    confirmSlide(isValid) {
        /* to decide which data to take from tab*/
        if (this.slide.hasGraph) {
            if (this.dataBuilder.chartOptions.chartType
                && this.dataBuilder.chartOptions.chartType.cmpName != null) {
                this.slide.graph = this.dataBuilder.chartOptions.chartType.cmpName;
            } else {
                this.slide.graph = 'ngGraph';
            }
            this.slide.data = this.dataBuilder.data;
            this.slide.config = this.dataBuilder.chartOptions;
        } else {
            this.slide.graph = 'noGraph';
        }
        if (!this.slide.hasText) {
            this.slide.text = '';
        }
        if (this.slideIndex) {
            this.slide.index = this.slideIndex;
        }
        this.slide.pageTitle.title = this.form.value.pageTitle;
        this.slide.pageTitle.align = this.form.value.titleAlign;
        this.csvJson = [];
    }

    confirmeSlideGRaphConfig(data) {
        this.dataBuilder.data = data.data;
        this.dataBuilder.chartOptions = data.chartOptions;
    }

    deleteSlide(e) {
        this.deleteSlideOpt.emit(this.slideIndex);
    }
    initData() {
        let dataForm = {
            index: [''],
            value: ['', Validators.pattern('^[0-9]*$')]
        };
        return this._fb.group(dataForm);
    }
    addData() {
        const control = <FormArray>this.form.controls['graphData'];
        control.push(this.initData());
    }
    /* when change graph*/
    graphChanged() {
        // change json sample
        // if the slide data is already set
        if (this.slide.data !== undefined) {
            if (this.slide.data.length && this.form.value.slideGraph == this.slide.graph) {
                // if has data, set tab to json
                this.curTab = 0;
                let data = { 'graphData': this.slide.data };
                return;
            }
        }
    }
    pageLayoutChange(value) {
        switch (value) {
            case 'FullScreenGraph':
                this.slide.hasGraph = true;
                this.slide.hasText = false;
                break;
            case 'textInCenter': this.slide.hasGraph = false; this.slide.hasText = true; break;
            case 'textInCenterImageBackground': this.slide.hasGraph = false; this.slide.hasText = true; break;
            case 'LeftGraphRightText': this.slide.hasGraph = true; this.slide.hasText = true; break;
            case 'LeftTextRightGraph': this.slide.hasGraph = true; this.slide.hasText = true; break;
            default: break;
        }
        this.slide.pageLayout = value;
    }
    textAlignChange(value) {
        this.slide.textVerAlign = value;
    }
    /* image background*/
    setImageHtml(image) {
        this.slide.slideImage = image;
    }
    /* sort and group series of json data*/
    sortSeries(data) {
        let newJson = [];
        let series = [];
        let isInSeries = (name) => {
            let index = -1;
            for (let i = 0; i < series.length; i++) {

                if (name === series[i]) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        data.forEach(obj => {
            const seriesIndex = isInSeries(obj['series']);
            if (seriesIndex !== -1) {
                /* add to series */
                newJson[seriesIndex].push(obj);
            } else {
                /* create new series */
                series.push(obj['series']);
                const newSeries: Array<any> = [];
                newSeries.push(obj);
                newJson.push(newSeries);
            }
        });
        return newJson;
    }
}
