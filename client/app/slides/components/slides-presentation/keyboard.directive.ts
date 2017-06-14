import { Directive, HostListener, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from "rxjs";
@Directive({
    selector: '[appKeyboard]'
})
export class KeyboardDirective implements OnInit {

    @Output() keyUp = new EventEmitter();
    @Output() keyDown = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        let events = Observable.fromEvent(window, 'keydown', (e) => e);

        events.subscribe(e => {
            e = e || window.event;

            if (e.keyCode == '38') {
                this.keyUpFunc(e);
            }
            else if (e.keyCode == '40') {
                this.keyDownFunc(e);
            }
            else if (e.keyCode == '37') {
                // left arrow
            }
            else if (e.keyCode == '39') {
                // right arrow
            }
        });
    }
    // @HostListener('mousewheel', ['$event']) private onMouseWheelChrome(event: any) {
    //     console.log('event => ', event); Observable.of(event).do(console.log).debounceTime(30).map(this.mouseWheelFunc); this.mouseWheelFunc(event);
    // }
    // @HostListener('DOMMouseScroll', ['$event']) private onMouseWheelFirefox(event: any) { this.mouseWheelFunc(event); }
    // @HostListener('onmousewheel', ['$event']) private onMouseWheelIE(event: any) { this.mouseWheelFunc(event); }

    private keyUpFunc(event: any) {
        console.log("up");
        this.keyUp.emit();
    }
    private keyDownFunc(event: any) {
        console.log("down");
        this.keyDown.emit();
    }
}
