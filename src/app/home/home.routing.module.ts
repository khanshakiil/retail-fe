import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LayoutComponent } from '../layout/layout/layout.component';
import { HomeComponent } from './home.component';
import { RegisterComponent } from '../login/register/register.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { SetupComponent } from './setup/setup.component';

const routes: Routes = [
{
  path: '', component: LayoutComponent, 
  children : [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]  },
   { path: 'home', component: HomeComponent },
   { path: 'setup', component: SetupComponent }
  ]
}
]

export const HomeRoutingModule = RouterModule.forChild(routes);