import {Injectable} from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import { select } from '@angular-redux/store';

@Injectable()
export class InterceptedHttp extends Http {
  @select(['session', 'token']) Token$: Observable<boolean>;
     token=null;
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
        this.Token$.subscribe(token => {
          this.token= token;
         })
       }
 
     request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
       return super.request(url, options);
     }
 
     get(url: string, options?: RequestOptionsArgs): Observable<Response> {
       return super.get(url, this.getRequestOptionArgs(options));
     }
 
     post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
         return super.post(url, body, this.getRequestOptionArgs(options));
     }
     test(){}
     put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
         return super.put(url, body, this.getRequestOptionArgs(options));
     }
 
     delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
         return super.delete(url, this.getRequestOptionArgs(options));
     }
     private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
         if (options == null) {
             options = new RequestOptions();
         }
         if (options.headers == null) {
             options.headers = new Headers();
         }
         options.headers.append('Content-Type', 'application/json');
         options.headers.append('Authorization','JWT ' + this.token);
         console.log('token', this.token);
         return options;
       }
 }