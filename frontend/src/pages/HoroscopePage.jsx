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


  const [horoscopeData, setHoroscopeData] = useState(null);

  const translateText = async (text) => {
    const res = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: 'pt',
        format: 'text',
      }),
    });
    const data = await res.json();
    return data.translatedText;
  };

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
        const response = await fetch(`https://system-task-horoscope-backend.onrender.com/proxy/horoscope?sign=${signo}&period=${PeriodoSelecionado}`);
        if (!response.ok) throw new Error('Erro ao buscar horóscopo');

        const data = await response.json();

        const translatedDescription = await translateText(data.data.horoscope_data);

        setHoroscopo({
          description: translatedDescription,
          date: new Date().toISOString().split('T')[0]
        });

      } catch (error) {
        alert('Erro: ' + error.message);
        console.error('Erro no fetch do horóscopo:', error);
      }
    };

    fetchHoroscope();
  }, [signo, PeriodoSelecionado]);

  useEffect(() => {
    if (!signo) return;

    const fetchHoroscopeData = async () => {
      try {
        const res = await fetch(`https://system-task-horoscope-backend.onrender.com/horoscope-data?signo=${signo}`);
        if (!res.ok) throw new Error('Erro ao buscar dados do signo');

        const data = await res.json();
        setHoroscopeData(data);

      } catch (error) {
        console.error('Erro ao buscar dados do signo:', error);
      }
    };

    fetchHoroscopeData();
  }, [signo]);


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
          Bem-vindo(a) ao seu
          resumo {PeriodoSelecionado}.
        </h2>

        <div className="d-flex" style={{ gap: '1rem', flexWrap: 'nowrap' }}>
          <div style={{ flex: '2' }}>
            <TaskPanel />
          </div>
          <div style={{ flex: '2' }}>
            <HoroscopePanel
              horoscopo={horoscopo}
              signo={signo}
              icone={horoscopeData?.icone}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
