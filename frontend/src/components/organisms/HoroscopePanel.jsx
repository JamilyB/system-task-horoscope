import React from 'react';

export const HoroscopePanel = ({ horoscopos }) => {
  const h = horoscopos[0]; // Como só tem um horóscopo por vez

  return (
    <div className="card p-3">
      <h3 className="text-center mb-3">Horóscopo</h3>
      <p><strong>Descrição:</strong> {h.description}</p>
      <p><strong>Compatibilidade:</strong> {h.compatibility}</p>
      <p><strong>Humor:</strong> {h.mood}</p>
      <p><strong>Cor:</strong> {h.color}</p>
      <p><strong>Número da Sorte:</strong> {h.lucky_number}</p>
      <p><strong>Hora da Sorte:</strong> {h.lucky_time}</p>
    </div>
  );
};
