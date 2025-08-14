import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import * as taskService from '../../services/taskService';

const TaskForm = (props) => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: '',
    duration: '',
    assignedTo: '',
    dueDate: ''
  });

  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await taskService.show(taskId);
      setFormData(taskData);
    };
    if (taskId) fetchTask();
    return () => setFormData({ name: '', description: '', status: '', duration: '', assignedTo: '', dueDate: '' });
  }, [taskId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (taskId) {
      props.handleUpdateTask(taskId, formData);
    } else {
      props.handleAddTask(formData);
    }
  };

  return (
    <main className="container-fluid bg-secondary min-vh-100 py-4">
      <div className="container" style={{ maxWidth: '1600px' }}>
        <h1 className="mb-4 text-white">{taskId ? 'Edit Task' : 'New Task'}</h1>
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm bg-light">
          <div className="mb-3">
            <label htmlFor="name-input" className="form-label">Task</label>
            <input
              required
              type="text"
              name="name"
              id="name-input"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description-input" className="form-label">Description</label>
            <input
              required
              type="text"
              name="description"
              id="description-input"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="duration" className="form-label">Duration</label>
            <select
              id="duration"
              name="duration"
              className="form-select"
              value={formData.duration}
              onChange={handleChange}
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
            <label htmlFor="status" className="form-label">Status</label>
            <select
              id="status"
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Status --</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" onClick={handleCancel} className="btn btn-danger">Cancel</button>
          </div>

        </form>
      </div>
    </main>
  );
};

export default TaskForm;
