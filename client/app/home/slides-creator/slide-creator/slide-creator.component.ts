import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray  } from '@angular/forms';

import {MdDialog, MdDialogRef} from '@angular/material';
import {SelectGraphComponent } from './select-graph/select-graph.component'
@Component({
    selector: 'app-slide-creator',
    templateUrl: './slide-creator.component.html',
    styleUrls: ['./slide-creator.component.scss']
})
export class SlideCreatorComponent implements OnInit {
    @Output() confirmSlideOpt: EventEmitter<Object> = new EventEmitter();
    form: FormGroup;
    slide: any = {};
    graphs: Array<any> = [
        {
            value: "barChart",
            type: "Bar Chart"
        }, {
            value: "forceDirectedGraph",
            type: "Force Directed Graph"
        }];
    dataExample: any
    @ViewChild("dataInput") dataInputTab;
    @ViewChild("graphSelector") graphSelector;
    constructor(
        public dialog: MdDialog,
        private cdRef: ChangeDetectorRef,
        private _fb: FormBuilder
    ) { }

    ngOnInit() {
        this.form = this._buildForm();
    }
    private _buildForm() {
        return this._fb.group({
            slideSubTitle: new FormControl('', Validators.nullValidator),
            slideText: new FormControl('', Validators.nullValidator),
            slideGraph: new FormControl('', Validators.nullValidator),
            graphDataJson: new FormControl('', Validators.nullValidator),
            graphData: this._fb.array([
                this.initData(),
            ])
        });
    }
    confirmSlide() {
        /* to decide which data to take from tab*/
        switch (this.dataInputTab.selectedIndex) {
            case 0: { this.slide.data = this.form.value.graphData; break; }
            case 1: {
                let data;
                try {
                    data = JSON.parse(this.dataExample);
                    console.log(data);
                    this.slide.data = data.graphData;
                }
                catch (e) {
                    console.log("data format invalidate!!!!!");
                }
                break;
            }
            default: this.slide.data = '';
        }
        console.log(this.dataInputTab.selectedIndex == "0", this.slide.data);
        this.slide.graph = this.form.value.slideGraph;
        this.slide.subTitle = this.form.value.slideSubTitle;
        console.log("confirm slide:", this.slide);
        this.confirmSlideOpt.emit(this.slide);
        this.form = this._buildForm();
        this.slide.graph = "";
        console.log(this.form);
    }
    openDialog() {
        let dialogRef = this.dialog.open(SelectGraphComponent);
        dialogRef.afterClosed().subscribe(result => {
            //  this.selectedOption = result;
        });
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
        console.log(this.form.value);
    }
    graphChange() {
        switch (this.form.value.slideGraph) {
            case "barChart": this.dataExample = barCharDataExample; break;
            case "forceDirectedGraph": this.dataExample = forceDirectedGraphDataExample; break
            default: this.dataExample = "";
        }
    }


}
const barCharDataExample = '{"graphData":[{"index":"index1","value":"value1"},{"index":"index2","value":"value2"}]}';
const forceDirectedGraphDataExample = ''
