import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-practitioner-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './practitioner-shell.component.html',

})
export default class PractitionerShellComponent {
  private router = inject(Router);
  protected authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}