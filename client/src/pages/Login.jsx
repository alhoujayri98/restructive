import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';
import { useAuth } from '../context/AuthContext';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .login-root {
    min-height: 100vh;
    background: #f5f4f0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-family: 'DM Sans', sans-serif;
  }

  .login-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 72px;
    background: #f5f4f0;
  }

  .login-header {
    margin-bottom: 48px;
  }

  .login-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 700;
    color: #1e3638;
    letter-spacing: 0.04em;
    margin-bottom: 48px;
    display: block;
  }

  .login-logo span {
    color: #df0134;
  }

  .login-header-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #df0134;
    margin-bottom: 10px;
  }

  .login-header-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 44px;
    font-weight: 700;
    color: #1e3638;
    line-height: 1.1;
  }

  .login-header-sub {
    font-size: 14px;
    font-weight: 300;
    color: #888;
    margin-top: 10px;
  }

  .login-alert {
    padding: 12px 16px;
    border-radius: 4px;
    font-size: 13px;
    margin-bottom: 24px;
    border-left: 3px solid #df0134;
    background: rgba(223,1,52,0.07);
    color: #df0134;
  }

  .login-field {
    margin-bottom: 22px;
  }

  .login-label {
    display: block;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #1e3638;
    margin-bottom: 8px;
  }

  .login-input {
    width: 100%;
    padding: 15px 18px;
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

  .login-input::placeholder {
    color: #bbb;
    font-weight: 300;
  }

  .login-input:focus {
    border-color: #1e3638;
    box-shadow: 0 0 0 3px rgba(30,54,56,0.08);
  }

  .login-actions {
    margin-top: 36px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .login-btn-primary {
    width: 100%;
    padding: 16px 24px;
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

  .login-btn-primary:hover:not(:disabled) {
    background: #df0134;
  }

  .login-btn-primary:active:not(:disabled) {
    transform: scale(0.98);
  }

  .login-btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .login-btn-secondary {
    width: 100%;
    padding: 16px 24px;
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

  .login-btn-secondary:hover {
    border-color: #1e3638;
    background: rgba(30,54,56,0.04);
  }

  .login-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 28px 0;
  }

  .login-divider::before,
  .login-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #d9d9d9;
  }

  .login-divider-text {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #bbb;
  }

  .login-footer-text {
    font-size: 13px;
    color: #888;
    font-weight: 300;
    text-align: center;
  }

  .login-footer-text a {
    color: #df0134;
    text-decoration: none;
    font-weight: 500;
    border-bottom: 1px solid rgba(223,1,52,0.3);
    transition: border-color 0.2s;
  }

  .login-footer-text a:hover {
    border-color: #df0134;
  }

  /* Right decorative panel */
  .login-side {
    background: #1e3638;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 60px 56px;
    position: relative;
    overflow: hidden;
  }

  .login-side::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    border: 80px solid rgba(223,1,52,0.1);
    pointer-events: none;
  }

  .login-side::after {
    content: '';
    position: absolute;
    bottom: 60px;
    left: -60px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 40px solid rgba(223,1,52,0.08);
    pointer-events: none;
  }

  .login-side-accent {
    width: 40px;
    height: 3px;
    background: #df0134;
    margin-bottom: 24px;
    z-index: 1;
    position: relative;
  }

  .login-side-quote {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px;
    font-weight: 600;
    line-height: 1.15;
    color: #fff;
    margin-bottom: 20px;
    z-index: 1;
    position: relative;
  }

  .login-side-caption {
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,0.4);
    z-index: 1;
    position: relative;
  }

  @media (max-width: 900px) {
    .login-root { grid-template-columns: 1fr; }
    .login-side { display: none; }
    .login-main { padding: 48px 32px; }
  }
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const goToHome = () => { navigate("/"); };

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
      login({ token: data.token, username: data.username });
      navigate('/PhraseForm');
    } catch (err) {
      setError(err.message || 'Error logging in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-root">
        {/* Left: Form Panel */}
        <main className="login-main">
          <span className="login-logo">Restructive<span> Platform .</span></span>

          <div className="login-header">
            <p className="login-header-label">Sign in</p>
            <h1 className="login-header-title">Welcome Back</h1>
            <p className="login-header-sub">Enter your credentials to continue.</p>
          </div>

          {error && <div className="login-alert">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label className="login-label" htmlFor="login-email">Email Address</label>
              <input
                className="login-input"
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoFocus
              />
            </div>

            <div className="login-field">
              <label className="login-label" htmlFor="login-password">Password</label>
              <input
                className="login-input"
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <div className="login-actions">
              <button
                type="submit"
                className="login-btn-primary"
                disabled={loading}
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
              <button
                type="button"
                className="login-btn-secondary"
                onClick={goToHome}
              >
                Back to Home
              </button>
            </div>
          </form>

          <div className="login-divider">
            <span className="login-divider-text">or</span>
          </div>

          <p className="login-footer-text">
            Don't have an account?{' '}
            <Link to="/Register">Create one here</Link>
          </p>
        </main>

        {/* Right: Decorative Panel */}
        <aside className="login-side">
          <div className="login-side-accent" />
          <p className="login-side-quote">Your journey continues here.</p>
          <p className="login-side-caption">Secure · Private · Always available</p>
        </aside>
      </div>
    </>
  );
}