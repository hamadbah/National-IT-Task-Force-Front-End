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
import MinistryList from './components/MinistryList/MinistryList';
import MinistryForm from './components/MinistryForm/MinistryForm';
import * as ministryService from './services/ministryService';
import MinistryDetails from './components/MinistryDetails/MinistryDetails';
import TaskList from './components/TaskList/TaskList';
import * as taskService from './services/taskService';
import TaskDetails from './components/TaskDetails/TaskDetails';
import TaskForm from './components/TaskForm/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../src/App.css';
import LandingPage from './components/LandingPage/LandingPage';


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
  //ministry
  const [ministries, setMinistries] = useState([]);
  useEffect(() => {
    const fetchAllMinistries = async () => {
      const ministriesData = await ministryService.index();
      // update to set state:
      setMinistries(ministriesData);
    };
    if (user) fetchAllMinistries();
  }, [user]);
  const handleAddMinistry = async (ministryFormData) => {
    const newMinistry = await ministryService.create(ministryFormData);
    setMinistries([newMinistry, ...ministries]);
    navigate('/ministries');
  };
  const handleUpdateMinistry = async (ministryId, ministryFormData) => {
    const updatedMinistry = await ministryService.update(ministryId, ministryFormData);
    setMinistries(ministries.map((ministry) => (ministryId === ministry._id ? updatedMinistry : ministry)));
    navigate(`/ministries/${ministryId}`);
  };
  const handleDeleteMinistry = async (ministryId) => {
    const deletedMinistry = await ministryService.deleteMinistry(ministryId);
    // Filter state using deletedMinistry._id:
    setMinistries(ministries.filter((ministry) => ministry._id !== deletedMinistry._id));
    navigate('/ministries');
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
        <Route path='/' element={<LandingPage />}/>
        <Route path='/teams/new' element={<TeamForm handleAddTeam={handleAddTeam} />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/teams' element={<TeamList teams={teams} handleDeleteTeam={handleDeleteTeam} />} />
        <Route path='/teams/:teamId' element={<TeamDetails handleDeleteTeam={handleDeleteTeam} />} />
        <Route path="/teams/:teamId/edit" element={<TeamForm handleUpdateTeam={handleUpdateTeam} />} />
        <Route path='/ministries' element={<MinistryList ministries={ministries} />} />
        <Route path='/ministries/:ministryId' element={<MinistryDetails handleDeleteMinistry={handleDeleteMinistry} />} />
        <Route path='/ministries/new' element={<MinistryForm handleAddMinistry={handleAddMinistry} />} />
        <Route path='/ministries/:ministryId/edit' element={<MinistryForm handleUpdateMinistry={handleUpdateMinistry} />} />
        <Route path='/tasks' element={<TaskList tasks={tasks} />} />
        <Route path='/tasks/:taskId' element={<TaskDetails handleDeleteTask={handleDeleteTask} />} />
        <Route path='/tasks/new' element={<TaskForm handleAddTask={handleAddTask} />} />
        <Route path='/tasks/:taskId/edit' element={<TaskForm handleUpdateTask={handleUpdateTask} />} />
      </Routes>
    </>
  );

}
export default App