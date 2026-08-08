import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export function roleGuard(allowedRoles: string[]): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const userRole = authService.user()?.role;

    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    }

    // Redirige selon le rôle réel de l'utilisateur
    if (userRole === 'Patient') {
      router.navigate(['/portal']);
    } else {
      router.navigate(['/dashboard']);
    }

    return false;
  };
}