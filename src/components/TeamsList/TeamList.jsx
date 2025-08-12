import { Link } from 'react-router';


const TeamList = (props) => {
  return (
    <main className="container-fluid bg-secondary min-vh-100 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 text-white">Team Members</h1>
        <Link to="/teams/new" className="btn btn-danger">
          Add Member
        </Link>
      </div>

      {props.teams.length === 0 ? (
        <p className="text-muted text-center">No team members found.</p>
      ) : (
        <div className="row g-4">
          {props.teams.map((team) => (
            <div className="col-md-4" key={team._id}>
              <div className="card card-hover h-100 shadow-sm border-0 text-center d-flex justify-content-center custom-card">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <h5 className="card-title mb-3">
                    <Link
                      to={`/teams/${team._id}`}
                      className="text-decoration-none text-danger"
                    >
                      {team.name}
                    </Link>
                  </h5>
                  <p className="mb-1"><strong>Speciality:</strong> {team.speciality}</p>
                  <p className="mb-1"><strong>Mobile:</strong> {team.mobileNo}</p>
                  <p className="mb-0"><strong>Email:</strong> {team.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default TeamList;
