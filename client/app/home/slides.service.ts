import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { Slides } from './models/index';

@Injectable()
export class SlidesService {
    private _baseUrl: string;
    private slides: any = {}

    private progress$;
    private progressObserver;
    private progress;
    constructor(private http: Http) {
        this.progress$ = Observable.create(observer => {
            this.progressObserver = observer;
        }).share();
        this._baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            this._baseUrl += `:${environment.backend.port}`;
        }
    }

    submitSlides(slides: Slides): Observable<any> {
        const backendURL = `${this._baseUrl}${environment.backend.endpoints.slides}` ;
        return this.http.post(backendURL, slides, this.jwt()).map((response: Response) => response.json());
    }
    getSlidesList(): Observable<any> {
        const backendURL = `${this._baseUrl}${environment.backend.endpoints.slides}`;
        return this.http.get(backendURL, this.jwt()).map((response: Response) => response.json());
    }
    getSlides(id): Observable<any> {
        const backendURL = `${this._baseUrl}${environment.backend.endpoints.slides}/${id}`;
        return this.http.get(backendURL, this.jwt()).map((response: Response) => response.json());
    }
    uploadImage(img: File): Observable<any> {
        return Observable.create(observer => {
            const backendURL = `${this._baseUrl}${environment.backend.endpoints.imagesServer}`;

            let xhr: XMLHttpRequest = new XMLHttpRequest();
            let formData: any = new FormData();
            console.log("formdata", formData.entries());
            formData.append('file', img);
            console.log("formdata", formData);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
              //  this.progressObserver.next(this.progress);
            };

            xhr.open('POST', backendURL, true);
            xhr.send(formData);
        });
    }
    getImage(id): Observable<any> {
        const backendURL = `${this._baseUrl}${environment.backend.endpoints.images}/${id}`;
        return this.http.get(backendURL, this.jwt()).map((response: Response) => response.json());
    }
    updateSlide(slide, id): Observable<any> {
        const backendURL = `${this._baseUrl}${environment.backend.endpoints.slides}/${id}`;
        return this.http.put(backendURL, slide, this.jwt()).map((response: Response) => response.json());
    }
    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
    private jwt4img() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({
                'Authorization': 'Bearer ' + currentUser.token,
                'Content-Type': 'multipart/form-data'
            });
            return new RequestOptions({ headers: headers });
        }
    }

}
