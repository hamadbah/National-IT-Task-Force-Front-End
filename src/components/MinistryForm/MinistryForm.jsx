import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import * as ministryService from '../../services/ministryService';

const MinistryForm = (props) => {
  const { ministryId } = useParams();
  const navigate = useNavigate();
  const [ministryFormData, setministryFormData] = useState({
    name: '',
    Phone: '',
    email: '',
    website: '',
    OpeningHours: ''
  });

  useEffect(() => {
    const fetchMinistry = async () => {
      const ministryData = await ministryService.show(ministryId);
      setministryFormData(ministryData);
    };
    if (ministryId) fetchMinistry();

    return () => setministryFormData({ name: '', Phone: '', email: '', website: '', OpeningHours: '' });
  }, [ministryId]);

  const handleChange = (evt) => {
    setministryFormData({ ...ministryFormData, [evt.target.name]: evt.target.value });
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
    <main>
      <h1>{ministryId ? 'Edit Ministry' : 'New Ministry'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name-input'>Name: </label>
        <input
          required
          type='text'
          name='name'
          id='name-input'
          value={ministryFormData.name}
          onChange={handleChange}
        />
        <label htmlFor='Phone-input'>Phone: </label>
        <input
          required
          type='number'
          name='Phone'
          id='Phone-input'
          value={ministryFormData.Phone}
          onChange={handleChange}
        />
        <label htmlFor='website-input'>Website: </label>
        <input
          required
          type='text'
          name='website'
          id='website-input'
          value={ministryFormData.website}
          onChange={handleChange}
        />
        <label htmlFor='email-input'>Email Address: </label>
        <input
          required
          type='text'
          name='email'
          id='email-input'
          value={ministryFormData.email}
          onChange={handleChange}
        />
        <label htmlFor='OpeningHours-input'>Opening Hours: </label>
        <input
          required
          type='text'
          name='OpeningHours'
          id='OpeningHours-input'
          value={ministryFormData.OpeningHours}
          onChange={handleChange}
        />
        <div>
          <button type='submit'>Submit</button>
          <button type='button' onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default MinistryForm;
