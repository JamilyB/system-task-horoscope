import { useState } from 'react';
import { TaskCard } from '../molecules/TaskCard';
import { TaskPopUp } from '../../popups/TaskPopUp';

export const TaskPanel = () => {
  const [tasks, setTasks] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div>
      <h3>Agendamentos</h3>
      {tasks.length === 0 && <p>Nenhuma tarefa cadastrada.</p>}
      {tasks.map((task, index) => (
        <TaskCard key={index} {...task} />
      ))}

      <button className="btn btn-primary mt-3" onClick={() => setShowPopUp(true)}>
        Adicionar tarefa
      </button>

      <TaskPopUp
        show={showPopUp}
        onClose={() => setShowPopUp(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};
