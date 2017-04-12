import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
    selector: 'app-select-graph',
    templateUrl: './select-graph.component.html',
    styleUrls: ['./select-graph.component.scss']
})
export class SelectGraphComponent implements OnInit {
    form: FormGroup;
    constructor(public dialogRef: MdDialogRef<SelectGraphComponent>) {

    }

    ngOnInit() {
        this.form = this._buildForm();
    }
    private _buildForm() {
        return new FormGroup({
            slideText: new FormControl('', Validators.nullValidator)
        });
    }
}
