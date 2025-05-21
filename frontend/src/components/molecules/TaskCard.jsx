export const TaskCard = ({ descricao, data, time }) => {
  return (
    <div className="card p-3 mb-2 shadow-sm">
      <p>{descricao}</p>
      <small className="text-muted">Data: {data}</small>
      <small className="text-muted">Hora: {time}</small>
    </div>
  );
};
