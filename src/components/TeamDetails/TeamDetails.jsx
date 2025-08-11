import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react';
import * as teamService from '../../services/teamService';

const TeamDetails = (props) => {
  const { teamId } = useParams();
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
    <main className="container mt-4">
      <h2 className="mb-3">{team.name}</h2>
      <p><strong>Speciality:</strong> {team.speciality}</p>
      <p><strong>Mobile:</strong> {team.mobileNo}</p>
      <p><strong>Email:</strong> {team.email}</p>

      <div className="mt-4 d-flex gap-2">
        <Link to={`/teams/${teamId}/edit`}>
          <button type="button" className="btn btn-success">
            Edit
          </button>
        </Link>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </main>
  );
};

export default TeamDetails;
