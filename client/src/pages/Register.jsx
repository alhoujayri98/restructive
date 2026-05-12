import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const goToHome = () => {navigate("/");};
  const [role, setRole] = useState("user");
  const [secret, setSecret] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!username || !password || !email) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser(username,email,  password, role, secret);
      setSuccess(data.message || 'Registration successful!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Error registering');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-center" style={{ marginTop: 0 }}>Create an Account</h2>
      {error && <div className="error-msg">{error}</div>}
      {success && <div className="success-msg">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Enter Your Name</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter your name here"
            autoFocus
          />
          <div className="form-group">
          <label>Enter Your Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email here"
            required
            autoFocus
          />
          </div>
        </div>
        <div className="form-group">
          <label>Choose Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter password"
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <div>
            <label>
              <input 
                type="radio" 
                value="user" 
                checked={role === 'user'} 
                onChange={(e) => setRole(e.target.value)} 
              />
              User
            </label>

            <label style={{ marginLeft: "10px" }}>
              <input 
                type="radio" 
                value="admin" 
                checked={role === 'admin'} 
                onChange={(e) => setRole(e.target.value)} 
              />
              Admin
            </label>
          </div>
        </div>
        <button type="submit" style={{ width: '100%' }} disabled={loading || success}>
          {loading ? 'Creating...' : 'Register'}
        </button>
        <button onClick={goToHome}>
            Home
        </button>
      </form>
      <p className="text-center mt-1" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--highlight-color)' }}>Log in here</Link>
      </p>
    </div>
  );
}
