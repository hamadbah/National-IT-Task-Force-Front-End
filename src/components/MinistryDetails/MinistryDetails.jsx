import { useParams, useNavigate, Link } from 'react-router';
import { useEffect, useState } from 'react';
import * as ministryService from '../../services/ministryService';

const MinistryDetails = (props) => {
  const { ministryId } = useParams();
  const navigate = useNavigate();
  const [ministry, setministry] = useState(null);

  useEffect(() => {
    const fetchMinistry = async () => {
      try {
        const data = await ministryService.show(ministryId);
        setministry(data);
      } catch (err) {
        console.error("Failed to fetch ministry", err);
      }
    };

    fetchMinistry();
  }, [ministryId]);

  const handleDelete = async () => {
    await props.handleDeleteMinistry(ministryId); 
};

  if (!ministry) return <p>Loading ministry details...</p>;

  return (
    <main>
      <h2>{ministry.name}</h2> 
      <p><strong>Phone:</strong> {ministry.Phone}</p>
      <p><strong>Email:</strong> {ministry.email}</p>
      <p><strong>website:</strong> {ministry.website}</p>
      <p><strong>OpeningHours:</strong> {ministry.OpeningHours}</p>


      <div>
        <Link to={`/ministries/${ministryId}/edit`}> <button type="button">Edit Ministry</button> </Link>
        <button type="button" onClick={handleDelete}> Delete Ministry </button>
      </div>
    </main>
  );
};

export default MinistryDetails;