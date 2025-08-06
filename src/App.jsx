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
      </Routes>
    </>
  )
}

export default App