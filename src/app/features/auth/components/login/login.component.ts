import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  protected authService = inject(AuthService);

  protected loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  private redirectEffect = effect(() => {
    if (this.authService.isSuccess()) {
      if (this.authService.requiresPasswordChange()) {
        this.router.navigate(['/auth/change-password']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    }
  });
  ngOnInit(): void {
    this.authService.resetState();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    console.log(this.loginForm.getRawValue())

    this.authService.login(this.loginForm.getRawValue()).subscribe();
  }
}