import { useEffect, useState } from 'react';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';

export const TaskPopUp = ({ show, onClose, onSaveTask, editingTask }) => {
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [time, setTime] = useState('');


 useEffect(() => {
    if (editingTask) {
      setDescricao(editingTask.descricao || '');
      setData(editingTask.data_task || '');
      setTime(editingTask.time_task || '');
    } else if (show) {
      setDescricao('');
      setData('');
      setTime('');
    }
  }, [editingTask, show]);

  if (!show) return null;

  const handleSubmit = () => {
    if (!descricao || !data) {
      alert('Preencha descrição e data');
      return;
    }

    const updatedTask = { descricao, data, time };
    onSaveTask(updatedTask);
    onClose();
  };


return (
  <>
    <style>{`
      .cancel-btn {
        color: red !important;
        background-color: transparent !important;
        border-color: transparent !important;
        margin-left: 0.5rem; /* espaço entre botões */
      }
    `}</style>
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1050,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        width: '320px',
        maxWidth: '90vw',
        color: '#6e51b8', // texto roxo
      }}>
        <h4>{editingTask ? 'Editar tarefa' : 'Adicionar tarefa'}</h4>

        <Input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={{ width: '100%', marginBottom: '0.5rem', padding: '0.375rem 0.75rem' }}
        />
        <Input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          style={{ width: '100%', marginBottom: '1rem', padding: '0.375rem 0.75rem' }}
        />
        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ width: '100%', marginBottom: '1rem', padding: '0.375rem 0.75rem' }}
        />

        <Button onClick={handleSubmit} style={{ marginRight: '0.5rem' }}>
          {editingTask ? 'Salvar' : 'Adicionar'}
        </Button>
        <Button
          onClick={onClose}
          className="cancel-btn"
        >
          Cancelar
        </Button>
      </div>
    </div>
  </>
);


};
