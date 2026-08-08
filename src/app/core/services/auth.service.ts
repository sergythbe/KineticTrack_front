import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RegisterPatientDto } from '../models/register-patient-dto';
import { LoginDto } from '../models/login-dto';
import { LoginResponse } from '../models/login-response';
import { ChangePasswordDto } from '../models/change-password-dto';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { RegisterPatientResponse } from '../models/register-patient-reponse';


export interface AuthState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;

  private state = signal<AuthState>({
    isLoading: false,
    error: null,
    isSuccess: false,
  });

  private currentUser = signal<LoginResponse | null>(
    JSON.parse(localStorage.getItem('auth_user') ?? 'null'),
  );

  isLoading = computed(() => this.state().isLoading);
  error = computed(() => this.state().error);
  isSuccess = computed(() => this.state().isSuccess);
  isAuthenticated = computed(() => this.currentUser() !== null);
  requiresPasswordChange = computed(() => this.currentUser()?.requiresPasswordChange ?? false);
  user = computed(() => this.currentUser());

  register(dto: RegisterPatientDto): Observable<RegisterPatientResponse> {
    this.state.set({ isLoading: true, error: null, isSuccess: false });

    return this.http.post<RegisterPatientResponse>(`${this.apiUrl}/register`, dto).pipe(
      tap(() => this.state.set({ isLoading: false, error: null, isSuccess: true })),
      catchError((err) => {
        console.log('erreur complète :', err);
        console.log('err.error :', err.error);
        const msg = err.error?.message || "Erreur lors de l'inscription.";
        this.state.set({ isLoading: false, error: msg, isSuccess: false });
        return EMPTY;
      }),
    );
  }

  login(dto: LoginDto): Observable<LoginResponse> {
    this.state.set({ isLoading: true, error: null, isSuccess: false });

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, dto).pipe(
      tap((response) => {
        this.currentUser.set(response);
        localStorage.setItem('auth_user', JSON.stringify(response));
        this.state.set({ isLoading: false, error: null, isSuccess: true });
      }),
      catchError((err) => {
        const msg = err.error?.message || 'Email ou mot de passe incorrect.';
        this.state.set({ isLoading: false, error: msg, isSuccess: false });
        return EMPTY;
      }),
    );
  }

  changePassword(dto: ChangePasswordDto): Observable<void> {
    this.state.set({ isLoading: true, error: null, isSuccess: false });

    return this.http.post<void>(`${this.apiUrl}/change-password`, dto).pipe(
      tap(() => {
        const user = this.currentUser();
        if (user) {
          const updated = { ...user, requiresPasswordChange: false };
          this.currentUser.set(updated);
          localStorage.setItem('auth_user', JSON.stringify(updated));
        }
        this.state.set({ isLoading: false, error: null, isSuccess: true });
      }),
      catchError((err) => {
        const msg = err.error?.message || 'Erreur lors du changement de mot de passe.';
        this.state.set({ isLoading: false, error: msg, isSuccess: false });
        return EMPTY;
      }),
    );
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('auth_user');
    this.resetState();
  }

  getToken(): string | null {
    return this.currentUser()?.token ?? null;
  }

  resetState(): void {
    this.state.set({ isLoading: false, error: null, isSuccess: false });
  }
}
