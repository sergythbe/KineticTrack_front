import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { passwordsMatchValidator } from '../../../../core/validators/passwords-match.validator';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export default class ChangePasswordComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  protected authService = inject(AuthService);

  protected changePasswordForm = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmNewPassword: ['', [Validators.required]]
  },
{ validators: passwordsMatchValidator });

  private redirectEffect = effect(() => {
    if (this.authService.isSuccess()) {
      this.router.navigate(['/dashboard']);
    }
  });

  ngOnInit(): void {
    this.authService.resetState();
  }

  onSubmit(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.authService.changePassword(this.changePasswordForm.getRawValue()).subscribe();
  }
}