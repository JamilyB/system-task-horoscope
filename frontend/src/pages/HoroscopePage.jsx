import { HoroscopePanel } from '../components/organisms/HoroscopePanel';
import Button from '../components/atoms/Button';
import { TaskPanel } from '../components/organisms/TaskPanel';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const HoroscopePage = () => {
  const navigate = useNavigate();
  const [signo, setSigno] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState('today'); // Mantido, mas é só estético

  const [horoscopo, setHoroscopo] = useState({
    horoscope: '',
    date: ''
  });

  useEffect(() => {
    const userSigno = localStorage.getItem('signo');
    if (!userSigno) {
      alert('Usuário não autenticado. Redirecionando...');
      navigate('/login');
    } else {
      setSigno(userSigno);
    }
  }, [navigate]);

  useEffect(() => {
    if (!signo) return;

    // Desativado temporariamente
    /*
    const fetchHoroscope = async () => {
      try {
        const response = await fetch(`https://ohmanda.com/api/horoscope/${signo}`);
        if (!response.ok) throw new Error('Erro ao buscar horóscopo');
        const data = await response.json();
        setHoroscopo(data);
      } catch (error) {
        alert('Erro: ' + error.message);
      }
    };

    fetchHoroscope();
    */

    // Mock para continuar o desenvolvimento:
    setHoroscopo({
      horoscope: 'Em breve seu horóscopo estará disponível!',
      date: new Date().toISOString().split('T')[0]
    });
  }, [signo]);


  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">
        Olá, <span className="text-primary fw-bold">{signo}</span>, bem-vindo(a) ao seu{' '}
        <span className="text-decoration-underline text-secondary">resumo {dataSelecionada}</span>.
      </h2>

      <div className="d-flex justify-content-center gap-3 mb-4">
        <Button onClick={() => setDataSelecionada('yesterday')}>Ontem</Button>
        <Button onClick={() => setDataSelecionada('today')}>Hoje</Button>
        <Button onClick={() => setDataSelecionada('tomorrow')}>Amanhã</Button>
      </div>

      <h2 className="text-center mb-4 fs-13 text-dark">
        <span>{horoscopo.date}</span>
      </h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <HoroscopePanel horoscopos={[horoscopo]} />
        </div>
        <div className="col-md-6">
          <TaskPanel />
        </div>
      </div>
    </div>
  );
};
