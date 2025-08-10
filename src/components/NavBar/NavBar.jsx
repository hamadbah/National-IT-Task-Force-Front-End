import React, { useContext } from 'react'
import { Link } from 'react-router'
import { UserContext } from '../../contexts/UserContext'

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav>
      <ul>
        <li><Link to='/'>HOME</Link></li>

        {user ? (
          <>
            {user.role === 'admin' && (
              <>
                <li><Link to='/teams'>Teams List</Link></li>
                <li><Link to='/ministries'>Ministries List</Link></li>
                <li><Link to='/tasks'>Tasks List</Link></li>
              </>
            )}
            {user.role === 'Task Leader' && (
              <>
                <li><Link to='/ministries'>Show All Ministries</Link></li>
              </>
            )}

            <li><Link to='/' onClick={handleSignOut}>SIGN OUT</Link></li>
          </>
        ) : (
          <>
            <li><Link to='/sign-in'>SIGN IN</Link></li>
            <li><Link to='/sign-up'>SIGN UP</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
