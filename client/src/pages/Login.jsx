import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const goToHome = () => {navigate("/");};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(email, password);
      // data contains message, token, username
      login({ token: data.token, username: data.username });
      navigate('/User');
    } catch (err) {
      setError(err.message || 'Error logging in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Welcome Back</h2>
      {error && <div className="error-msg">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter email"
            autoFocus
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter password"
          />
        </div>
        <button type="submit" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Entering...' : 'Log In'}
        </button>
        <button onClick={goToHome}>
            Home
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/Register" style={{ color: 'var(--highlight-color)' }}>Register here</Link>
      </p>
    </div>
  );
}
