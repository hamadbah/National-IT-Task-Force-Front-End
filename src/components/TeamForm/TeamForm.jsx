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
    return () => setFormData({ name: '', speciality: '', mobileNo: '', email: '' });
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
    <main>
      <h1>{teamId ? 'Edit Member' : 'New Member'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name-input'>Name: </label>
        <input
          required
          type='text'
          name='name'
          id='name-input'
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor='speciality-input'>Speciality: </label>
        <input
          required
          type='text'
          name='speciality'
          id='speciality-input'
          value={formData.speciality}
          onChange={handleChange}
        />
        <label htmlFor='mobileNo-input'>Mobile No: </label>
        <input
          required
          type='text'
          name='mobileNo'
          id='mobileNo-input'
          value={formData.mobileNo}
          onChange={handleChange}
        />
        <label htmlFor='email-input'>Email Address: </label>
        <input
          required
          type='text'
          name='email'
          id='email-input'
          value={formData.email}
          onChange={handleChange}
        />
        <button type='submit'>Submit</button>
        <button type='button' onClick={handleCancel}>Cancel</button>
      </form>
    </main>
  );
};

export default TeamForm;
