import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@components/common/Card';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '@hooks/useAuth';
import { useToast } from '@components/common/Toast';

const ForgotPasswordPage: React.FC = () => {
  const { requestPasswordReset } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) {
      showToast('Please enter your email address', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      await requestPasswordReset(email.trim().toLowerCase());
      setIsSent(true);
      showToast(
        'If an account exists for this email, a reset link has been sent.',
        'success'
      );
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'Unable to send reset email. Please try again later.';
      showToast(message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/10 py-16 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        <Card className="shadow-2xl border border-gray-100 rounded-2xl px-8 py-10 space-y-8">
          <div className="flex items-start justify-between">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to login
            </Link>
            {!isSent && (
              <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Step 1 of 2
              </span>
            )}
          </div>

          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
              <Mail size={22} />
            </div>
            <h1 className="font-heading text-3xl font-semibold text-text">
              Forgot Password
            </h1>
            <p className="text-gray-600 leading-relaxed">
              We’ll send a secure link to help you create a brand new password.
              You’ll be back at the menu in no time.
            </p>
          </div>

          {isSent ? (
            <div className="text-center space-y-5">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-500">
                <CheckCircle size={32} />
              </div>
              <div className="space-y-2">
                <p className="text-gray-700 font-medium">
                  Check your inbox for the reset email.
                </p>
                <p className="text-sm text-gray-500">
                  Didn’t receive it? Make sure to check your spam folder or try
                  another email below.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsSent(false);
                  setEmail('');
                }}
              >
                Use a different email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  leftIcon={<Mail size={18} />}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                disabled={isSubmitting}
                className="rounded-xl shadow-lg shadow-primary/20 py-3"
              >
                {isSubmitting ? 'Sending reset link...' : 'Send reset link'}
              </Button>

              <div className="text-xs text-gray-500 text-center">
                Need more help?{' '}
                <Link
                  to="/contact"
                  className="text-primary font-semibold hover:underline"
                >
                  Contact support
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
