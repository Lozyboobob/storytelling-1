import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';


export function JsonValidator(): ValidatorFn {
    return (control: AbstractControl) => {
        try {
            // parse it to json
            JSON.parse(control.value);
            console.log("parsing",control.value);
        } catch (e) {
            console.log("error");
            // set parse error if it fails
            return { 'validate': false }
        }
        console.log("validated");
        return null;
    }

}



@Directive({
    selector: '[appJsonValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: JsonValidatorDirective, multi: true }]
})
export class JsonValidatorDirective implements Validator, OnChanges {
    private valFn = Validators.nullValidator;
    constructor() {
        /*    this.validator = () => {
                return (c: AbstractControl) => {
                    try {
                        // parse it to json
                        JSON.parse(c.value);
                    } catch (e) {
                        console.log("error");
                        // set parse error if it fails
                        return {
                                valid: false
                        }
                    }
                    console.log("validated");
                    return null;
                }
            }*/
        console.log("here");

    }

    ngOnChanges(changes: SimpleChanges): void {
        /*const change = changes['forbiddenName'];
        if (change) {
            const val: string | RegExp = change.currentValue;
            const re = val instanceof RegExp ? val : new RegExp(val, 'i');
            this.valFn = forbiddenNameValidator(re);
        } else {
            this.valFn = Validators.nullValidator;
        }*/
        console.log("changed", changes);
        //this.valFn = Validators.nullValidator;
    }
    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }

}
