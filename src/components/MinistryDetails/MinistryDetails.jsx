import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react';
import * as ministryService from '../../services/ministryService';
import * as taskService from '../../services/taskService';

const MinistryDetails = (props) => {
  const { ministryId } = useParams();
  const [ministry, setMinistry] = useState(null);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDuration, setTaskDuration] = useState('');
  const [taskStatus, setTaskStatus] = useState('Pending');

  useEffect(() => {
    const fetchMinistry = async () => {
      try {
        const data = await ministryService.show(ministryId);
        setMinistry(data);
      } catch (err) {
        console.error("Failed to fetch ministry", err);
      }
    };
    fetchMinistry();
  }, [ministryId]);
  const handleDelete = async () => {
    await props.handleDeleteMinistry(ministryId);
  };
  const handleAddTaskClick = () => {
    setShowAddTaskForm(true);
  };
  const resetTaskForm = () => {
    setTaskName('');
    setTaskDescription('');
    setTaskDuration('');
    setTaskStatus('');
  };
  const handleAddTaskSubmit = async (e) => {
    e.preventDefault();

    if (!taskName || !taskDescription || !taskDuration || !taskStatus) {
      alert('Please fill all task fields.');
      return;
    }

    try {
      const newTask = await taskService.create({
        name: taskName,
        description: taskDescription,
        duration: taskDuration,
        status: taskStatus,
        ministry: [ministryId],
      });

      const updatedTaskIds = ministry.tasks
        ? [...ministry.tasks.map(t => t._id), newTask._id]
        : [newTask._id];

      const updatedMinistry = await ministryService.assignTasks(ministryId, updatedTaskIds);

      setMinistry(updatedMinistry);
      resetTaskForm();
      setShowAddTaskForm(false);
    } catch (error) {
      console.error("Failed to create or assign task", error);
      alert("Failed to create or assign task");
    }
  };

  if (!ministry) return <p>Loading ministry details...</p>;

  return (
    <main>
      <h2>{ministry.name}</h2>
      <p><strong>Phone:</strong> {ministry.Phone}</p>
      <p><strong>Email:</strong> {ministry.email}</p>
      <p><strong>Website:</strong> {ministry.website}</p>
      <p><strong>Opening Hours:</strong> {ministry.OpeningHours}</p>

      <div>
        <Link to={`/ministries/${ministryId}/edit`}>
          <button type="button">Edit Ministry</button>
        </Link>
        <button type="button" onClick={handleDelete}>Delete Ministry</button>
      </div>

      <hr />

      <h3>Assigned Tasks:</h3>
      {ministry.tasks && ministry.tasks.length > 0 ? (
        <ul>
          {ministry.tasks.map(task => (
            <li key={task._id}>
              <Link to={`/tasks/${task._id}`}>
                {task.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks assigned yet.</p>
      )}

      <button type="button" onClick={handleAddTaskClick}>Add Task</button>

      {showAddTaskForm && (
        <form onSubmit={handleAddTaskSubmit}>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Description:
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Duration:
              <select
                value={taskDuration}
                onChange={(e) => setTaskDuration(e.target.value)}
                required
              >
                <option value="">-- Select Duration --</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6-12 months">6-12 months</option>
                <option value="1 year or more">1 year or more</option>
              </select>
            </label>
          </div>

          <div>
            <label>
              Status:
              <input
                type="text"
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
                required
              />
            </label>
          </div>

          <button type="submit">Create and Assign Task</button>
          <button type="button" onClick={() => setShowAddTaskForm(false)}>Cancel</button>
        </form>
      )}
    </main>
  );
};

export default MinistryDetails;
