import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '**', redirectTo: '' , pathMatch:'full'}
];

export const AppRoutingModule = RouterModule.forRoot(routes);