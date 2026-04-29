import { useAuthStore } from '@store/authStore'

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    role,
    login,
  register,
  verifyEmail,
  resendVerification,
  requestPasswordReset,
  resetPassword,
  logout,
  updateProfile,
  refreshProfile,
} = useAuthStore()

  return {
    user,
    isAuthenticated,
    isLoading,
    role,
    isAdmin: role === 'admin',
    isCustomer: role === 'customer',
    login,
    register,
    verifyEmail,
    resendVerification,
    requestPasswordReset,
    resetPassword,
    logout,
    updateProfile,
    refreshProfile,
  }
}
