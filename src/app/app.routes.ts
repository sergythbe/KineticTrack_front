import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { passwordChangeGuard } from './core/guards/password-change-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },

  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/components/login/login.component'),
  },

  {
    path: 'auth/change-password',
    loadComponent: () =>
      import('./features/auth/components/change-password/change-password.component'),
  },

  {
   path: 'dashboard',
        canActivate: [authGuard, passwordChangeGuard, roleGuard(['Practitioner', 'Admin', 'Secretary'])],
        loadComponent: () => import('./shared/layout/practitioner-shell/practitioner-shell.component'),
        children: [
            { path: '', loadComponent: () => import('./features/dashboard/components/dashboard/dashboard.component') },
            { path: 'register-patient', loadComponent: () => import('./features/auth/components/register-patient/register-patient.component') },
        ]
  },

  {
        path: 'portal',
        canActivate: [authGuard, passwordChangeGuard, roleGuard(['Patient'])],
        loadComponent: () => import('./shared/layout/patient-shell/patient-shell.component'),
        children: [
            { path: '', loadComponent: () => import('./features/patient-portal/components/my-episodes/my-episodes.component') },
        ]
    },

  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
