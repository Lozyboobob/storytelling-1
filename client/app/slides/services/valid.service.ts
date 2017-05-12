import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ValidService {
    validAllSource = new BehaviorSubject<boolean>(false);
    validAll$ = this.validAllSource.asObservable();
    //validation for all page of slide
    validSlideSource = new BehaviorSubject<boolean>(false);
    validSlide$ = this.validAllSource.asObservable();
    validSlide:boolean=false;
    //validation for slides setting
    validSettingSource = new BehaviorSubject<boolean>(false);
    validSetting$ = this.validSettingSource.asObservable();
    validSetting:boolean=false;
    //record the validation for all page of slides
    unvalidSlideList: Array<boolean> = [];
    constructor() {
      console.log("constr");
    }
    changeValidStatus() {
        console.log(this.validSlide, this.validSetting)
        if (this.validSlide && this.validSetting) {

            this.validAllSource.next(true);
        }
        else {
            this.validAllSource.next(false);
        }
    }
    changeSlideValid(status, index) {
        /* set the unvalid slide list*/
        let find = false;
        let find_index = 0;
        this.unvalidSlideList.forEach((l, i) => {
            if (index == l) {
                find = true;
                find_index = i;
            }
        })
        if (status == false) {

            if (!find) this.unvalidSlideList.push(index);
        }
        else {
            if (find) this.unvalidSlideList.splice(find_index, 1);
        }
        /* check the valid for all pages*/
        if (this.unvalidSlideList.length)
            {
              this.validSlide=false;
              this.validSlideSource.next(false);
            }
        else {
          this.validSlide=true;
          this.validSlideSource.next(true);
        }
        this.changeValidStatus();
        console.log("slide value",  this.unvalidSlideList,this.validSlide);
    }
    changeSettingValid(status) {
        this.validSettingSource.next(status);
        this.validSetting=status;
        this.changeValidStatus();
    }
}
