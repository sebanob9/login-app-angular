import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'register' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
