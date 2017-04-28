import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import { Response, Http, Headers} from "@angular/http";
import { Observable, BehaviorSubject } from "rxjs/Rx";
import { NgRedux, select } from '@angular-redux/store';
import { HttpInterceptorService, getHttpHeadersOrInit } from "ng-http-interceptor";
import { IAppState, SessionActions } from 'app/core';

@Injectable()
export class HttpInterceptableService {

  @select(['session', 'token']) Token$: Observable<string> ;
  private token: string = null;

  constructor( private httpInterceptor: HttpInterceptorService, private ngRedux: NgRedux<IAppState>, 
                  private router: Router, private actions: SessionActions ) {
    this.actions = actions;
    this.router = router;
    this.Token$.subscribe(token => {
      this.token= token;
    });

    httpInterceptor.request().addInterceptor((data, method) => {
      let headers = getHttpHeadersOrInit(data, method);
      headers.append('Content-Type', 'application/json');
      if(this.token != null) 
        headers.append('Authorization','JWT '+ this.token);
      return data;
    });

    httpInterceptor.response().addInterceptor((res, method) => {
      return res.catch<Response, Response>(err => 
            this.handelErrorResponse(err, actions, router)
        );
    });
  }

  private handelErrorResponse( error: any, actions: SessionActions, router: Router ) : Observable<any> {
    switch (error.status) {
      case 400:
        this.router.navigate(['/bad-request']);
        return Observable.of() ;
      case 401:
        this.actions.logoutUser();
        this.router.navigate(['/']);
        return Observable.of() ;
      case 404:
        this.router.navigate(['/not-found']);
        return Observable.of() ;
    }
    return Observable.of(error);
  }

 }