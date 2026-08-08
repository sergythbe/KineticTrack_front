export interface Appointment {
  appointmentId: string;
  scheduledAt: string;
  reason: string;
  status: string;
  patientFirstname: string;
  patientLastname: string;
  patientId: string;
  careEpisodeTitle?: string;
  careEpisodeId?: string;
}
