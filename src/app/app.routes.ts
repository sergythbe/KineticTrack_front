import { Routes } from '@angular/router';

export const routes: Routes = [
   
    {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full'
    },

    {
        path: 'register',
        loadComponent: () => import('./features/auth/components/register-patient/register-patient.component')
    },


    {
        path: '**',
        redirectTo: 'register'
    }
];