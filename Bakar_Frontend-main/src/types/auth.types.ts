export interface User {
  id: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  addresses: Address[];
  created_at: string;
  updated_at: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  email_verified: boolean;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  suburb: string;
  postcode: string;
  state: string;
  is_default: boolean;
  instructions?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  phone: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  role?: 'customer' | 'admin';
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface RegistrationResponse {
  email: string;
  message: string;
}

export interface VerifyEmailData {
  email: string;
  code: string;
}

export interface ResendVerificationData {
  email: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  token: string;
  password: string;
  confirm_password: string;
}
