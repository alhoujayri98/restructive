// ─────────────────────────────────────────────────────────────────
// Paste this FULL updated Home.jsx — only the phrases article
// and gotoPhraseForm function are new; everything else unchanged.
// ─────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
import { useAuth } from '../context/AuthContext';
import { getPhrases, deletePhrase } from '../api';

function App() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [phrases, setPhrases] = useState([]);

  const goToLogin        = () => navigate("/Login");
  const goToRegister     = () => navigate("/Register");
  const gotoPhraseForm   = () => navigate("/phraseform");   // ← new

  useEffect(() => { fetchPhrases(); }, []);

  const fetchPhrases = async () => {
    try {
      const data = await getPhrases();
      setPhrases(data);
    } catch (error) {
      console.error("Failed to fetch phrases", error);
    }
  };

  const handleDeletePhrase = async (id) => {
    if (!user) return;
    try {
      await deletePhrase(id, user.token);
      fetchPhrases();
    } catch (error) {
      console.error("Failed to delete phrase", error);
    }
  };

  return (
    <>
      <header>
        <div id="title">
          <h1 className="color1">RESTRUCTIVE</h1>
          <h1 className="color2">DATABASE</h1>
        </div>
        <div className="login_form">
          <img src="img/Tool-01.png" id="image1" alt="" />
          <div className="buttons">
            {user ? (
              <>
                <span className="color1" style={{ fontSize:'18px', textAlign:'center' }}>
                  Welcome, {user.username}
                </span>
                <button className="color2" id="btn1" onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <button className="color2" id="btn1" onClick={goToLogin}>Login</button>
                <button className="color2" id="btn1" onClick={goToRegister}>Register</button>
              </>
            )}
          </div>
        </div>
      </header>

      <nav>
        <h3 className="color2" id="code">CODE</h3>
        <img src="img/Tool-02.png" id="image2" alt="" />
        <img src="img/Tool-03.png" id="image3" alt="" />
        <h3 className="color1" id="codeAR">قود</h3>
      </nav>

      <figure></figure>

      <main>
        <article>
          <div id="article1">
            <div id="article1_P">
              <p><span className="color1">Collect</span><span className="color2"> Local data</span></p>
              <p><span className="color1">Connect</span><span className="color2"> Local actors</span></p>
              <p><span className="color1">Construct</span><span className="color2"> Local sectors</span></p>
            </div>
            <img src="img/Tool-04.png" id="image4" alt="" />
          </div>
          <div id="article2">
            <img src="img/Tool-05.png" id="image5" alt="" />
            <div id="article2_P">
              <p><span className="color1">Fuel</span><span className="color2"> your business with our available Local data source</span></p>
              <p><span className="color2">Start to Lead it</span><span className="color1"> •• </span><span className="color2">on course</span></p>
              <p className="color2">And Mark it in Market</p>
            </div>
          </div>
          <div id="article3">
            <img src="img/Tool-06.png" id="image6" alt="" />
            <p className="color1" id="article3_P" style={{ paddingLeft:"5%" }}>We Unblock You Unlock</p>
          </div>
          <div id="article4">
            <p className="color2" id="article4_P">Scalable & Sustainable Start-ups Start here</p>
            <img src="img/Tool-07.png" id="image7" alt="" />
          </div>
          <p id="article5" style={{ textAlign:"center" }}>
            <span className="color2">Get Active</span>
            <span className="color1"> • </span>
            <span className="color2">Collective</span>
            <span className="color1"> • </span>
            <span className="color2">Connective</span>
            <span className="color1"> • </span>
            <span className="color2">Constructive on Restructive</span>
          </p>
        </article>

        <section>
          <img src="img/Tool-08.png" id="image8" alt="" />
          <img src="img/Tool-09.png" id="image9" alt="" />
          <p className="color1" id="section1">Build millions</p>
          <p className="color2" id="section2">Start with 1,000</p>
        </section>

        {/* ── PHRASES SECTION ── */}
        <article>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px' }}>
            <h1 className="color2">Phrases</h1>

            {/* Add a Phrase button — visible only when logged in */}
            {user && (
              <button
                onClick={gotoPhraseForm}
                style={{
                  background:'none',
                  border:'2px solid #df0134',
                  color:'#df0134',
                  padding:'10px 22px',
                  fontSize:'14px',
                  fontWeight:'600',
                  cursor:'pointer',
                  letterSpacing:'0.04em',
                  transition:'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='#df0134'; e.currentTarget.style.color='#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background='none'; e.currentTarget.style.color='#df0134'; }}
              >
                + Add a Phrase
              </button>
            )}
          </div>

          <div className="phrases-list">
            {phrases && phrases.length > 0 ? (
              phrases.map((phrase) => (
                <div key={phrase.id}
                  style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'10px' }}>
                  <p>
                    <span className="color1">{phrase.owner}</span>:{' '}
                    <span className="color2">{phrase.phrase}</span>
                  </p>
                  {/* Delete button — only on user's own phrases */}
                  {user && String(user.id) === String(phrase.user_id) && (
                    <button
                      onClick={() => handleDeletePhrase(phrase.id)}
                      style={{
                        background:'none', border:'none',
                        color:'#df0134', fontSize:'18px',
                        cursor:'pointer', marginLeft:'12px',
                        opacity:0.55, transition:'opacity 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = 1}
                      onMouseLeave={e => e.currentTarget.style.opacity = 0.55}
                      title="Delete phrase"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p style={{ textAlign:'center' }}>No phrases added yet.</p>
            )}
          </div>
        </article>
      </main>

      <footer>
        <img src="img/wide.png" id="icon1" alt="" />
        <a href="https://lco-office.com" id="link1" target="_blank" rel="noopener noreferrer">
          lco-office.com
        </a>
      </footer>
    </>
  );
}

export default App;