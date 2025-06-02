import { HoroscopePanel } from '../components/organisms/HoroscopePanel';
import { TaskPanel } from '../components/organisms/TaskPanel';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PeriodSelector from '../components/molecules/PeriodSelector';
import background from '../assets/background2.png'

export const HoroscopePage = () => {
  const navigate = useNavigate();
  const [signo, setSigno] = useState('');
  const [PeriodoSelecionado, setPeriodoSelecionado] = useState('daily');

  const [horoscopo, setHoroscopo] = useState({
    description: '',
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
    if (!signo || !PeriodoSelecionado) return;

    const fetchHoroscope = async () => {
      try {
        const response = await fetch(`http://localhost:8080/proxy/horoscope?sign=${signo}&period=${PeriodoSelecionado}`);
        if (!response.ok) throw new Error('Erro ao buscar horóscopo');

        // Tenta interpretar JSON, pode lançar erro se receber HTML
        const data = await response.json();

        alert(JSON.stringify(data, null, 2));

        setHoroscopo({
          description: data.data.horoscope_data,
          date: new Date().toISOString().split('T')[0]
        });

      } catch (error) {
        alert('Erro: ' + error.message);
        console.error('Erro no fetch do horóscopo:', error);
      }
    };

    fetchHoroscope();
  }, [signo, PeriodoSelecionado]);


  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100%',
        color: 'white',
      }}
    >
      <div className="container py-4">
          <PeriodSelector PeriodoSelecionado={PeriodoSelecionado} setPeriodoSelecionado={setPeriodoSelecionado} />
        <h2 className="text-center mb-4">
          Olá, <span className="text-primary fw-bold">{signo}</span>, bem-vindo(a) ao seu{' '}
          <span className="text-decoration-underline text-secondary">resumo {PeriodoSelecionado}</span>.
        </h2>

        <div className="d-flex" style={{ gap: '1rem', flexWrap: 'nowrap' }}>
          <div style={{ flex: '2' }}>
            <TaskPanel />
          </div>
          <div style={{ flex: '2' }}>
            <HoroscopePanel horoscopo={horoscopo} signo={signo} />
          </div>
        </div>
      </div>
    </div>

  );
};
