import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import * as teamService from '../../services/teamService';

const TeamForm = (props) => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    speciality: '',
    mobileNo: '',
    email: ''
  });

  useEffect(() => {
    const fetchTeam = async () => {
      const teamData = await teamService.show(teamId);
      setFormData(teamData);
    };
    if (teamId) fetchTeam();
    return () =>
      setFormData({ name: '', speciality: '', mobileNo: '', email: '' });
  }, [teamId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (teamId) {
      props.handleUpdateTeam(teamId, formData);
    } else {
      props.handleAddTeam(formData);
    }
  };

  return (
    <main className="container my-4">
      <h1 className="mb-4">{teamId ? 'Edit Member' : 'New Member'}</h1>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm bg-light"
      >
        <div className="mb-3">
          <label htmlFor="name-input" className="form-label">
            Name
          </label>
          <input
            required
            type="text"
            name="name"
            id="name-input"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter member name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="speciality-input" className="form-label">
            Speciality
          </label>
          <input
            required
            type="text"
            name="speciality"
            id="speciality-input"
            className="form-control"
            value={formData.speciality}
            onChange={handleChange}
            placeholder="Enter speciality"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mobileNo-input" className="form-label">
            Mobile No
          </label>
          <input
            required
            type="text"
            name="mobileNo"
            id="mobileNo-input"
            className="form-control"
            value={formData.mobileNo}
            onChange={handleChange}
            placeholder="Enter mobile number"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email-input" className="form-label">
            Email Address
          </label>
          <input
            required
            type="email"
            name="email"
            id="email-input"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">
            {teamId ? 'Update' : 'Save'}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default TeamForm;
