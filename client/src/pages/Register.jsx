import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api';
import styles from './Register.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone_number, setPhone_number] = useState('');
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
    
    if (!username || !password || !email || !phone_number) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser(username,email, phone_number, password, role, secret);
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
    <div className="register">
      <header>
        <h1 className="createAccount" className="color1">Create an Account</h1>
      </header>
      {error && <div className="error-msg">{error}</div>}
      {success && <div className="success-msg">{success}</div>}
      <form onSubmit={handleSubmit} id="register_form">
        <div className="form-group">
          <label id="username_label" className="color1">Enter Your Name</label>
          <input 
            type="text"
            id="username_input"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter your name here"
            autoFocus
          />
        </div>
        <div className="form-group">
          <label id="email_label" className="color1">Enter Your Email</label>
          <input 
            type="email" 
            id="email_input"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email here"
            required
            autoFocus
          />
          
        </div>
        <div className="form-group">
          <label id="phone_number_label" className="color1">Enter Your Phone Number</label>
          <input 
            type="tel" 
            id="phone_number_input"
            value={phone_number} 
            onChange={(e) => setPhone_number(e.target.value)} 
            placeholder="Enter your phone number here"
            required
            autoFocus
          />
          
        </div>
        <div className="form-group">
          <label id="password_label" className="color1">Choose Password</label>
          <input 
            type="password" 
            id="password_input"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter password"
          />
        </div>
        <div className="form-group">
          <label id="confirm_password_label" className="color1">Confirm Password</label>
          <input 
            type="password" 
            id="confirm_password_input"
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirm password"
          />
        </div>
        {/*
        <div className="form-group">
          <label id="role" className="color1">Role</label>
          <input 
            type="radio"
            id="user_role" 
            value="user" 
            checked={role === 'user'} 
            onChange={(e) => setRole(e.target.value)} 
          />
          <label id="user_label" className="color1">User</label>
          <input 
            type="radio" 
            id="admin_role"
            value="admin" 
            checked={role === 'admin'} 
            onChange={(e) => setRole(e.target.value)} 
          />
          <label id="admin_label" className="color1">Admin</label>
        </div>
        */}
        <div id="buttons2_group">
          <img src="img/Tool-01.png" id="image10" alt="" />
          <div className="buttons2">
            <button type="submit" id="btn3" className="color2" disabled={loading || success}>
              {loading ? 'Creating...' : 'Register'}
            </button>
            <button id="btn4" className="color2" onClick={goToHome}>
                Home
            </button>
        </div>
        </div>
      </form>
      <p className="text-center mt-1" className="color2">
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </div>
  );
}
