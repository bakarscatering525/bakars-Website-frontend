import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { useCart } from '@hooks/useCart';
import { useToast } from '@components/common/Toast';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { RegisterData } from '@models/auth.types';
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  AlertCircle,
  Info,
  ShieldCheck,
} from 'lucide-react';

interface RegisterFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
  redirectOnSuccess?: boolean;
  className?: string;
}

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
  general?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onCancel,
  showCancel = false,
  redirectOnSuccess = true,
  className = '',
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, verifyEmail, resendVerification } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // âœ… Get the return URL and check for pending cart item
  const from = location.state?.from || '/';
  const hasPendingCartItem = location.state?.pendingCartItem || false;

  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(6).fill('')
  );
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [backendErrors, setBackendErrors] = useState<string[]>([]);

  useEffect(() => {
    if (resendCountdown <= 0) {
      return;
    }
    const timer = setTimeout(() => {
      setResendCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  // âœ… Add pending item to cart after successful registration
  const addPendingItemToCart = async () => {
    const pendingItemStr = localStorage.getItem('bakars_pending_cart_item');
    if (pendingItemStr) {
      try {
        const pendingItem = JSON.parse(pendingItemStr);

        // Check if the item is not too old (24 hours)
        const itemDate = new Date(pendingItem.timestamp);
        const now = new Date();
        const hoursDiff =
          (now.getTime() - itemDate.getTime()) / (1000 * 60 * 60);

        if (hoursDiff < 24) {
          await addToCart(
            pendingItem.item,
            pendingItem.quantity,
            pendingItem.specialInstructions
          );
          showToast(`${pendingItem.item.name} added to cart!`, 'success');
        }

        // Clear the pending item
        localStorage.removeItem('bakars_pending_cart_item');
      } catch (error) {
        console.error('Failed to add pending item to cart:', error);
      }
    }
  };

  const resetVerificationState = () => {
    setVerificationCode(Array(6).fill(''));
    setResendCountdown(0);
  };

  const handleVerificationCodeChange = (
    index: number,
    value: string
  ) => {
    if (value && !/^\d$/.test(value)) {
      return;
    }
    const updated = [...verificationCode];
    updated[index] = value;
    setVerificationCode(updated);

    if (value && index < verificationCode.length - 1) {
      const nextInput = document.getElementById(
        `verification-code-${index + 1}`
      );
      nextInput?.focus();
    }
  };

  const handleVerificationCodeKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const previousInput = document.getElementById(
        `verification-code-${index - 1}`
      );
      previousInput?.focus();
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationEmail) {
      showToast('Verification email missing. Please sign up again.', 'error');
      return;
    }

    if (verificationCode.some((digit) => !digit)) {
      showToast('Please enter the 6-digit verification code.', 'warning');
      return;
    }

    setIsVerifying(true);
    try {
      await verifyEmail({
        email: verificationEmail,
        code: verificationCode.join(''),
      });

      showToast('Email verified! You are now signed in.', 'success');
      setShowVerification(false);
      resetVerificationState();

      if (hasPendingCartItem) {
        await addPendingItemToCart();
      }

      if (onSuccess) {
        onSuccess();
      }

      if (redirectOnSuccess) {
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'Verification failed. Please try again.';
      showToast(message, 'error');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!verificationEmail || resendCountdown > 0) {
      return;
    }

    setIsResending(true);
    try {
      await resendVerification(verificationEmail);
      showToast('Verification code resent!', 'success');
      setVerificationCode(Array(6).fill(''));
      setResendCountdown(60);
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'Unable to resend verification code.';
      showToast(message, 'error');
    } finally {
      setIsResending(false);
    }
  };

  const handleBackToSignup = () => {
    setShowVerification(false);
    setVerificationEmail('');
    resetVerificationState();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }

    // Clear backend errors when user makes changes
    if (backendErrors.length > 0) {
      setBackendErrors([]);
    }
  };

  // Format phone number to backend-expected format
  const formatPhoneForBackend = (phone: string): string => {
    // Remove all non-digits
    let cleaned = phone.replace(/\D/g, '');

    console.log('ðŸ“ž [DEBUG] Original phone:', phone);
    console.log('ðŸ“ž [DEBUG] Cleaned phone:', cleaned);

    // If starts with 0, replace with 61
    if (cleaned.startsWith('0')) {
      cleaned = '61' + cleaned.slice(1);
    }

    // If doesn't start with 61, add it
    if (!cleaned.startsWith('61')) {
      cleaned = '61' + cleaned;
    }

    // Add + prefix
    const formatted = '+' + cleaned;

    console.log('âœ… [DEBUG] Formatted phone for backend:', formatted);

    return formatted;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First Name validation
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    } else if (formData.first_name.trim().length < 2) {
      newErrors.first_name = 'First name must be at least 2 characters';
    } else if (formData.first_name.trim().length > 50) {
      newErrors.first_name = 'First name must be less than 50 characters';
    }

    // Last Name validation
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    } else if (formData.last_name.trim().length < 2) {
      newErrors.last_name = 'Last name must be at least 2 characters';
    } else if (formData.last_name.trim().length > 50) {
      newErrors.last_name = 'Last name must be less than 50 characters';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (Australian mobile)
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else {
      const cleanPhone = formData.phone.replace(/\D/g, '');
      // Accept formats: 04XX XXX XXX or 4XX XXX XXX or +614XX XXX XXX
      if (!/^(0[4-5]\d{8}|[4-5]\d{8}|61[4-5]\d{8})$/.test(cleanPhone)) {
        newErrors.phone =
          'Please enter a valid Australian mobile number (e.g., 0412 345 678)';
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (formData.password.length > 100) {
      newErrors.password = 'Password must be less than 100 characters';
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password =
        'Password must contain at least one lowercase letter';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password =
        'Password must contain at least one uppercase letter';
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms acceptance validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Parse FastAPI validation errors
  const parseBackendErrors = (error: any): string[] => {
    const errorMessages: string[] = [];

    console.log(
      'â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•'
    );
    console.log('â•‘ ðŸ” BACKEND ERROR ANALYSIS');
    console.log(
      'â• â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•'
    );

    console.log('â•‘ Full Error Object (stringified):');
    console.log(JSON.stringify(error, null, 2));

    if (error.response) {
      console.log('â•‘ Response Status:', error.response.status);
      console.log('â•‘ Response StatusText:', error.response.statusText);
      console.log('â•‘ Response Data (stringified):');
      console.log(JSON.stringify(error.response.data, null, 2));

      if (error.response.data) {
        console.log('â•‘ Response Data Keys:', Object.keys(error.response.data));

        if (error.response.data.detail) {
          console.log('â•‘ Detail (stringified):');
          console.log(JSON.stringify(error.response.data.detail, null, 2));
        }
      }
    }

    console.log(
      'â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•'
    );

    // Check if it's a FastAPI validation error (422)
    if (error.response?.status === 422 && error.response?.data?.detail) {
      const detail = error.response.data.detail;

      // FastAPI returns array of validation errors
      if (Array.isArray(detail)) {
        console.log(`ðŸ”´ Found ${detail.length} validation errors`);

        detail.forEach((err: any, index: number) => {
          console.log(
            `   Error ${index + 1} (stringified):`,
            JSON.stringify(err, null, 2)
          );

          const field = err.loc[err.loc.length - 1];
          const message = err.msg;

          // Map field names to user-friendly names
          const fieldNames: Record<string, string> = {
            first_name: 'First Name',
            last_name: 'Last Name',
            email: 'Email',
            phone: 'Phone Number',
            password: 'Password',
            role: 'Role',
          };

          const fieldName = fieldNames[field as string] || field;
          const errorMsg = `${fieldName}: ${message}`;
          errorMessages.push(errorMsg);
          console.log(`   âœ… Added error: ${errorMsg}`);

          // Also set field-specific error
          if (field && typeof field === 'string') {
            setErrors((prev) => ({
              ...prev,
              [field]: message,
            }));
          }
        });
      } else if (typeof detail === 'string') {
        console.log('ðŸŸ¡ Detail is a string:', detail);
        errorMessages.push(detail);
      } else if (typeof detail === 'object' && detail !== null) {
        console.log(
          'ðŸŸ¢ Detail is an object (stringified):',
          JSON.stringify(detail, null, 2)
        );
        errorMessages.push(JSON.stringify(detail));
      }
    }
    // Generic error message
    else if (error.response?.data?.message) {
      console.log(
        'ðŸŸ¨ Using response.data.message:',
        error.response.data.message
      );
      errorMessages.push(error.response.data.message);
    } else if (error.message) {
      console.log('ðŸŸ¦ Using error.message:', error.message);
      errorMessages.push(error.message);
    } else {
      console.log('âš ï¸ No recognizable error format, using generic message');
      errorMessages.push('Registration failed. Please try again.');
    }

    console.log('ðŸ“‹ Final error messages:', errorMessages);
    return errorMessages;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous backend errors
    setBackendErrors([]);

    if (!validateForm()) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Format data for backend API
      const registrationData: RegisterData = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formatPhoneForBackend(formData.phone),
        password: formData.password,
      };

      console.log('â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•');
      console.log('ðŸ“¤ SENDING REGISTRATION REQUEST');
      console.log('â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•');
      console.log('Data being sent (stringified):');
      console.log(JSON.stringify(registrationData, null, 2));
      console.log('â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•');

      const email = await register(registrationData);

      console.log('\u2705 Registration successful!');
      resetVerificationState();
      setVerificationEmail(email);
      setShowVerification(true);
      setResendCountdown(60);
      showToast('Verification code sent! Please check your email.', 'success');
    } catch (error: any) {
      console.error('â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•');
      console.error('âŒ REGISTRATION FAILED');
      console.error('â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•');

      // Parse and display backend errors
      const parsedErrors = parseBackendErrors(error);
      setBackendErrors(parsedErrors);

      // Show first error as toast
      if (parsedErrors.length > 0) {
        showToast(parsedErrors[0], 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(-1);
    }
  };

  const isVerificationCodeComplete = verificationCode.every((digit) => !!digit);

  if (showVerification) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-text">Verify your email</h3>
          <p className="text-sm text-gray-600">
            We've sent a 6-digit verification code to{' '}
            <span className="block font-semibold text-gray-900">
              {verificationEmail}
            </span>
          </p>
          <p className="text-xs text-gray-500">Code expires in 15 minutes.</p>
        </div>

        <form onSubmit={handleVerificationSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`verification-code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleVerificationCodeChange(index, e.target.value)
                }
                onKeyDown={(e) => handleVerificationCodeKeyDown(index, e)}
                className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                disabled={isVerifying}
                autoFocus={index === 0}
              />
            ))}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isVerifying}
            disabled={isVerifying || !isVerificationCodeComplete}
          >
            {isVerifying ? 'Verifying...' : 'Verify Email'}
          </Button>

          <div className="text-center space-y-3 text-sm text-gray-600">
            <div>
              Didn't receive the code?
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isResending || resendCountdown > 0}
                className={`ml-2 font-semibold ${
                  isResending || resendCountdown > 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-primary hover:text-primary-600'
                }`}
              >
                {isResending
                  ? 'Sending...'
                  : resendCountdown > 0
                  ? `Resend in ${resendCountdown}s`
                  : 'Resend Code'}
              </button>
            </div>
            <button
              type="button"
              onClick={handleBackToSignup}
              disabled={isVerifying}
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Use a different email
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {/* Show info if there's a pending cart item */}
      {hasPendingCartItem && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm text-green-800">
            Sign up to add your selected item to cart
          </p>
        </div>
      )}

      {/* Show info if redirected from a protected page */}
      {from !== '/' && from !== '/register' && !hasPendingCartItem && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            Please sign up to access that page
          </p>
        </div>
      )}

      {/* Backend Errors Display */}
      {backendErrors.length > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle
              className="text-red-600 flex-shrink-0 mt-0.5"
              size={20}
            />
            <div className="flex-1">
              <h3 className="font-semibold text-red-800 mb-2">
                Registration Failed
              </h3>
              <ul className="space-y-1">
                {backendErrors.map((error, index) => (
                  <li
                    key={index}
                    className="text-sm text-red-700 flex items-start space-x-2"
                  >
                    <span className="text-red-500 mt-0.5">â€¢</span>
                    <span>{error}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Name Fields - Split into First and Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          name="first_name"
          label="First Name"
          value={formData.first_name}
          onChange={handleChange}
          error={errors.first_name}
          leftIcon={<User size={20} />}
          placeholder="John"
          required
          disabled={isSubmitting}
        />

        <Input
          type="text"
          name="last_name"
          label="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          error={errors.last_name}
          leftIcon={<User size={20} />}
          placeholder="Doe"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Email */}
      <Input
        type="email"
        name="email"
        label="Email Address"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        leftIcon={<Mail size={20} />}
        placeholder="your@email.com"
        required
        disabled={isSubmitting}
      />

      {/* Phone */}
      <div>
        <Input
          type="tel"
          name="phone"
          label="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          leftIcon={<Phone size={20} />}
          placeholder="0412 345 678"
          helperText="Australian mobile number"
          required
          disabled={isSubmitting}
        />
        {/* Phone Format Helper */}
        <div className="mt-2 flex items-start space-x-2 text-xs text-blue-600 bg-blue-50 rounded-lg p-3">
          <Info size={14} className="flex-shrink-0 mt-0.5" />
          <span>
            Accepted formats: <strong>0412 345 678</strong> or{' '}
            <strong>04 1234 5678</strong> or <strong>+61 412 345 678</strong>
          </span>
        </div>
      </div>

      {/* Password */}
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          leftIcon={<Lock size={20} />}
          placeholder="Minimum 8 characters"
          required
          disabled={isSubmitting}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[42px] text-gray-400 hover:text-gray-600 transition-colors"
          disabled={isSubmitting}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          leftIcon={<Lock size={20} />}
          placeholder="Re-enter password"
          required
          disabled={isSubmitting}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-[42px] text-gray-400 hover:text-gray-600 transition-colors"
          disabled={isSubmitting}
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-2">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
            disabled={isSubmitting}
          />
          <span className="text-sm text-gray-600">
            I agree to the{' '}
            <a
              href="/terms"
              target="_blank"
              className="text-primary font-semibold hover:underline"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="/privacy"
              target="_blank"
              className="text-primary font-semibold hover:underline"
            >
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.acceptTerms && (
          <div className="flex items-center space-x-2 text-red-500 text-sm">
            <AlertCircle size={16} />
            <span>{errors.acceptTerms}</span>
          </div>
        )}
      </div>

      {/* Password Requirements Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-semibold mb-2 flex items-center space-x-2">
          <Info size={16} />
          <span>Password Requirements:</span>
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs ml-1">
          <li
            className={
              formData.password.length >= 8
                ? 'text-green-600 font-semibold'
                : ''
            }
          >
            At least 8 characters long
          </li>
          <li
            className={
              /[A-Z]/.test(formData.password)
                ? 'text-green-600 font-semibold'
                : ''
            }
          >
            Contains uppercase letter (A-Z)
          </li>
          <li
            className={
              /[a-z]/.test(formData.password)
                ? 'text-green-600 font-semibold'
                : ''
            }
          >
            Contains lowercase letter (a-z)
          </li>
          <li
            className={
              /\d/.test(formData.password) ? 'text-green-600 font-semibold' : ''
            }
          >
            Contains number (0-9)
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth={!showCancel}
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className={showCancel ? 'sm:flex-1' : ''}
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>

        {showCancel && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="sm:flex-1"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;

