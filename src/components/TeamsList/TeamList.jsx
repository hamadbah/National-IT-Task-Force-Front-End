import { Link } from 'react-router';

const TeamList = (props) => {
  return (
    <main>
      <div>
        <Link to="/teams/new">
          <button type="button">Add member</button>
        </Link>
      </div>
      {props.teams.map((team) => (
        <Link key={team._id} to={`/teams/${team._id}`}>
          <article>
            <header>
              <h2>{team.name}</h2>
              <p>Speciality: {team.speciality}</p>
            </header>
            <p><strong>Mobile:</strong> {team.mobileNo}</p>
            <p><strong>Email:</strong> {team.email}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default TeamList;
