import React, { useEffect } from 'react';
import AuthLayout from '../components/organisms/AuthLayout';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
    }, []);

  const handleRegister = async (data) => {

    try {

      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: data.email.split('@')[0],
          email: data.email,
          senha: data.senha,
          confirmarSenha: data.confirmarSenha,
          birthdate: data.birthdate,
        }),
      });

      if (!response.ok) {
        alert('Erro no registro. Status: ' + response.status);
        return;
      }

      const user = await response.json();

      navigate('/login');

    } catch (error) {
      alert('Erro ao registrar: ' + error.message);
    }
  };

  return <AuthLayout type="register" onSubmit={handleRegister} />;
};

export default RegisterPage;
