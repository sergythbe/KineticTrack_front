import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DashboardSummary } from '../models/dashboard-summary';
import { ActiveEpisode } from '../models/active-episode';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

export interface DashboardState {
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/dashboard`;

  private state = signal<DashboardState>({
    isLoading: false,
    error: null,
  });

  private summarySignal = signal<DashboardSummary | null>(null);
  private activeEpisodesSignal = signal<ActiveEpisode[]>([]);

  isLoading = computed(() => this.state().isLoading);
  error = computed(() => this.state().error);
  summary = computed(() => this.summarySignal());
  activeEpisodes = computed(() => this.activeEpisodesSignal());

 loadSummary(): Observable<DashboardSummary> {
  this.state.set({ isLoading: true, error: null });

  return this.http.get<DashboardSummary>(`${this.apiUrl}/summary`).pipe(
    tap((data) => {
      this.summarySignal.set(data);
      this.state.set({ isLoading: false, error: null });
    }),
    catchError((err) => {
      const msg = err.error?.message || 'Erreur lors du chargement des statistiques.';
      this.state.set({ isLoading: false, error: msg });
      return EMPTY;
    }),
  );
}

loadActiveEpisodes(): Observable<ActiveEpisode[]> {
  this.state.set({ isLoading: true, error: null });

  return this.http.get<ActiveEpisode[]>(`${this.apiUrl}/active-episodes`).pipe(
    tap((data) => {
      this.activeEpisodesSignal.set(data);
      this.state.set({ isLoading: false, error: null });
    }),
    catchError((err) => {
      const msg = err.error?.message || 'Erreur lors du chargement des épisodes.';
      this.state.set({ isLoading: false, error: msg });
      return EMPTY;
    }),
  );
}
}