import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Card from '@components/common/Card';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { Lock, ArrowLeft, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@hooks/useAuth';
import { useToast } from '@components/common/Toast';

const ResetPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!token || !email) {
      showToast('Invalid or missing reset link. Request a new one.', 'error');
      return;
    }

    if (!password || password.length < 8) {
      showToast('Password must be at least 8 characters.', 'warning');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword({
        email,
        token,
        password,
        confirm_password: confirmPassword,
      });
      setIsComplete(true);
      showToast('Password updated successfully! Please sign in.', 'success');
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'Unable to reset password. Please request a new link.';
      showToast(message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-secondary/10 py-12 px-4">
        <div className="max-w-xl mx-auto">
          <Card
            padding="xl"
            className="space-y-5 text-center border border-red-100 shadow-2xl"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mx-auto">
              <Lock size={28} />
            </div>
            <h1 className="font-heading text-3xl font-semibold text-text">
              Reset link invalid
            </h1>
            <p className="text-gray-600">
              The link you followed is missing required information. Request a
              brand new link to continue.
            </p>
            <Button variant="primary" onClick={() => navigate('/forgot-password')}>
              Request new link
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-white to-primary/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto grid gap-10 md:grid-cols-2 items-stretch">
        <Card className="shadow-2xl border border-gray-100 rounded-2xl p-8 space-y-8">
          <div className="flex items-center justify-between">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to login
            </Link>
            <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
              Final step
            </span>
          </div>

          <div className="text-center space-y-3">
            <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-text">
              Set a new password
            </h1>
            <p className="text-gray-600">
              Secure your account for{' '}
              <span className="font-semibold">{email}</span> with a fresh
              password.
            </p>
          </div>

          {isComplete ? (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-500">
                <CheckCircle size={32} />
              </div>
              <p className="text-gray-700 font-medium">
                Password updated successfully. You can log in with your new
                credentials now.
              </p>
              <Button variant="primary" onClick={() => navigate('/login')}>
                Go to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a new password"
                    leftIcon={<Lock size={18} />}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your new password"
                    leftIcon={<Lock size={18} />}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={
                      showConfirmPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                disabled={isSubmitting}
                className="rounded-xl shadow-lg shadow-primary/20"
              >
                {isSubmitting ? 'Updating password...' : 'Update password'}
              </Button>
            </form>
          )}
        </Card>

        <div className="bg-white rounded-2xl shadow-xl border border-primary/10 p-8 space-y-6 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Lock size={20} />
            </div>
            <h3 className="font-heading text-2xl text-text mb-3">
              Password tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Use at least 8 characters.</li>
              <li>• Include uppercase and lowercase letters.</li>
              <li>• Add a number or special character for extra security.</li>
            </ul>
          </div>
          <div className="bg-primary/5 rounded-xl p-4 text-sm text-gray-600">
            Need help? Our team can assist with account security at{' '}
            <Link
              to="/contact"
              className="text-primary font-semibold hover:underline"
            >
              Bakar’s support
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
