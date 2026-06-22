// secretary-home.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-secretary-home',
  imports: [RouterLink],
  templateUrl: './secretary-home.component.html',
  styleUrl: './secretary-home.component.css',
})
export default class SecretaryHomeComponent {
  protected authService = inject(AuthService);
}