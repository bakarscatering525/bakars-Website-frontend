import { create } from 'zustand';
import { authAPI } from '@api/endpoints/auth';
import {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  VerifyEmailData,
  ResetPasswordData,
} from '../types/auth.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: 'customer' | 'admin' | null;

  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<string>; // Returns email for verification
  verifyEmail: (data: VerifyEmailData) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (data: ResetPasswordData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AUTH_CHECK_TIMEOUT_MS = 8000;

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('AUTH_CHECK_TIMEOUT')), ms);
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });

const unwrapUser = (payload: any): User | null => {
  if (!payload) return null;
  const data = (payload as any).data ?? payload;
  if (data?.user) return data.user as User;
  return data as User;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  role: null,

  login: async (credentials: LoginCredentials) => {
    try {
      console.log('🔑 Attempting login...');
      const response = await authAPI.login(credentials);

      // ✅ Unwrap response properly
      const rawData = response.data as AuthResponse & { data?: AuthResponse };
      const authData = rawData.data ?? rawData;
      console.log('📦 Auth data:', authData);

      const { access_token } = authData as any;
      const user = unwrapUser((authData as any).user ?? authData);

      // ✅ Extract role from user object
      const userRole = (user as any)?.role;
      console.log('👤 User role:', userRole);

      // Store token
      localStorage.setItem('bakars_auth_token', access_token);

      // ✅ Decode JWT to verify role (optional extra check)
      try {
        const tokenPayload = JSON.parse(atob(access_token.split('.')[1]));
        console.log('🔓 JWT Payload:', tokenPayload);

        // If role is in JWT, use it as fallback
        const finalRole = userRole || tokenPayload.role || tokenPayload.user_role;
        console.log('✅ Final role:', finalRole);

        set({
          user,
          isAuthenticated: true,
          role: finalRole,
          isLoading: false,
        });
      } catch (jwtError) {
        console.warn('⚠️ Could not decode JWT, using user.role');
        set({
          user,
          isAuthenticated: true,
          role: userRole,
          isLoading: false,
        });
      }

      console.log('✅ Login successful');
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      console.error('❌ Error response:', error.response?.data);
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (data: RegisterData) => {
    try {
      console.log('📝 Attempting registration...');
      console.log('📤 Registration data:', data);

      const response = await authAPI.register(data);

      // ✅ Unwrap response properly
      const rawData = response.data as any;
      const registrationData = rawData.data ?? rawData;
      console.log('✅ Registration response:', registrationData);

      // Validate response structure
      if (!registrationData || !registrationData.email) {
        console.error('❌ Invalid registration response structure:', registrationData);
        throw new Error('Invalid response from server');
      }

      // Don't auto-login, return email for verification
      console.log('✅ Registration successful - verification required');
      return registrationData.email;
    } catch (error: any) {
      console.error('❌ Registration failed:', error);
      console.error('❌ Error response:', error.response?.data);
      throw error;
    }
  },

  verifyEmail: async (data: VerifyEmailData) => {
    try {
      console.log('🔐 Verifying email...');
      const response = await authAPI.verifyEmail(data);

      // ✅ Unwrap response properly
      const rawData = response.data as AuthResponse & { data?: AuthResponse };
      const authData = rawData.data ?? rawData;
      console.log('✅ Verification response:', authData);

      // Validate response structure
      if (!authData || !authData.access_token || !authData.user) {
        console.error('❌ Invalid verification response structure:', authData);
        throw new Error('Invalid response from server');
      }

      const { access_token, user } = authData;

      // Store token
      localStorage.setItem('bakars_auth_token', access_token);

      set({
        user,
        isAuthenticated: true,
        role: user.role,
        isLoading: false,
      });

      console.log('✅ Email verified and logged in');
    } catch (error: any) {
      console.error('❌ Email verification failed:', error);
      console.error('❌ Error response:', error.response?.data);
      throw error;
    }
  },

  resendVerification: async (email: string) => {
    try {
      console.log('📧 Resending verification code...');
      await authAPI.resendVerification({ email });
      console.log('✅ Verification code resent');
    } catch (error: any) {
      console.error('❌ Resend verification failed:', error);
      console.error('❌ Error response:', error.response?.data);
      throw error;
    }
  },


  requestPasswordReset: async (email: string) => {
    try {
      console.log('dY"? Requesting password reset link...');
      await authAPI.forgotPassword({ email });
      console.log('?o. Password reset link requested');
    } catch (error: any) {
      console.error('??O Password reset request failed:', error);
      throw error;
    }
  },

  resetPassword: async (data: ResetPasswordData) => {
    try {
      console.log('dY"? Resetting password...');
      await authAPI.resetPassword(data);
      console.log('?o. Password reset successful');
    } catch (error: any) {
      console.error('??O Password reset failed:', error);
      throw error;
    }
  },

  logout: () => {
    console.log('👋 Logging out...');
    localStorage.removeItem('bakars_auth_token');
    set({
      user: null,
      isAuthenticated: false,
      role: null,
      isLoading: false,
    });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('bakars_auth_token');

    if (!token) {
      console.log('❌ No token found');
      set({ isLoading: false, isAuthenticated: false });
      return;
    }

    try {
      console.log('🔍 Checking authentication...');
      const response = await withTimeout(
        authAPI.getProfile(),
        AUTH_CHECK_TIMEOUT_MS
      );
      const user = unwrapUser(response.data);

      if (!user) {
        throw new Error('Invalid profile response');
      }

      console.log('✅ User authenticated:', (user as any)?.email, 'Role:', (user as any)?.role);

      set({
        user,
        isAuthenticated: true,
        role: (user as any)?.role ?? null,
        isLoading: false,
      });
    } catch (error) {
      console.error('❌ Auth check failed:', error);
      localStorage.removeItem('bakars_auth_token');
      set({
        user: null,
        isAuthenticated: false,
        role: null,
        isLoading: false,
      });
    }
  },
  updateProfile: async (data: Partial<User>) => {
    try {
      const response = await authAPI.updateProfile(data);
      const updatedUser = unwrapUser(response.data);
      if (!updatedUser) {
        throw new Error('Invalid profile response');
      }
      set({ user: updatedUser });
    } catch (error) {
      throw error;
    }
  },
  refreshProfile: async () => {
    try {
      const response = await authAPI.getProfile();
      const freshUser = unwrapUser(response.data);
      if (!freshUser) {
        throw new Error('Invalid profile response');
      }
      set({
        user: freshUser,
        isAuthenticated: true,
        role: (freshUser as any)?.role ?? null,
      });
    } catch (error) {
      console.error('Failed to refresh profile', error);
    }
  },
}));
