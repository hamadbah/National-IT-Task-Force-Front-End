import { Link } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const MinistryList = (props) => {
  const { user } = useContext(UserContext);

  return (
    <main className="container-fluid bg-secondary min-vh-100 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 text-white">Ministries List</h1>
        {user && user.role === 'admin' && (
          <Link to="/ministries/new" className="btn btn-danger">
            Add Ministry
          </Link>
        )}
      </div>

      {props.ministries.length === 0 ? (
        <p className="text-muted text-center">No ministry found.</p>
      ) : (
        <div className="row g-4">
          {props.ministries.map((ministry) => (
            <div className="col-md-4" key={ministry._id}>
              <div className="card card-hover h-100 shadow-sm border-0 text-center d-flex justify-content-center custom-card">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <h5 className="card-title mb-3">
                    <Link
                      to={`/ministries/${ministry._id}`}
                      className="text-decoration-none text-danger"
                    >
                      {ministry.name}
                    </Link>
                  </h5>
                  <p className="mb-1"><strong>Phone:</strong> {ministry.Phone}</p>
                  <p className="mb-1"><strong>Website:</strong> {ministry.website}</p>
                  <p className="mb-1"><strong>Email:</strong> {ministry.email}</p>
                  <p className="mb-0"><strong>Opening Hours:</strong> {ministry.OpeningHours}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MinistryList;
