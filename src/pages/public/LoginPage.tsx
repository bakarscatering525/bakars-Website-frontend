import React from 'react';
import LoginForm from '@components/auth/LoginForm';
import Card from '@components/common/Card';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        <Card className="max-w-md mx-auto" padding="lg">
          <LoginForm />
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
