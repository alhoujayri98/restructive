import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPhrases, addPhrase, deletePhrase } from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function User() {
  const [text, setText] = useState("");
  const [phrases, setPhrases] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const loadPhrases = async () => {
    try {
      const data = await getPhrases();
      setPhrases(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPhrases();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!text || !user) return;
    try {
      await addPhrase(text, user.token);
      setText("");
      loadPhrases();
    } catch (err) {
      alert(err.message || 'Error adding phrase. Token might be invalid.');
    }
  };

  const handleDelete = async (id) => {
    if (!user) return;
    try {
      await deletePhrase(id, user.token);
      loadPhrases();
    } catch (err) {
      console.error(err);
      alert('Error deleting phrase. Token might be invalid.');
    }
  };

  const handleLogout = () => {
    logout();          // clear user
    navigate("/");     // go to Home.jsx (usually "/")
  }

  return (
    <div className="container">
      <nav className="navbar">
        <h1>Phrase Vault</h1>
        <div className="nav-links">
          {user ? (
            <>
              <span style={{color: 'var(--text-muted)'}}>Hi, {user.username}</span>
              <button className="btn-danger" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register"><button style={{padding: '0.4rem 1rem'}}>Sign Up</button></Link>
            </>
          )}
        </div>
      </nav>

      
      <div className="card">
        {user ? (
          <form style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }} onSubmit={handleAdd}>
            <input
              style={{ flex: 1 }}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's your new phrase?"
            />
            <button type="submit">Add</button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: '1.5rem' }}>
            <p>Please log in to add new phrases.</p>
          </div>
        )}

        {phrases.length === 0 ? (
          <p className="text-center" style={{ color: 'var(--text-muted)' }}>No phrases found.</p>
        ) : (
          <ul>
            {phrases.map((p) => (
              <li key={p.id}>
                <span>{p.text}</span>
                {user && (
                  <button className="btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
       
    </div>
  );
}
