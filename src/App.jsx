import { useContext, useState, useEffect } from 'react';
import NavBar from './components/NavBar/NavBar'
import { Routes, Route, useNavigate } from 'react-router';
import SignUpForm from './components/SignUpForm/SignUpForm'
import SignInForm from './components/SignInForm/SignInForm'
import { UserContext } from './contexts/UserContext';
import TaskList from './components/TaskList/TaskList';
import * as taskService from './services/taskService';
import TaskDetails from './components/TaskDetails/TaskDetails';
import TaskForm from './components/TaskForm/TaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(UserContext)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllTasks = async () => {
      const tasksData = await taskService.index();

      // update to set state:
      setTasks(tasksData);
    };
    if (user) fetchAllTasks();
  }, [user]);

  const handleAddTask = async (taskFormData) => {
    const newTask = await taskService.create(taskFormData);
    setTasks([newTask, ...tasks]);
    navigate('/tasks');
  };

  const handleUpdateTask = async (taskId, taskFormData) => {
    const updatedTask = await taskService.update(taskId, taskFormData);
    setTasks(tasks.map((task) => (taskId === task._id ? updatedTask : task)));
    navigate(`/tasks/${taskId}`);
  };

  const handleDeleteTask = async (taskId) => {
    const deletedTask = await taskService.deleteTask(taskId);
    // Filter state using deletedTask._id:
    setTasks(tasks.filter((task) => task._id !== deletedTask._id));
    navigate('/tasks');
  };

  return (
    <>
      <NavBar />
      <Routes>
        <>
          {/* Protected routes (available only to signed-in users) */}
          <Route path='/tasks' element={<TaskList tasks={tasks} />} />
          <Route
            path='/tasks/:taskId'
            element={<TaskDetails handleDeleteTask={handleDeleteTask} />}
          />
          <Route
            path='/tasks/new'
            element={<TaskForm handleAddTask={handleAddTask} />}
          />
          <Route
            path='/tasks/:taskId/edit'
            element={<TaskForm handleUpdateTask={handleUpdateTask} />}
          />
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/sign-in' element={<SignInForm />} />
        </>
      </Routes>
    </>
  );

}

export default App