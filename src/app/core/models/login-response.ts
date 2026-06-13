export interface LoginResponse {
  token: string;
  requiresPasswordChange: boolean;
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
}
