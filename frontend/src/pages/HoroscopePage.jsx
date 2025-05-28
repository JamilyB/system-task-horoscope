import { HoroscopePanel } from '../components/organisms/HoroscopePanel';
import { Title } from '../components/atoms/Title';
import Button from '../components/atoms/Button';
import { TaskPanel } from '../components/organisms/TaskPanel';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const HoroscopePage = () => {
  const navigate = useNavigate();

  const [dataSelecionada, setDataSelecionada] = useState('hoje');
  const signo = 'Libra';

  const [horoscopo, setHoroscopo] = useState({
    data: '9 de Maio de 2026',
    descricao: 'Dia de sorte!',
    resumo: 'O dia será favorável para novos começos. testando o limite dessa pagina, ate onde vai minha linha',
    compatibilidade: 'Áries e Leão',
    humor: 'Feliz',
    cor: 'FF6F61',
    numero: 7,
    horario: '14:00',
  });


  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">
        Olá, <span className="text-primary fw-bold">{signo}</span>, bem-vindo(a) ao seu{' '}
        <span className="text-decoration-underline text-secondary">resumo {dataSelecionada}</span>.
      </h2>

      <div className="d-flex justify-content-center gap-3 mb-4">
        <Button onClick={() => setDataSelecionada('ontem')}>Ontem</Button>
        <Button onClick={() => setDataSelecionada('hoje')}>Hoje</Button>
        <Button onClick={() => setDataSelecionada('amanhã')}>Amanhã</Button>
      </div>

      <h2 className="text-center mb-4 fs-13 text-dark">
        <span>{horoscopo.data}</span>
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
