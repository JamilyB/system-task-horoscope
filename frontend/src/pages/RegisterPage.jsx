import React, { useEffect } from 'react';
import AuthLayout from '../components/organisms/AuthLayout';


const RegisterPage = () => {
    useEffect(() => {
      alert('Entrou na rota /register');
    }, []);

  const handleRegister = async (data) => {
    alert('Iniciando registro...');
    try {
      alert(`Enviando dados: ${JSON.stringify(data)}`);

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

      alert(`Resposta recebida. Status: ${response.status}`);

      if (!response.ok) {
        alert('Erro no registro. Status: ' + response.status);
        return;
      }

      const user = await response.json();
      alert(`Usuário registrado: ${user.nome}`);
    } catch (error) {
      alert('Erro ao registrar: ' + error.message);
    }
  };

  return <AuthLayout type="register" onSubmit={handleRegister} />;
};

export default RegisterPage;
