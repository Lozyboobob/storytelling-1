import { Component } from '@angular/core';
import {
  DevToolsExtension,
  NgRedux
} from '@angular-redux/store';
import {NgReduxRouter} from '@angular-redux/router';
import {createEpicMiddleware, combineEpics} from 'redux-observable';
import {
  IAppState,
  rootReducer,
  middleware,
  enhancers
} from './core';
import {SessionEpics} from './core';
import { ToggleNavService } from './core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ToggleNavService]
})
export class AppComponent {
  title = 'app works!';
  isToggled: boolean;
  isNormalScreen:boolean=true;
  subscription: Subscription;
  EPICS = combineEpics(
    this.epics.login,
    this.epics.editProfile,
    this.epics.getProfile,
    this.epics.changePassword,
  );
  constructor(
    private devTools: DevToolsExtension,
    private ngRedux: NgRedux<IAppState>,
    private ngReduxRouter: NgReduxRouter,
    private epics: SessionEpics,
    private ToggleNavService: ToggleNavService) {
    middleware.push(createEpicMiddleware(this.EPICS));

    ngRedux.configureStore(
      rootReducer,
      {},
      middleware,
      devTools.isEnabled() ?
        [...enhancers, devTools.enhancer()] :
        enhancers);
    ngReduxRouter.initialize();

    //subscribe toggle service
    this.ToggleNavService.toggle().subscribe(toggled => {
      this.isToggled = toggled;
    });
    console.log(this.subscription);
  }
}
