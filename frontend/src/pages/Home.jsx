import { HoroscopePanel } from '../components/organisms/HoroscopePanel';
import { Title } from '../components/atoms/Title';
import { useState } from 'react';

export const DailyResumePage = () => {
  const [horoscopo, setHoroscopo] = useState({
    data: '9 de Maio de 2026',
    descricao: 'Dia de sorte!',
    resumo: 'O dia será favorável para novos começos.',
    compatibilidade: 'Áries e Leão',
    humor: 'Feliz',
    cor: 'FF6F61',
    numero: 7,
    horario: '14:00',
  });

  return (
    <div className="p-4 space-y-4">
      <Title className="text-center">Horoscopo do Dia</Title>
      <div className="flex gap-4">
        <HoroscopePanel data={horoscopo} />
      </div>
    </div>
  );
};
