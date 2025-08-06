import { Link } from 'react-router';

const TeamList = (props) => {
  return (
    <main>
      <div>
        <Link to="/teams/new">
          <button type="button">Add member</button>
        </Link>
      </div>

      {props.teams.length === 0 ? (
        <p>No team members found.</p>
      ) : (
        props.teams.map((team) => (
          <article key={team._id}>
            <header>
              <h2>
                <Link to={`/teams/${team._id}`}>{team.name}</Link>
              </h2>
              <p>Speciality: {team.speciality}</p>
            </header>
            <p><strong>Mobile:</strong> {team.mobileNo}</p>
            <p><strong>Email:</strong> {team.email}</p>
          </article>
        ))
      )}
    </main>
  );
};

export default TeamList;
