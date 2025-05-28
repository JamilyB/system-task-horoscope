import { useState } from 'react';
import { TaskCard } from '../molecules/TaskCard';
import { TaskPopUp } from '../../popups/TaskPopUp';

export const TaskPanel = () => {
  const [tasks, setTasks] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Salva ou edita a tarefa no estado local
  const handleSaveTask = (newTask) => {
    if (editingIndex !== null) {
      const updated = [...tasks];
      updated[editingIndex] = newTask;
      setTasks(updated);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }
    setShowPopUp(false);
  };

  // Envia a tarefa para a API
  const handleSaveTaskToAPI = async (task) => {
    try {
      const response = await fetch('http://localhost:8080/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error('Erro ao salvar');
      const data = await response.json();
      console.log('Task salva:', data);
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar tarefa!');
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowPopUp(true);
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div>
      <h3>Agendamentos</h3>
      {tasks.length === 0 && <p>Nenhuma tarefa cadastrada.</p>}
      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          {...task}
          onEdit={() => handleEdit(index)}
          onDelete={() => handleDelete(index)}
        />
      ))}

      <button
        className="btn btn-primary mt-3"
        onClick={() => setShowPopUp(true)}
      >
        Adicionar tarefa
      </button>

      <TaskPopUp
        show={showPopUp}
        onClose={() => {
          setShowPopUp(false);
          setEditingIndex(null);
        }}
        onSaveTask={(task) => {
          handleSaveTask(task);
          handleSaveTaskToAPI(task);
        }}
        editingTask={editingIndex !== null ? tasks[editingIndex] : null}
      />
    </div>
  );
};
