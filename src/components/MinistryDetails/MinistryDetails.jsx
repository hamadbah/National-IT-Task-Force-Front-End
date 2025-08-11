import { useParams, Link } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as ministryService from '../../services/ministryService';
import * as taskService from '../../services/taskService';

const MinistryDetails = (props) => {
  const { user } = useContext(UserContext);
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
    setTaskStatus('Pending');
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
    <main className="container mt-4">
      <h2>{ministry.name}</h2>
      <p><strong>Phone:</strong> {ministry.Phone}</p>
      <p><strong>Email:</strong> {ministry.email}</p>
      <p><strong>Website:</strong> {ministry.website}</p>
      <p><strong>Opening Hours:</strong> {ministry.OpeningHours}</p>

      {user && user.role === 'admin' && (
        <div className="mb-3 d-flex gap-2">
          <Link to={`/ministries/${ministryId}/edit`}>
            <button type="button" className="btn btn-primary">
              Edit Ministry
            </button>
          </Link>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            Delete Ministry
          </button>
        </div>
      )}

      <hr />

      <h3>Assigned Tasks:</h3>
      {ministry.tasks && ministry.tasks.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 mb-3">
          {ministry.tasks.map(task => (
            <div key={task._id} className="col">
              <div className="card card-hover h-100 shadow-sm custom-card">
                <div className="card-body d-flex align-items-center justify-content-center">
                  <Link to={`/tasks/${task._id}`} className="stretched-link text-decoration-none">
                    <h5 className="card-title text-center">{task.name} - {task.status}</h5>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No tasks assigned yet.</p>
      )}

      <button type="button" className="btn btn-success mb-3" onClick={handleAddTaskClick}>
        Add Task
      </button>

      {showAddTaskForm && (
        <form onSubmit={handleAddTaskSubmit} className="card p-3 mb-4 shadow-sm">
          <div className="mb-3">
            <label htmlFor="taskName" className="form-label">Name</label>
            <input
              id="taskName"
              type="text"
              className="form-control"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="taskDescription" className="form-label">Description</label>
            <textarea
              id="taskDescription"
              className="form-control"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              required
              rows={3}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="taskDuration" className="form-label">Duration</label>
            <select
              id="taskDuration"
              className="form-select"
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
          </div>

          <div className="mb-3">
            <label htmlFor="taskStatus" className="form-label">Status</label>
            <input
              id="taskStatus"
              type="text"
              className="form-control"
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              required
            />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              Create Task
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowAddTaskForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </main>
  );
};

export default MinistryDetails;
