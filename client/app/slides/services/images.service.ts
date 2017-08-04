import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
@Injectable()
export class ImagesService {
    private _baseUrl: string;
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
        };
    }

    getImage(id): Observable<any> {
        const backendURL = `${this._baseUrl}${environment.backend.endpoints.images}/${id}`;
        return this.http.get(backendURL).map((response: Response) => response.json());
    }

}
