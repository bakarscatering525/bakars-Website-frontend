import apiClient from '../client';
import { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  User, 
  RegistrationResponse,
  VerifyEmailData,
  ResendVerificationData,
  ForgotPasswordData,
  ResetPasswordData,
} from '@models/auth.types';

export const authAPI = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<AuthResponse>('/auth/login', credentials),

  register: (data: RegisterData) =>
    apiClient.post<RegistrationResponse>('/auth/register', data),

  verifyEmail: (data: VerifyEmailData) =>
    apiClient.post<AuthResponse>('/auth/verify-email', data),

  resendVerification: (data: ResendVerificationData) =>
    apiClient.post<{ email: string }>('/auth/resend-verification', data),

  forgotPassword: (data: ForgotPasswordData) =>
    apiClient.post<{ message: string }>('/auth/forgot-password', data),

  resetPassword: (data: ResetPasswordData) =>
    apiClient.post<{ message: string }>('/auth/reset-password', data),

  getProfile: () => apiClient.get<User>('/auth/profile'),

  updateProfile: (data: Partial<User>) =>
    apiClient.put<User>('/auth/profile', data),

  logout: () => apiClient.post('/auth/logout'),
};

