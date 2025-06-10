import React, { useEffect } from 'react';
import AuthLayout from '../components/organisms/AuthLayout';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

const handleLogin = async (data) => {
  try {
    const response = await fetch('https://system-task-horoscope-backend.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: data.email.split('@')[0],
        email: data.email,
        senha: data.senha,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      alert('Erro no Login: ' + (err.message || response.status));
      return;
    }

    const resData = await response.json();

    localStorage.setItem('userId', resData.userId);

    const profileResponse = await fetch(`https://system-task-horoscope-backend.onrender.com/profile?userId=${resData.userId}`);

    if (!profileResponse.ok) {
      alert('Erro ao buscar perfil: ' + profileResponse.status);
      return;
    }

    const profile = await profileResponse.json();
    localStorage.setItem('signo', profile.signo);

    //alert(`Perfil carregado. Signo: ${profile.signo}`);

    navigate('/horoscope');

  } catch (error) {
    alert('Erro ao logar: ' + error.message);
  }
};

  return <AuthLayout type="login" onSubmit={handleLogin} />;
};

export default LoginPage;
