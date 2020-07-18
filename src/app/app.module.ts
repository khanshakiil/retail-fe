import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ɵSWITCH_COMPILE_COMPONENT__POST_R3__, APP_INITIALIZER  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AppLoadService } from './_services/app.load.service';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { AlertComponent } from './_components';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { LayoutModule } from './layout/layout.module';
import { ToastrModule } from 'ngx-toastr';

export function init_app(appLoadService: AppLoadService) {
  return () => appLoadService.initializeApp();
}

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HomeModule,
    LoginModule,
    LayoutModule
 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true } ,
    AppLoadService,
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
