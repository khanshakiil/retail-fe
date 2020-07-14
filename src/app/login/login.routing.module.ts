import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { LayoutComponent } from '../layout/layout/layout.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
   { path: '', component: HomeComponent, canActivate: [AuthGuard]},
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent }
  ]

export const LoginRoutingModule = RouterModule.forChild(routes);