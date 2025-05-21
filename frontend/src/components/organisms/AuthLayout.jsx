import React from 'react';
import AuthForm from '../molecules/AuthForm';

const AuthLayout = ({ type = 'login', onSubmit }) => {
  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      width: '100vw',
      backgroundColor: 'yellow' // retângulo amarelo cobrindo toda a tela
    }}>
      {/* Card posicionado no lado direito, centralizado verticalmente */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '5%',
        transform: 'translateY(-50%)',
        width: '350px',
        backgroundColor: 'white',
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
