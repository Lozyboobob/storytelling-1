import { Injectable } from '@angular/core';
import {
  Http,
  Response
} from '@angular/http';
import { IPayloadAction, SessionActions } from '../actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import { Action } from 'redux';
import { environment } from "../../../environments/environment";


@Injectable()
export class SessionEpics {
  _baseUrl : string ;
  constructor(private http: Http) {
              this._baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            this._baseUrl += `:${environment.backend.port}`;
        }
  }

  login = (action$: Observable<IPayloadAction>) => {
    return action$
      .filter<IPayloadAction>(({ type }) => type === SessionActions.LOGIN_USER)
      .mergeMap<IPayloadAction, IPayloadAction>(({ payload }) => {
        let backendURL = `${this._baseUrl}${environment.backend.endpoints.signin}` ;
        console.log('this._baseUrl',backendURL);
        return this.http.post(backendURL, payload)
          .map<Response, IPayloadAction>(result => ({
            type: SessionActions.LOGIN_USER_SUCCESS,
            payload: result.json()
          }))
          .catch<any, Action>(() => Observable.of({
            type: SessionActions.LOGIN_USER_ERROR
          }));
        });
  }
}
