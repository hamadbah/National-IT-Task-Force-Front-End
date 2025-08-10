import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react';
import * as taskService from '../../services/taskService';

const TaskDetails = (props) => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await taskService.show(taskId);
        setTask(data);
      } catch (err) {
        console.error("Failed to fetch task", err);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleDelete = async () => {
    await props.handleDeleteTask(taskId);
  };

  if (!task) return <p>Loading task details...</p>;

  return (
    <main>
      <h2>{task.name}</h2>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Assigned To:</strong> {task.ministry && task.ministry.length > 0
        ? task.ministry.map(m => m.name).join(', ')
        : 'No ministries assigned'}
      </p>
      <p><strong>Duration:</strong> {task.duration}</p>

      <div>
        <Link to={`/tasks/${taskId}/edit`}> <button type="button">Edit</button> </Link>
        <button type="button" onClick={handleDelete}> Delete </button>
      </div>
    </main>
  );
};

export default TaskDetails;