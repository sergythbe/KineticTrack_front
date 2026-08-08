import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-patient',
  imports: [CommonModule, ReactiveFormsModule, Toast, RouterLink],
  providers: [MessageService],
  templateUrl: './register-patient.component.html',
  styleUrl: './register-patient.component.css'
})
export default class RegisterPatientComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private messageService = inject(MessageService);
  protected authService = inject(AuthService);

  protected registerForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    birthdate: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    medicalHistory: ['']
  });

  constructor() {
    effect(() => {
      const err = this.authService.error();
      if (err) {
        this.messageService.add({
          severity: 'error',
          summary: 'Échec de l\'enregistrement',
          detail: err,
          life: 5000,
        });
      }
    });
  }

  ngOnInit(): void {
    this.authService.resetState();
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
  this.authService.register(this.registerForm.getRawValue()).subscribe({
    next: (response) => {
      this.registerForm.reset();
      this.messageService.add({
        severity: 'success',
        summary: 'Patient enregistré',
        detail: `Mot de passe temporaire : ${response.temporaryPassword}`,
        sticky: true,
      });
    },
  });
  }
}