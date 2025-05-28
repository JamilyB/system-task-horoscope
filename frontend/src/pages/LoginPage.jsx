import React, { useEffect } from 'react';
import AuthLayout from '../components/organisms/AuthLayout';

const LoginPage = () => {

  useEffect(() => {
    alert('Entrou na rota /login');
  }, []);

  const handleLogin = async (data) => {
    alert('Iniciando Login...');
    try {
      alert(`Enviando dados: ${JSON.stringify(data)}`);

      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: data.email.split('@')[0],
          email: data.email,
          senha: data.senha,
        }),
      });

      alert(`Resposta recebida. Status: ${response.status}`);

      if (!response.ok) {
        alert('Erro no Login. Status: ' + response.status);
        return;
      }

      const message = await response.text();  // Recebe resposta como texto

      alert(`Autenticado com sucesso! Email: ${data.email}\nMensagem do servidor: ${message}`);

    } catch (error) {
      alert('Erro ao logar: ' + error.message);
    }
  };

  return <AuthLayout type="login" onSubmit={handleLogin} />;
};

export default LoginPage;
