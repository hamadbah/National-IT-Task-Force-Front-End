import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import * as ministryService from '../../services/ministryService';

const MinistryForm = (props) => {
  const { ministryId } = useParams();
  const navigate = useNavigate();
  const [ministryFormData, setMinistryFormData] = useState({
    name: '',
    Phone: '',
    email: '',
    website: '',
    OpeningHours: ''
  });

  useEffect(() => {
    const fetchMinistry = async () => {
      const ministryData = await ministryService.show(ministryId);
      setMinistryFormData(ministryData);
    };
    if (ministryId) fetchMinistry();

    return () => setMinistryFormData({ name: '', Phone: '', email: '', website: '', OpeningHours: '' });
  }, [ministryId]);

  const handleChange = (evt) => {
    setMinistryFormData({ ...ministryFormData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (ministryId) {
      props.handleUpdateMinistry(ministryId, ministryFormData);
    } else {
      props.handleAddMinistry(ministryFormData);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <main className="container mt-4">
      <h1 className="mb-4">{ministryId ? 'Edit Ministry' : 'New Ministry'}</h1>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

        <div className="mb-3">
          <label htmlFor="name-input" className="form-label">Name</label>
          <input
            required
            type="text"
            className="form-control"
            name="name"
            id="name-input"
            value={ministryFormData.name}
            onChange={handleChange}
            placeholder='Enter Ministry Name'
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Phone-input" className="form-label">Phone</label>
          <input
            required
            type="tel"
            pattern="[0-9+()-\s]*"
            className="form-control"
            name="Phone"
            id="Phone-input"
            value={ministryFormData.Phone}
            onChange={handleChange}
            placeholder="Enter Phone No."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="website-input" className="form-label">Website</label>
          <input
            required
            type="url"
            className="form-control"
            name="website"
            id="website-input"
            value={ministryFormData.website}
            onChange={handleChange}
            placeholder="Enter Website"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email-input" className="form-label">Email Address</label>
          <input
            required
            type="email"
            className="form-control"
            name="email"
            id="email-input"
            value={ministryFormData.email}
            onChange={handleChange}
            placeholder="Enter Email Address"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="OpeningHours-input" className="form-label">Opening Hours</label>
          <input
            required
            type="text"
            className="form-control"
            name="OpeningHours"
            id="OpeningHours-input"
            value={ministryFormData.OpeningHours}
            onChange={handleChange}
            placeholder="Enter Opening Hours"
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">
            Save
          </button>
          <button type="button" className="btn btn-danger" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default MinistryForm;
