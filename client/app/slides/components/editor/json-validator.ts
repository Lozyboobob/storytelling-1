
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';


export function JsonValidator(): ValidatorFn {
    return (control: AbstractControl) => {
        try {
            // parse it to json
            JSON.parse(control.value);
        } catch (e) {
            console.log("error");
            // set parse error if it fails
            return { 'validate': false }
        }
        return null;
    }

}
