import Button from '../atoms/Button';

function PeriodSelector({ PeriodoSelecionado, setPeriodoSelecionado }) {
  return (
    <div className="d-flex justify-content-center gap-3 mb-4">
      <Button
        onClick={() => setPeriodoSelecionado('monthly')}
        active={PeriodoSelecionado === 'monthly'}
        changeOnActive
      >
        Mensal
      </Button>
      <Button
        onClick={() => setPeriodoSelecionado('weekly')}
        active={PeriodoSelecionado === 'weekly'}
        changeOnActive
      >
        Semanal
      </Button>
      <Button
        onClick={() => setPeriodoSelecionado('daily')}
        active={PeriodoSelecionado === 'daily'}
        changeOnActive
      >
        Diário
      </Button>
    </div>
  );
}

export default PeriodSelector;
