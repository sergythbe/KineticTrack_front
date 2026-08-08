import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-patient-shell',
  imports: [RouterOutlet],
  templateUrl: './patient-shell.component.html',
  styleUrl: './patient-shell.component.css',
})
export default class PatientShellComponent {
  private router = inject(Router);
  protected authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}