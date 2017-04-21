import { NgModule,CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL DESIGN MODULES
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {XHRBackend, Http, RequestOptions} from "@angular/http";
import {InterceptedHttp} from "./services/interceptors/http.interceptor";

// LOGIN COMPONENTS
import { LoginComponent, RegisterComponent, SettingsComponent, ProfileComponent,
   PasswordComponent,ListComponent, EqualValidator} from './index';

// LOGIN ROUTES
import { USERS_ROUTES } from './index';

// LOGIN SERVICES 
import { UsersConfig, UsersService, Auth, AuthInterceptor } from './index';


export function usersFactory(config: UsersConfig) {
  return () => config.addMenu() ;
}
export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new InterceptedHttp(xhrBackend, requestOptions);
 }
@NgModule({
  imports: [
    USERS_ROUTES,
    MaterialModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    ProfileComponent,
    PasswordComponent,
    EqualValidator,
    ListComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ UsersConfig, UsersService,
  { provide: APP_INITIALIZER, useFactory: usersFactory, deps: [UsersConfig], multi: true },
  { provide: Http,  useFactory: httpFactory, deps: [XHRBackend, RequestOptions]}

],
})
export class UsersModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UsersModule,
      providers: [Auth, AuthInterceptor]
    }
  }

}
