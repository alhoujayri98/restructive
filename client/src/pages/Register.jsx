import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .reg-root {
    min-height: 100vh;
    background: #f5f4f0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-family: 'DM Sans', sans-serif;
  }

  .reg-side {
    background: #1e3638;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 60px 56px;
    position: relative;
    overflow: hidden;
  }

  .reg-side::before {
    content: '';
    position: absolute;
    bottom: -120px;
    left: -120px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    border: 60px solid rgba(223,1,52,0.12);
    pointer-events: none;
  }

  .reg-side::after {
    content: '';
    position: absolute;
    top: -80px;
    right: -80px;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    border: 40px solid rgba(223,1,52,0.08);
    pointer-events: none;
  }

  .reg-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.04em;
    z-index: 1;
  }

  .reg-logo span {
    color: #df0134;
  }

  .reg-hero {
    z-index: 1;
  }

  .reg-hero-eyebrow {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #df0134;
    margin-bottom: 20px;
  }

  .reg-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 56px;
    font-weight: 600;
    line-height: 1.1;
    color: #fff;
    margin-bottom: 24px;
  }

  .reg-hero-desc {
    font-size: 14px;
    font-weight: 300;
    line-height: 1.8;
    color: rgba(255,255,255,0.55);
    max-width: 320px;
  }

  .reg-side-footer {
    font-size: 12px;
    color: rgba(255,255,255,0.3);
    z-index: 1;
  }

  .reg-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 72px;
    background: #f5f4f0;
    overflow-y: auto;
  }

  .reg-header {
    margin-bottom: 40px;
  }

  .reg-header-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #df0134;
    margin-bottom: 10px;
  }

  .reg-header-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 700;
    color: #1e3638;
    line-height: 1.1;
  }

  .reg-alert {
    padding: 12px 16px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 400;
    margin-bottom: 24px;
    border-left: 3px solid;
  }

  .reg-alert.error {
    background: rgba(223,1,52,0.07);
    color: #df0134;
    border-color: #df0134;
  }

  .reg-alert.success {
    background: rgba(30,54,56,0.07);
    color: #1e3638;
    border-color: #1e3638;
  }

  .reg-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 24px;
  }

  .reg-field {
    margin-bottom: 22px;
  }

  .reg-field.full {
    grid-column: 1 / -1;
  }

  .reg-label {
    display: block;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #1e3638;
    margin-bottom: 8px;
  }

  .reg-input {
    width: 100%;
    padding: 13px 16px;
    background: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #1e3638;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
    appearance: none;
  }

  .reg-input::placeholder {
    color: #bbb;
    font-weight: 300;
  }

  .reg-input:focus {
    border-color: #1e3638;
    box-shadow: 0 0 0 3px rgba(30,54,56,0.08);
  }

  .reg-actions {
    margin-top: 32px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .reg-btn-primary {
    flex: 1;
    padding: 15px 24px;
    background: #1e3638;
    color: #fff;
    border: none;
    border-radius: 3px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }

  .reg-btn-primary:hover:not(:disabled) {
    background: #df0134;
  }

  .reg-btn-primary:active:not(:disabled) {
    transform: scale(0.98);
  }

  .reg-btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .reg-btn-secondary {
    padding: 15px 24px;
    background: transparent;
    color: #1e3638;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
  }

  .reg-btn-secondary:hover {
    border-color: #1e3638;
    background: rgba(30,54,56,0.04);
  }

  .reg-divider {
    height: 1px;
    background: #d9d9d9;
    margin: 28px 0;
  }

  .reg-footer-text {
    font-size: 13px;
    color: #888;
    font-weight: 300;
  }

  .reg-footer-text a {
    color: #df0134;
    text-decoration: none;
    font-weight: 500;
    border-bottom: 1px solid rgba(223,1,52,0.3);
    transition: border-color 0.2s;
  }

  .reg-footer-text a:hover {
    border-color: #df0134;
  }

  @media (max-width: 900px) {
    .reg-root { grid-template-columns: 1fr; }
    .reg-side { display: none; }
    .reg-main { padding: 48px 32px; }
    .reg-grid { grid-template-columns: 1fr; }
    .reg-field.full { grid-column: 1; }
  }
`;

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
  const goToHome = () => { navigate("/"); };
  const [role] = useState("user");
  const [secret] = useState("");

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
      const data = await registerUser(username, email, phone_number, password, role, secret);
      setSuccess(data.message || 'Registration successful!');
      setTimeout(() => { navigate('/login'); }, 1500);
    } catch (err) {
      setError(err.message || 'Error registering');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="reg-root">
        {/* Left Panel */}
        <aside className="reg-side">
          <div className="reg-logo">Restructive <span>Platform .</span></div>
          <div className="reg-hero">
            <p className="reg-hero-eyebrow">Welcome</p>
            <h1 className="reg-hero-title">Create your account.</h1>
            <p className="reg-hero-desc">
              Join thousands of local actors and get full access to all service itineraries, adjust to you.
            </p>
          </div>
          <p className="reg-side-footer">© 2025 Restructive. All rights reserved.</p>
        </aside>

        {/* Right Panel */}
        <main className="reg-main">
          <div className="reg-header">
            <p className="reg-header-label">Get started</p>
            <h2 className="reg-header-title">Create an Account</h2>
          </div>

          {error && <div className="reg-alert error">{error}</div>}
          {success && <div className="reg-alert success">{success}</div>}

          <form onSubmit={handleSubmit} id="register_form">
            <div className="reg-grid">
              <div className="reg-field full">
                <label className="reg-label" htmlFor="username_input">Full Name</label>
                <input
                  className="reg-input"
                  type="text"
                  id="username_input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name here"
                  autoFocus
                />
              </div>

              <div className="reg-field">
                <label className="reg-label" htmlFor="email_input">Email Address</label>
                <input
                  className="reg-input"
                  type="email"
                  id="email_input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="reg-field">
                <label className="reg-label" htmlFor="phone_number_input">Phone Number</label>
                <input
                  className="reg-input"
                  type="tel"
                  id="phone_number_input"
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
                  placeholder="+961 00 000 000"
                  required
                />
              </div>

              <div className="reg-field">
                <label className="reg-label" htmlFor="password_input">Password</label>
                <input
                  className="reg-input"
                  type="password"
                  id="password_input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Choose a password"
                />
              </div>

              <div className="reg-field">
                <label className="reg-label" htmlFor="confirm_password_input">Confirm Password</label>
                <input
                  className="reg-input"
                  type="password"
                  id="confirm_password_input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                />
              </div>
            </div>

            <div className="reg-actions">
              <button
                type="submit"
                id="btn3"
                className="reg-btn-primary"
                disabled={loading || !!success}
              >
                {loading ? 'Creating Account…' : 'Create Account'}
              </button>
              <button
                type="button"
                id="btn4"
                className="reg-btn-secondary"
                onClick={goToHome}
              >
                Home
              </button>
            </div>
          </form>

          <div className="reg-divider" />

          <p className="reg-footer-text">
            Already have an account?{' '}
            <Link to="/login">Sign in here</Link>
          </p>
        </main>
      </div>
    </>
  );
}