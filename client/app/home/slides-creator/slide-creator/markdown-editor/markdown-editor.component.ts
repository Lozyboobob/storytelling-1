import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
/*use simpleMDE in javascript way, waiting for angular2 version*/
declare let require: any;
let SimpleMDE = require('simplemde/dist/simplemde.min.js');
@Component({
    selector: 'app-markdown-editor',
    templateUrl: './markdown-editor.component.html',
    styleUrls: ['./markdown-editor.component.scss']
})
export class MarkdownEditorComponent implements OnInit, AfterViewInit {
  mde:any;
    @ViewChild('simplemde') textarea: ElementRef;
    constructor() { }

    ngOnInit() {
    }
    ngAfterViewInit() {
        this.mde = new SimpleMDE({ element: this.textarea.nativeElement.value });
    }
    getValue(){
      let value=this.mde.value();
      console.log(value);
    }
}
