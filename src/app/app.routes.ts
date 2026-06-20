import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { passwordChangeGuard } from './core/guards/password-change-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },

    {
        path: 'auth/login',
        loadComponent: () => import('./features/auth/components/login/login.component')
    },

    {
        path: 'auth/register',
        loadComponent: () => import('./features/auth/components/register-patient/register-patient.component')
    },

    {
        path: 'auth/change-password',
        loadComponent: () => import('./features/auth/components/change-password/change-password.component')
    },

    {
        path: 'dashboard',
        canActivate: [authGuard, passwordChangeGuard], 
        loadComponent: () => import('./features/dashboard/components/dashboard/dashboard.component')
    },

    {
        path: '**',
        redirectTo: 'auth/login'
    }
];