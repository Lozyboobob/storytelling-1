import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Component({
    selector: 'app-element-text',
    templateUrl: './element-text.component.html',
    styleUrls: ['./element-text.component.scss']
})

export class ElementTextComponent implements OnInit {
    private state$: BehaviorSubject<string>;
    @Output() deleteEleOpt=new EventEmitter();
    readonly STATE_OPTION= {
        undo: "UNDO",
        done: "DONE"
    }
    constructor() {
      this.state$ =new BehaviorSubject<string>(this.STATE_OPTION.undo);
    }

    ngOnInit() {

    }
    public to_undo(){
      this.state$.next(this.STATE_OPTION.undo);
    }
    public to_done(){
      this.state$.next(this.STATE_OPTION.done);
    }
    private delete(){
      this.deleteEleOpt.emit();
    }

}
