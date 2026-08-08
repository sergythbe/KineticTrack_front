// core/models/patient-detail.ts
export interface EvaDataPoint {
  executionDate: string;
  evaMetric: string | null;
}

export interface CareEpisodeDetail {
  careEpisodeId: string;
  title: string;
  status: string;
  createdAt: string;
  evaDataPoints: EvaDataPoint[];
}

export interface PatientDetail {
  patientId: string;
  firstname: string;
  lastname: string;
  email: string;
  birthdate: string;
  gender: string;
  medicalHistory: string | null;
  episodes: CareEpisodeDetail[];
}