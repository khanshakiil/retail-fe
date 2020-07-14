import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login.routing.module';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent,RegisterComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
