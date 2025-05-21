import { Text } from '../atoms/Text';
import { ColorDaily } from '../atoms/ColorDaily';

export const HoroscopeCard = ({ data, descricao, resumo, compatibilidade, humor, cor, numero, horario }) => (
  <div className="card p-4 shadow-sm border-0">
    <div className="card-body">
      <Text className="mt-2">{descricao}</Text>
      <Text className="fst-italic">{resumo}</Text>
      <Text className="mt-2">Compatibilidade: <strong>{compatibilidade}</strong></Text>
      <Text>Humor: <strong>{humor}</strong></Text>
      <div className="d-flex align-items-center gap-2 my-2">
        Cor da sorte: <ColorDaily color={cor} />
      </div>
      <Text>Número da sorte: <strong>{numero}</strong></Text>
      <Text>Horário da sorte: <strong>{horario}</strong></Text>
    </div>
  </div>
);

