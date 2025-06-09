import React from 'react';
import AuthForm from '../molecules/AuthForm';
import background from '../../assets/background.png'
const AuthLayout = ({ type = 'login', onSubmit }) => {
  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      width: '100vw',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '5%',
        transform: 'translateY(-50%)',
        width: '350px',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <AuthForm type={type} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default AuthLayout;
