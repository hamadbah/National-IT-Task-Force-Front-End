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
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Home" width="80" height="60" className="d-inline-block align-top me-2"/></Link>
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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {user ? (
              <>
                {user.role === 'admin' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/teams">Teams List</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/ministries">Ministries List</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/tasks">Tasks List</Link>
                    </li>
                  </>
                )}
                {user.role === 'Task Leader' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/ministries">Show All Ministries</Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleSignOut}>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-in">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-up">Sign Up</Link>
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
