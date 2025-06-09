import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const AuthForm = ({ type = 'login', onSubmit }) => {
  const [form, setForm] = useState({
    email: '',
    birthdate: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === 'login') {
      onSubmit({
        email: form.email,
        senha: form.password, // enviar com o nome que backend espera
      });
    } else {
      onSubmit({
        email: form.email,
        senha: form.password,
        confirmarSenha: form.confirmPassword,
        birthdate: form.birthdate,
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h2 style={{ color: 'white', fontWeight: 'bold', marginBottom: '1rem' }}>
        {type === 'login' ? 'Login' : 'Cadastro'}
      </h2>

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 w-100" style={{ maxWidth: '400px' }}>
        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
        />

        {type === 'register' && (
          <Input
            type="date"
            name="birthdate"
            placeholder="Data de nascimento"
            value={form.birthdate}
            onChange={handleChange}
          />
        )}

        <Input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
        />

        {type === 'register' && (
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar senha"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        )}

        <Button type="submit">{type === 'login' ? 'Entrar' : 'Cadastrar'}</Button>
      </form>

     {type === 'register' && (
       <p
         style={{ marginTop: '1rem', color: '#61dafb', cursor: 'pointer' }}
         onClick={() => window.location.href = '/login'}
       >
         Já tenho cadastro
       </p>
     )}
    </>
  );

};

export default AuthForm;
