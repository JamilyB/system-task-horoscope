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
      setData(editingTask.data_task || '');   // ajustar aqui
      setTime(editingTask.time_task || '');   // ajustar aqui
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

    // Monta objeto com os campos para enviar para o backend
    const updatedTask = { descricao, data, time };
    onSaveTask(updatedTask);
    onClose();
  };

  // ... estilos e JSX do popup ficam iguais

  return (
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
        <Button onClick={onClose} className="btn btn-secondary">
          Cancelar
        </Button>
      </div>
    </div>
  );
};
