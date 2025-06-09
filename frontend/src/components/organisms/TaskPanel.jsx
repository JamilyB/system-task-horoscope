import { useState, useEffect } from 'react';
import { TaskCard } from '../molecules/TaskCard';
import { TaskPopUp } from '../../popups/TaskPopUp';
import Button from '../atoms/Button';

export const TaskPanel = () => {
  const [tasks, setTasks] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;
        const response = await fetch(`https://system-task-horoscope-backend.onrender.com/task?userId=${userId}`);
        if (!response.ok) throw new Error('Erro ao buscar tarefas');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

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


  const handleSaveTaskToAPI = async (task) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('Usuário não autenticado');

      const taskToSend = {
        ...task,
        user_id: Number(userId),
        data_task: task.data,
        time_task: task.time
      };

        delete taskToSend.data;
        delete taskToSend.time;

        let response;

        if (editingIndex !== null) {
          const taskId = tasks[editingIndex].id;
          response = await fetch(`https://system-task-horoscope-backend.onrender.com/task/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskToSend),
          });
        } else {
          response = await fetch('https://system-task-horoscope-backend.onrender.com/task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskToSend),
          });
        }

      if (!response.ok) {
        alert('Erro na resposta da API: ' + response.status + ' ' + response.statusText);
        throw new Error('Erro ao salvar tarefa');
      }

      const savedTask = await response.json();

      if (editingIndex !== null) {
        const updated = [...tasks];
        updated[editingIndex] = savedTask;
        setTasks(updated);
        setEditingIndex(null);
      } else {
        setTasks([...tasks, savedTask]);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar tarefa! ' + error.message);
    }
  };


  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowPopUp(true);
  };

  const handleDelete = async (index) => {
    try {
      const taskToDelete = tasks[index];
      const response = await fetch(`https://system-task-horoscope-backend.onrender.com/task/${taskToDelete.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar tarefa');

      const updated = tasks.filter((_, i) => i !== index);
      setTasks(updated);
    } catch (error) {
      console.error(error);
      alert('Erro ao deletar tarefa');
    }
  };

  return (
    <div >
    <div className="d-flex align-items-center justify-content-between mb-2">
      <h3>Agendamentos</h3>
      <Button onClick={() => setShowPopUp(true)}>
        + Adicionar tarefa
      </Button>
    </div>

      {tasks.length === 0 && <p>Nenhuma tarefa cadastrada.</p>}
      {tasks.map((task, index) => (
        <TaskCard
          key={task.id || index}
          {...task}
          onEdit={() => handleEdit(index)}
          onDelete={() => handleDelete(index)}
        />
      ))}

      <TaskPopUp
        show={showPopUp}
        onClose={() => {
          setShowPopUp(false);
          setEditingIndex(null);
        }}
        onSaveTask={(task) => {
          handleSaveTaskToAPI(task);
        }}
        editingTask={editingIndex !== null ? tasks[editingIndex] : null}
      />
    </div>
  );
};
