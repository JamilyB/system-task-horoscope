import { useState, useEffect } from 'react';
import { TaskCard } from '../molecules/TaskCard';
import { TaskPopUp } from '../../popups/TaskPopUp';

export const TaskPanel = () => {
  const [tasks, setTasks] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Carregar tarefas do backend ao montar o componente
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;  // só busca se tiver userId
        const response = await fetch(`http://localhost:8080/task?userId=${userId}`);
        if (!response.ok) throw new Error('Erro ao buscar tarefas');
        const data = await response.json();
        setTasks(data);  // Assumindo que backend retorna array de tasks
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

  // Função que chama o backend para salvar a task e atualiza estado
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

        alert('Enviando para API:\n' + JSON.stringify(taskToSend, null, 2));

        let response;  // declare fora do if para usar depois

        if (editingIndex !== null) {
          const taskId = tasks[editingIndex].id;
          response = await fetch(`http://localhost:8080/task/${taskId}`, {
            method: 'PUT',  // ou PATCH, conforme sua API
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskToSend),
          });
        } else {
          response = await fetch('http://localhost:8080/task', {
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

      alert('Resposta da API:\n' + JSON.stringify(savedTask, null, 2));

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
      const response = await fetch(`http://localhost:8080/task/${taskToDelete.id}`, {
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
    <div>
      <h3>Agendamentos</h3>

      {tasks.length === 0 && <p>Nenhuma tarefa cadastrada.</p>}
      {tasks.map((task, index) => (
        <TaskCard
          key={task.id || index}
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
          // Salvar na API antes de atualizar localmente
          handleSaveTaskToAPI(task);
        }}
        editingTask={editingIndex !== null ? tasks[editingIndex] : null}
      />
    </div>
  );
};
