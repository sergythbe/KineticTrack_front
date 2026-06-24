import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PatientDetail } from '../models/patient-detail';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

export interface PatientState {
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/patient`;

  private state = signal<PatientState>({
    isLoading: false,
    error: null,
  });

  private patientDetailSignal = signal<PatientDetail | null>(null);

  isLoading = computed(() => this.state().isLoading);
  error = computed(() => this.state().error);
  patientDetail = computed(() => this.patientDetailSignal());

  getPatientDetail(patientId: string): Observable<PatientDetail> {
    this.state.set({ isLoading: true, error: null });

    return this.http.get<PatientDetail>(`${this.apiUrl}/${patientId}`).pipe(
      tap((data) => {
        this.patientDetailSignal.set(data);
        this.state.set({ isLoading: false, error: null });
      }),
      catchError((err) => {
        const msg = err.error?.message || 'Erreur lors du chargement du dossier patient.';
        this.state.set({ isLoading: false, error: msg });
        return EMPTY;
      }),
    );
  }
}