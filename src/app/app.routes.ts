import { UserNewComponent } from './components/user-new/user-new.component';
import { AuthGuard } from './components/security/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { Component, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router'
import { LoginComponent } from './components/security/login/login.component';

export const ROUTES = [
    { path : '', component: HomeComponent, canActivate: [AuthGuard]},
    { path : 'login', component: LoginComponent },
    { path : 'user-new', component: UserNewComponent, canActivate: [AuthGuard] }
]



export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);