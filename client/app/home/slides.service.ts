import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";

import { Slides } from './models/index';

@Injectable()
export class SlidesService {
    private _baseUrl: string;
    private slides: any = {}

    constructor(private http: Http) {
    }

    submitSlides(slides: Slides): Observable<any> {
        let backendURL = 'http://127.0.0.1:3000/api/slides';
        //http://127.0.0.1:3000/api/slides
        console.log(slides);
        return this.http.post(backendURL, slides, this.jwt()).map((response: Response) => response.json());
    }
    getSlidesList(): Observable<any> {
        let backendURL = 'http://127.0.0.1:3000/api/slides';
        //http://127.0.0.1:3000/api/slides
        return this.http.get(backendURL, this.jwt()).map((response: Response) => response.json());
    }
    getSlides(id): Observable<any> {
        let backendURL = 'http://127.0.0.1:3000/api/slides/'+id;
        //http://127.0.0.1:3000/api/slides
        return this.http.get(backendURL, this.jwt()).map((response: Response) => response.json());
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
