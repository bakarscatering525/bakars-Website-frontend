import React, { useState, useEffect } from 'react';
import { useAuthModalStore } from '@store/authModalStore';
import { useAuthStore } from '@store/authStore';
import { useCartStore } from '@store/cartStore';
import Modal from '@components/common/Modal';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { useToast } from '@components/common/Toast';
import {
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthModal: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    isOpen,
    initialTab,
    pendingAction,
    redirectPath,
    closeModal,
    clearPendingAction,
  } = useAuthModalStore();
  const { login, register, verifyEmail, resendVerification, isAuthenticated } =
    useAuthStore();
  const { addItem } = useCartStore();

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');

  // Verification state
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [resendCountdown, setResendCountdown] = useState(0);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setShowVerification(false);
      resetForms();
    }
  }, [isOpen, initialTab]);

  // Countdown timer for resend button
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown(resendCountdown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  // Execute pending action after successful authentication
  useEffect(() => {
    if (isAuthenticated && pendingAction) {
      executePendingAction();
    }
  }, [isAuthenticated]);

  const resetForms = () => {
    // Reset login form
    setLoginEmail('');
    setLoginPassword('');

    // Reset signup form
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword('');
    setSignupFirstName('');
    setSignupLastName('');
    setSignupPhone('');

    // Reset verification form
    setVerificationCode(['', '', '', '', '', '']);
    setVerificationEmail('');
    setResendCountdown(0);
  };

  const executePendingAction = async () => {
    if (!pendingAction) return;

    try {
      if (pendingAction.type === 'daily_menu' && pendingAction.item) {
        // Add item to cart
        await addItem(
          pendingAction.item,
          pendingAction.quantity || 1,
          pendingAction.specialInstructions
        );
        showToast('Item added to cart successfully!', 'success');
      } else if (pendingAction.type === 'meal_subscription') {
        // For meal subscription, just redirect to the page
        if (redirectPath) {
          navigate(redirectPath);
        }
      }
    } catch (error) {
      console.error('Failed to execute pending action:', error);
      showToast('Failed to add item to cart', 'error');
    } finally {
      clearPendingAction();
      closeModal();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      showToast('Please fill in all fields', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      await login({ email: loginEmail, password: loginPassword });
      showToast('Login successful!', 'success');

      // The pending action will be executed by the useEffect hook
      if (!pendingAction) {
        closeModal();
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      showToast(
        error.response?.data?.message ||
          'Login failed. Please check your credentials.',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !signupEmail ||
      !signupPassword ||
      !signupFirstName ||
      !signupLastName ||
      !signupPhone
    ) {
      showToast('Please fill in all required fields', 'warning');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      showToast('Passwords do not match', 'warning');
      return;
    }

    if (signupPassword.length < 6) {
      showToast('Password must be at least 6 characters long', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      const email = await register({
        email: signupEmail,
        password: signupPassword,
        first_name: signupFirstName,
        last_name: signupLastName,
        phone: signupPhone,
      });

      // Show verification screen
      setVerificationEmail(email);
      setShowVerification(true);
      setResendCountdown(60); // 60 seconds cooldown
      showToast('Verification code sent to your email!', 'success');
    } catch (error: any) {
      console.error('Registration failed:', error);
      showToast(
        error.response?.data?.message ||
          'Registration failed. Please try again.',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationCodeChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerificationCodeKeyDown = (
    index: number,
    e: React.KeyboardEvent
  ) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = verificationCode.join('');
    if (code.length !== 6) {
      showToast('Please enter the complete 6-digit code', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmail({
        email: verificationEmail,
        code,
      });
      showToast('Email verified successfully!', 'success');
      setShowVerification(false);

      // The pending action will be executed by the useEffect hook
      if (!pendingAction) {
        closeModal();
      }
    } catch (error: any) {
      console.error('Verification failed:', error);
      showToast(
        error.response?.data?.message ||
          'Invalid or expired code. Please try again.',
        'error'
      );
      // Clear the code on error
      setVerificationCode(['', '', '', '', '', '']);
      const firstInput = document.getElementById('code-input-0');
      firstInput?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCountdown > 0) return;

    setIsLoading(true);
    try {
      await resendVerification(verificationEmail);
      showToast('Verification code resent!', 'success');
      setResendCountdown(60);
    } catch (error: any) {
      console.error('Resend failed:', error);
      showToast(
        error.response?.data?.message ||
          'Failed to resend code. Please try again.',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      closeModal();
      resetForms();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={showVerification ? 'Verify Your Email' : "Welcome to Bakar's"}
      size="md"
    >
      <div className="space-y-6">
        {/* Verification Form */}
        {showVerification ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Check Your Email</h3>
              <p className="text-sm text-gray-600 mb-4">
                We've sent a 6-digit verification code to
                <br />
                <span className="font-semibold text-gray-900">
                  {verificationEmail}
                </span>
              </p>
              <p className="text-xs text-gray-500">
                Code expires in 15 minutes
              </p>
            </div>

            <form onSubmit={handleVerifyEmail} className="space-y-6">
              {/* 6-digit code inputs */}
              <div className="flex justify-center gap-2">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-input-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleVerificationCodeChange(index, e.target.value)
                    }
                    onKeyDown={(e) => handleVerificationCodeKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    disabled={isLoading}
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading || verificationCode.some((d) => !d)}
                isLoading={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify Email'}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Didn't receive the code?
                </p>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendCountdown > 0 || isLoading}
                  className={`text-sm font-semibold ${
                    resendCountdown > 0 || isLoading
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-primary hover:text-primary-dark'
                  }`}
                >
                  {resendCountdown > 0
                    ? `Resend code in ${resendCountdown}s`
                    : 'Resend Code'}
                </button>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowVerification(false);
                      resetForms();
                    }}
                    className="text-sm text-gray-600 hover:text-gray-900"
                    disabled={isLoading}
                  >
                    ← Back to signup
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* Tab Switcher */}
            <div className="flex space-x-2 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 px-4 py-3 font-semibold transition-all ${
                  activeTab === 'login'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                disabled={isLoading}
              >
                <LogIn className="inline-block mr-2" size={18} />
                Login
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 px-4 py-3 font-semibold transition-all ${
                  activeTab === 'signup'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                disabled={isLoading}
              >
                <UserPlus className="inline-block mr-2" size={18} />
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>

                {pendingAction && (
                  <p className="text-sm text-center text-gray-600">
                    🛒 Login to add item to cart
                  </p>
                )}
              </form>
            )}

            {/* Signup Form */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        type="text"
                        value={signupFirstName}
                        onChange={(e) => setSignupFirstName(e.target.value)}
                        placeholder="John"
                        className="pl-10"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        type="text"
                        value={signupLastName}
                        onChange={(e) => setSignupLastName(e.target.value)}
                        placeholder="Doe"
                        className="pl-10"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      type="tel"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      placeholder="04XX XXX XXX"
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      type="password"
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>

                {pendingAction && (
                  <p className="text-sm text-center text-gray-600">
                    🛒 Sign up to add item to cart
                  </p>
                )}
              </form>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;
