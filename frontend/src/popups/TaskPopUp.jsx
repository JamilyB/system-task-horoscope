import { useEffect, useState } from 'react';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';

export const TaskPopUp = ({ show, onClose, onSaveTask, editingTask }) => {
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (editingTask) {
      setDescricao(editingTask.descricao);
      setData(editingTask.data);
      setTime(editingTask.time || '');
    } else {
      setDescricao('');
      setData('');
      setTime('');
    }
  }, [editingTask]);

  if (!show) return null;

  const handleSubmit = () => {
    if (!descricao || !data) {
      alert('Preencha descrição e data');
      return;
    }

    const updatedTask = { descricao, data, time };
    onSaveTask(updatedTask);  // ✅ Chama a função passada como prop
    onClose();
  };

  const backdropStyle = {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1050,
  };

  const popupStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    width: '320px',
    maxWidth: '90vw',
  };

  return (
    <div style={backdropStyle}>
      <div style={popupStyle}>
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
        <Button onClick={onClose} className="btn btn-secondary">
          Cancelar
        </Button>
      </div>
    </div>
  );
};
