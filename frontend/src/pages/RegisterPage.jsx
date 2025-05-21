import React from 'react';
import AuthLayout from '../components/organisms/AuthLayout';

const RegisterPage = () => {
  const handleRegister = (data) => {
    console.log('Register data:', data);
  };

  return <AuthLayout type="register" onSubmit={handleRegister} />;
};

export default RegisterPage;
