import { useParams, useNavigate, Link } from 'react-router';
import { useEffect, useState } from 'react';
import * as teamService from '../../services/teamService';

const TeamDetails = (props) => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await teamService.show(teamId);
        setTeam(data);
      } catch (err) {
        console.error("Failed to fetch team", err);
      }
    };

    fetchTeam();
  }, [teamId]);

  const handleDelete = async () => {
    await props.handleDeleteTeam(teamId); 
};

  if (!team) return <p>Loading team details...</p>;

  return (
    <main>
      <h2>{team.name}</h2>
      <p><strong>Speciality:</strong> {team.speciality}</p>
      <p><strong>Mobile:</strong> {team.mobileNo}</p>
      <p><strong>Email:</strong> {team.email}</p>

      <div>
        <Link to={`/teams/${teamId}/edit`}> <button type="button">Edit</button> </Link>
        <button type="button" onClick={handleDelete}> Delete </button>
      </div>
    </main>
  );
};

export default TeamDetails;