import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from "rxjs";

import { User } from '../models/index';
import { environment } from "../../../environments/environment";

@Injectable()
export class UsersService {
    private _baseUrl : string;

    constructor(private http: Http) {
       // build backend base url
        this._baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            this._baseUrl += `:${environment.backend.port}`;
        }
    }


    signup(user: User): Observable<any> {
        let backendURL = `${this._baseUrl}${environment.backend.endpoints.signup}` ;
        console.log(backendURL);
        console.log('this._baseUrl',this._baseUrl);
        return this.http.post(backendURL, user, this.jwt()).map((response: Response) => response.json());
    }


    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        console.log("getcurrenUser");
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
