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
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && role && password && password === passwordConf);
  };

  return (
    <main className="d-flex justify-content-center align-items-center container-fluid bg-secondary min-vh-100 py-4">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>
        <h1 className="text-center mb-4">Sign Up</h1>
        {message && <p className="text-danger text-center">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirm" className="form-label">Confirm Password:</label>
            <input
              type="password"
              id="confirm"
              className="form-control"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role:</label>
            <select
              id="role"
              name="role"
              className="form-select"
              value={role}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Role --</option>
              <option value="Task Leader">Task Leader</option>
            </select>
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isFormInvalid()}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUpForm;
