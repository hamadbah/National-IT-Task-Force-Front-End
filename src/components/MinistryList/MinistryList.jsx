import { Link } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext'

const MinistryList = (props) => {
  const { user } = useContext(UserContext);
  return (
    <main>
      <div>
        {user && user.role === 'admin' && (
          <Link to="/ministries/new">
            <button type="button">Add ministry</button>
          </Link>
        )}
      </div>

      {props.ministries.length === 0 ? (
        <p>No ministry found.</p>
      ) : (
        props.ministries.map((ministry) => (
          <article key={ministry._id}>
            <header>
              <h2>
                <Link to={`/ministries/${ministry._id}`}>{ministry.name}</Link>
              </h2>
              <p><strong>Phone: </strong> {ministry.Phone}</p>
            </header>
            <p><strong>website: </strong> {ministry.website}</p>
            <p><strong>Email: </strong> {ministry.email}</p>
            <p><strong>OpeningHours: </strong> {ministry.OpeningHours}</p>
          </article>
        ))
      )}
    </main>
  );
};


export default MinistryList;
