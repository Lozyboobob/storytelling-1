import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { SlidesSetting } from '../../models/slides-setting';
@Component({
    selector: 'app-slides-setting',
    templateUrl: './slides-setting.component.html',
    styleUrls: ['./slides-setting.component.scss']
})
export class SlidesSettingComponent implements OnInit {
    @Input() SlidesSettingIpt: SlidesSetting;
    @Output() onSettingChange: EventEmitter<SlidesSetting> = new EventEmitter();
    @Output() onValidated = new EventEmitter();
    form: FormGroup;
    slidesSetting: SlidesSetting;
    constructor(private _fb: FormBuilder) {
        this.form = this._buildForm();
    }

    ngOnInit() {
        if (this.SlidesSettingIpt)
            this.slidesSetting = this.SlidesSettingIpt;
        else this.slidesSetting = new SlidesSetting();

    }

    private _buildForm() {
        return this._fb.group({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.nullValidator),
            tag: new FormControl('', Validators.nullValidator)
        });
    }
    titleChange(title) {
        this.slidesSetting.title = title;
        this.onSettingChange.emit(this.slidesSetting);
        if (this.form.valid) this.onValidated.emit();
    }
    descriptionChange(description) {
        this.slidesSetting.description = description;
        this.onSettingChange.emit(this.slidesSetting);
        if (this.form.valid) this.onValidated.emit();
    }
    /* add tages for slides*/
    addTag() {
        this.slidesSetting.tags.push(this.form.value.tag);
        this.onSettingChange.emit(this.slidesSetting);
        this.form.controls.tag.reset();
    }
    /* set banner image*/
    setBanner(path) {
        this.slidesSetting.bannerPath = path;
        this.onSettingChange.emit(this.slidesSetting);
    }
}
