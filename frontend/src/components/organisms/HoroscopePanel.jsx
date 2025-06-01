export const HoroscopePanel = ({ horoscopo }) => {
  return (
    <div className="card p-3 my-3">
      <h3 className="text-center mb-3">Horóscopo de {horoscopo.date}</h3>
      <p>{horoscopo.description}</p>
    </div>
  );
};
