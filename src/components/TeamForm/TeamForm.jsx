// src/components/HootForm/HootForm.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as teamService from '../../services/teamService';

const TeamForm = (props) => {
  const { teamId } = useParams();
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

    // Add a cleanup function
    return () => setFormData({ name: '', speciality: '', mobileNo: '', email: '' });
  }, [teamId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
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
        <button type='submit'>SUBMIT</button>
      </form>
    </main>
  );
};

export default TeamForm;
