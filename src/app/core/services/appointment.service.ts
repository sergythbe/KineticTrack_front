import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Appointment } from '../models/appointment';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

export interface AppointmentState {
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/appointment`;

  private state = signal<AppointmentState>({
    isLoading: false,
    error: null,
  });

  private todayAppointmentsSignal = signal<Appointment[]>([]);

  isLoading = computed(() => this.state().isLoading);
  error = computed(() => this.state().error);
  todayAppointments = computed(() => this.todayAppointmentsSignal());

  loadTodayAppointments(): Observable<Appointment[]> {
    this.state.set({ isLoading: true, error: null });

    return this.http.get<Appointment[]>(`${this.apiUrl}/today`).pipe(
      tap((data) => {
        this.todayAppointmentsSignal.set(data);
        this.state.set({ isLoading: false, error: null });
      }),
      catchError((err) => {
        const msg = err.error?.message || 'Erreur lors du chargement des rendez-vous.';
        this.state.set({ isLoading: false, error: msg });
        return EMPTY;
      }),
    );
  }
}