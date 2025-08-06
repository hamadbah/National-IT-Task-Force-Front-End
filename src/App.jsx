import { useContext, useState, useEffect } from 'react';
import NavBar from './components/NavBar/NavBar'
import { Routes, Route, useNavigate } from 'react-router';
import SignUpForm from './components/SignUpForm/SignUpForm'
import SignInForm from './components/SignInForm/SignInForm'
import { UserContext } from './contexts/UserContext';
import * as teamService from './services/teamService';
import TeamList from './components/TeamsList/TeamList';
import TeamForm from './components/TeamForm/TeamForm';
import TeamDetails from './components/TeamDetails/TeamDetails';

import TaskList from './components/TaskList/TaskList';
import * as taskService from './services/taskService';
import TaskDetails from './components/TaskDetails/TaskDetails';
import TaskForm from './components/TaskForm/TaskForm';

const App = () => {
  const [teams, setTeams] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

    useEffect(() => {
    const fetchAllTeams = async () => {
      const teamsData = await teamService.index();

      // update to set state:
      setTeams(teamsData);
    };
    if (user) fetchAllTeams();
  }, [user]);

  const handleAddTeam = async (teamFormData) => {
    const newTeam = await teamService.create(teamFormData);
    setTeams([newTeam, ...teams]);
    navigate('/teams');
  };

  const handleUpdateTeam = async (teamId, teamFormData) => {
    const updatedTeam = await teamService.update(teamId, teamFormData);
    setTeams(teams.map((team) => (teamId === team._id ? updatedTeam : team)));
    navigate(`/teams/${teamId}`);
};

const handleDeleteTeam = async (teamId) => {
    const deletedTeam = await teamService.deleteTeam(teamId);
    setTeams(teams.filter((team) => team._id !== deletedTeam._id));
    navigate('/teams');
};
  const [tasks, setTasks] = useState([]);


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
        <Route path='/' element={<h1>Welcome to National Task Force</h1>} />
        <Route path='/teams/new' element={<TeamForm handleAddTeam={handleAddTeam}/>}/>
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/teams' element={<TeamList teams={teams} handleDeleteTeam={handleDeleteTeam}/>} />
        <Route path='/teams/:teamId' element={<TeamDetails handleDeleteTeam={handleDeleteTeam}/>} />
        <Route path="/teams/:teamId/edit" element={<TeamForm handleUpdateTeam={handleUpdateTeam} />} />
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