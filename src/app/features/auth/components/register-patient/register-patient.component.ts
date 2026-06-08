import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-patient.component.html',
  styleUrl: './register-patient.component.css'
})
export class RegisterPatientComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  protected authService = inject(AuthService);

  protected registerForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    birthdate: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    medicalHistory: ['']
  });
  
    ngOnInit(): void {
    this.authService.resetState();
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();
      return;
    }

    // Envoi du DTO et déclenchement via le subscribe
    this.authService.register(this.registerForm.getRawValue()).subscribe();
  }
}