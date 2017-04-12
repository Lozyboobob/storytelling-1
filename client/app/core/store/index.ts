import * as createLogger from 'redux-logger';

import { IAppState, rootReducer, deimmutify, reimmutify } from './store';
import { ISessionRecord } from './session';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import persistState, {mergePersistedState} from 'redux-localstorage';
import {compose, createStore} from 'redux';
export {
  IAppState,
  ISessionRecord,
  rootReducer,
  reimmutify,
};
let storage = compose(
)(adapter(window.localStorage));
export let middleware = [];
export let enhancers = [
  persistState(storage,"redux-localstorage",()=>{})
];
middleware.push(
    createLogger({
    level: 'info',
    collapsed: true,
    stateTransformer: deimmutify,
}));
