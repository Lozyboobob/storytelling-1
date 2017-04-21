import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ToggleNavService {
    private toggled:boolean = true;
    private subject = new Subject<any>();
    constructor()  {
  }
    toggle(): Observable<any> {
      console.log("observed");
      this.toggled=!this.toggled;
      this.subject.next(this.toggled);
       return this.subject.asObservable();
    }
}
