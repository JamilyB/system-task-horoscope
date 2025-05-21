import React from 'react';
import AuthLayout from '../components/organisms/AuthLayout';

const LoginPage = () => {
  const handleLogin = (data) => {
    console.log('Login data:', data);
  };

  return <AuthLayout type="login" onSubmit={handleLogin} />;
};

export default LoginPage;
