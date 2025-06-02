import signoIcon from '../../assets/signo.png'; // ajuste o caminho conforme sua estrutura

export const HoroscopePanel = ({ horoscopo, signo }) => {
  return (
    <div
      className="card p-3 my-3 text-white d-flex flex-column align-items-center"
      style={{ backgroundColor: '#52358d' }}
    >
      <div className="d-flex align-items-center mb-3">
        <img src={signoIcon} alt="Ícone do signo" style={{ width: '40px', marginRight: '10px' }} />
        <h3 className="mb-0 text-capitalize">{signo}</h3>
      </div>
      <p className="text-center">{horoscopo.description}</p>
    </div>
  );
};
