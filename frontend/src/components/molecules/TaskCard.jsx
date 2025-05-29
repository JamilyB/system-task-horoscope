import { PencilSquare, Trash } from 'react-bootstrap-icons';

export const TaskCard = ({ descricao, data_task, time_task, onDelete, onEdit }) => {
  return (
    <div className="card p-3 mb-2 shadow-sm d-flex justify-content-between align-items-start flex-row">
      <div>
        <p className="mb-1">{descricao}</p>
        <small className="text-muted d-block">Data: {data_task}</small>
        <small className="text-muted d-block">Hora: {time_task}</small>
      </div>
      <div className="ms-2">
        <button className="btn btn-sm btn-outline-primary me-2" onClick={onEdit}>
          <PencilSquare />
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
          <Trash />
        </button>
      </div>
    </div>
  );
};
