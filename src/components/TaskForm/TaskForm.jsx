

import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as taskService from '../../services/taskService';

const TaskForm = (props) => {
  const { taskId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: '',
    assignedTo: '',
    dueDate: ''
  });

  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await taskService.show(taskId);
      setFormData(taskData);
    };
    if (taskId) fetchTask();
    return () => setFormData({ name: '', description: '', status: '', assignedTo: '', dueDate: '' });
  }, [taskId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
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
    <main>
      <h1>{taskId ? 'Edit Task' : 'New Task'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name-input'>Task: </label>
        <input
          required
          type='text'
          name='name'
          id='name-input'
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor='description-input'>Description: </label>
        <input
          required
          type='text'
          name='description'
          id='description-input'
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor='duration'>Duration:</label>
        <select
          id='duration'
          name='duration'
          value={formData.duration}
          onChange={handleChange}
          required>
          <option value=''>-- Select Duration --</option>
          <option value='1-3 months'>1-3 months</option>
          <option value='3-6 months'>3-6 months</option>
          <option value='6-12 months'>6-12 months</option>
          <option value='1 year or more'>1 year or more</option>
        </select>
        <label htmlFor='status'>Status:</label>
        <select
          id='status'
          name='status'
          value={formData.status}
          onChange={handleChange}
          required>
          <option value=''>-- Select Status --</option>
          <option value='Pending'>Pending</option>
          <option value='In Progress'>In Progress</option>
          <option value='Completed'>Completed</option>
        </select>
        <button type='submit'>SUBMIT</button>
      </form>
    </main>
  );
};

export default TaskForm;
