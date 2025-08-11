import React, { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import logo from '../../assets/images/task-force.jpeg';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Home"
            width="80"
            height="60"
            className="d-inline-block align-top me-2"
          />
          <h3 className="mb-0">National IT Task Force</h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-2">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <>
                    <li className="nav-item">
                      <Link className="btn btn-secondary text-white" to="/teams">Teams List</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="btn btn-secondary text-white" to="/ministries">Ministries List</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="btn btn-secondary text-white" to="/tasks">Tasks List</Link>
                    </li>
                  </>
                )}
                {user.role === 'Task Leader' && (
                  <li className="nav-item">
                    <Link className="btn btn-secondary text-white" to="/ministries">Show All Ministries</Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="btn btn-danger text-white" to="/" onClick={handleSignOut}>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn btn-primary text-white" to="/sign-in">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn btn-primary text-white" to="/sign-up">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
