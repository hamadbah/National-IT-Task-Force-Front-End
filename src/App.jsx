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
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<h1>Welcome to National Task Force</h1>} />
        <Route path='/teams/new' element={<TeamForm handleAddTeam={handleAddTeam} />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/teams' element={<TeamList teams={teams} handleDeleteTeam={handleDeleteTeam} />} />
        <Route path='/teams/:teamId' element={<TeamDetails handleDeleteTeam={handleDeleteTeam} />} />
        <Route path="/teams/:teamId/edit" element={<TeamForm handleUpdateTeam={handleUpdateTeam} />} />
        <Route path='/ministries' element={<MinistryList ministries={ministries} />} />
        <Route path='/ministries/:ministryId' element={<MinistryDetails handleDeleteMinistry={handleDeleteMinistry} />}/>
        <Route path='/ministries/new' element={<MinistryForm handleAddMinistry={handleAddMinistry} />}/>
        <Route path='/ministries/:ministryId/edit' element={<MinistryForm handleUpdateMinistry={handleUpdateMinistry} />}/>
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
      </Routes>
    </>
  );
}
export default App