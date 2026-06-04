import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'; 
import { RegisterPatientDto } from '../models/register-patient-dto';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

export interface AuthState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  
  private apiUrl = `${environment.apiUrl}/auth`; 

  private state = signal<AuthState>({
    isLoading: false,
    error: null,
    isSuccess: false
  });

  isLoading = computed(() => this.state().isLoading);
  error = computed(() => this.state().error);
  isSuccess = computed(() => this.state().isSuccess);

 register(dto: RegisterPatientDto): Observable<void> {
  this.state.set({ isLoading: true, error: null, isSuccess: false });
  
  return this.http.post<void>(`${this.apiUrl}/register`, dto).pipe(
    tap(() => this.state.set({ isLoading: false, error: null, isSuccess: true })),
    catchError((err) => {
      const msg = err.error?.message || "Erreur lors de l'inscription.";
      this.state.set({ isLoading: false, error: msg, isSuccess: false });
      return EMPTY;
    })
  );
}

  resetState(): void {
    this.state.set({ isLoading: false, error: null, isSuccess: false });
  }
}