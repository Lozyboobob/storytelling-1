import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Component({
    selector: 'app-element-text',
    templateUrl: './element-text.component.html',
    styleUrls: ['./element-text.component.scss']
})

export class ElementTextComponent implements OnInit {
    private state$: BehaviorSubject<string>;
    readonly STATE_OPTION= {
        init: "INITIAL",
        undo: "UNDO",
        done: "DONE"
    }
    constructor() {
      console.log("dddddddddddd");
      this.state$ =new BehaviorSubject<string>(this.STATE_OPTION.init);
    }

    ngOnInit() {

    }
    public to_undo(){
      this.state$.next(this.STATE_OPTION.undo);
    }
    public to_done(){
      console.log("todone")
      this.state$.next(this.STATE_OPTION.done);
    }

}
