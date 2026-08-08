// core/models/register-user-response.ts
export interface RegisterPatientResponse {
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  temporaryPassword: string;
}