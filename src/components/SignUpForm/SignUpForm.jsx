// SignUpForm.jsx

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext.jsx';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
    role: ''
  });

  const { setUser } = useContext(UserContext);

  const { username, role, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(formData);
    const newUser = await signUp(formData);
    setUser(newUser);
    console.log(newUser);
    navigate('/');
  };

  const isFormInvalid = () => {
    return !(username && role && password && password === passwordConf);
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='name'
            value={username}
            name='username'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='confirm'>Confirm Password:</label>
          <input
            type='password'
            id='confirm'
            value={passwordConf}
            name='passwordConf'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='role'>Role:</label>
          <select
            id='role'
            name='role'
            value={role}
            onChange={handleChange}
            required>
            <option value=''>-- Select Role --</option>
            <option value='Task Leader'>Task Leader</option>
          </select>
        </div>
        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;
