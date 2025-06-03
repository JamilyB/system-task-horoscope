import { HoroscopePanel } from '../components/organisms/HoroscopePanel';
import { Title } from '../components/atoms/Title';
import Button from '../components/atoms/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Home = () => {

  const navigate = useNavigate();

  return (
      <div>
        <button onClick={() => navigate('/login')} style={{ padding: '10px', backgroundColor: '#FF6F61', color: '#fff' }}>
          Login
        </button>
        <button onClick={() => navigate('/register')} style={{ padding: '10px', backgroundColor: '#FF6F61', color: '#fff' }}>
          Registrar
        </button>
      </div>
  );
};
