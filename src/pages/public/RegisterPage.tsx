import React from 'react';
import RegisterForm from '@components/auth/RegisterForm';
import { Link } from 'react-router-dom';
import Logo from '@components/layout/Logo';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <Logo size="lg" />
          </Link>
        </div>

        {/* Register Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="font-heading text-3xl font-bold text-text mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">Join Bakar's Food & Catering today</p>
          </div>

          <RegisterForm redirectOnSuccess={true} />
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary font-semibold hover:text-primary-600"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
