import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BASE_URL = 'http://localhost:5000/api';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;500&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
.pf-root{min-height:100vh;background:#f5f4f0;font-family:'DM Sans',sans-serif;display:flex;flex-direction:column}
.pf-topbar{display:flex;align-items:center;justify-content:space-between;padding:20px 56px;border-bottom:1px solid #e0ddd8;background:#f5f4f0;position:sticky;top:0;z-index:100}
.pf-logo{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:#1e3638;letter-spacing:0.04em;text-decoration:none}
.pf-logo span{color:#df0134}
.pf-back{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:#888;background:none;border:none;cursor:pointer;transition:color 0.2s}
.pf-back:hover{color:#1e3638}
.pf-hero{background:#1e3638;padding:52px 56px 44px;display:flex;align-items:flex-end;justify-content:space-between;gap:32px}
.pf-hero-eyebrow{font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:#df0134;margin-bottom:14px}
.pf-hero-title{font-family:'Cormorant Garamond',serif;font-size:52px;font-weight:700;line-height:1.05;color:#fff;margin-bottom:12px}
.pf-hero-title em{font-style:italic;color:rgba(255,255,255,0.45)}
.pf-hero-sub{font-size:13px;font-weight:300;color:rgba(255,255,255,0.45);line-height:1.75;max-width:400px}
.pf-toggle-wrap{display:flex;flex-direction:column;align-items:flex-end;gap:12px;flex-shrink:0}
.pf-toggle-label{font-size:10px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.35)}
.pf-toggle{display:flex;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:2px;overflow:hidden}
.pf-toggle-btn{padding:12px 28px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;border:none;cursor:pointer;transition:background 0.25s,color 0.25s;background:transparent;color:rgba(255,255,255,0.35)}
.pf-toggle-btn.active{background:#df0134;color:#fff}
.pf-wall{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 24px;gap:20px;text-align:center}
.pf-wall-icon{font-size:52px;opacity:0.25}
.pf-wall-title{font-family:'Cormorant Garamond',serif;font-size:40px;font-weight:700;color:#1e3638}
.pf-wall-sub{font-size:14px;font-weight:300;color:#888;line-height:1.7;max-width:340px}
.pf-wall-btns{display:flex;gap:12px;margin-top:8px}
.pf-wall-btn{padding:13px 28px;border-radius:2px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;cursor:pointer;transition:all 0.2s}
.pf-wall-btn.primary{background:#1e3638;color:#fff;border:none}
.pf-wall-btn.primary:hover{background:#df0134}
.pf-wall-btn.secondary{background:transparent;color:#1e3638;border:1px solid #d9d9d9}
.pf-wall-btn.secondary:hover{border-color:#1e3638}
.pf-body{flex:1;display:grid;grid-template-columns:260px 1fr;min-height:0}
.pf-sidebar{background:#1e3638;padding:36px 28px;display:flex;flex-direction:column;gap:4px;border-top:1px solid rgba(255,255,255,0.05)}
.pf-sidebar-step{display:flex;align-items:center;gap:14px;padding:14px 12px;border-radius:2px;transition:background 0.2s}
.pf-sidebar-step.active{background:rgba(255,255,255,0.06)}
.pf-step-num{width:26px;height:26px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:500;border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.28);transition:all 0.3s}
.pf-sidebar-step.done .pf-step-num{background:rgba(223,1,52,0.15);border-color:rgba(223,1,52,0.4);color:#df0134}
.pf-sidebar-step.active .pf-step-num{background:#df0134;border-color:#df0134;color:#fff}
.pf-step-title{font-size:12px;font-weight:500;color:rgba(255,255,255,0.6);margin-bottom:2px}
.pf-sidebar-step.active .pf-step-title{color:#fff}
.pf-step-desc{font-size:10px;font-weight:300;color:rgba(255,255,255,0.28)}
.pf-panel{padding:44px 52px;overflow-y:auto;display:flex;flex-direction:column;gap:36px}
.pf-section-head{display:flex;align-items:center;gap:14px;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #e8e5e0}
.pf-section-num{width:32px;height:32px;border-radius:50%;background:#1e3638;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:500;flex-shrink:0}
.pf-section-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:#1e3638}
.pf-row{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.pf-field{display:flex;flex-direction:column;gap:8px}
.pf-field.full{grid-column:1/-1}
.pf-label{font-size:9px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#999}
.pf-input,.pf-select,.pf-textarea{padding:13px 16px;background:#fff;border:1px solid #e0ddd8;border-radius:2px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:300;color:#1e3638;outline:none;transition:border-color 0.2s,box-shadow 0.2s;width:100%;appearance:none}
.pf-input::placeholder,.pf-textarea::placeholder{color:#bbb}
.pf-input:focus,.pf-select:focus,.pf-textarea:focus{border-color:#1e3638;box-shadow:0 0 0 3px rgba(30,54,56,0.07)}
.pf-select{cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 16px center;padding-right:40px}
.pf-textarea{resize:vertical;min-height:120px;line-height:1.65}
.pf-pills{display:flex;gap:10px;flex-wrap:wrap}
.pf-pill{display:flex;align-items:center;gap:8px;padding:11px 18px;background:#fff;border:1px solid #e0ddd8;border-radius:2px;cursor:pointer;font-size:13px;font-weight:400;color:#666;transition:all 0.2s}
.pf-pill:has(input:checked){border-color:#1e3638;background:#1e3638;color:#fff}
.pf-pill input{display:none}
.pf-pill-dot{width:12px;height:12px;border-radius:50%;border:1px solid currentColor;opacity:0.5;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.pf-pill:has(input:checked) .pf-pill-dot{border-color:#df0134;opacity:1}
.pf-pill:has(input:checked) .pf-pill-dot::after{content:'';width:6px;height:6px;border-radius:50%;background:#df0134}
.pf-domain-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px}
.pf-domain-card{display:flex;flex-direction:column;align-items:center;gap:8px;padding:18px 10px;background:#fff;border:1px solid #e0ddd8;border-radius:2px;cursor:pointer;text-align:center;font-size:10px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:#888;transition:all 0.2s}
.pf-domain-card:has(input:checked){border-color:#df0134;background:rgba(223,1,52,0.04);color:#df0134}
.pf-domain-card input{display:none}
.pf-domain-icon{font-size:24px}
.pf-actors{display:flex;gap:10px;flex-wrap:wrap}
.pf-actor{width:54px;height:54px;border-radius:2px;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid #e0ddd8;cursor:pointer;font-size:15px;font-weight:500;color:#888;transition:all 0.2s}
.pf-actor:has(input:checked){background:#1e3638;border-color:#1e3638;color:#fff}
.pf-actor input{display:none}
.pf-mono-badge{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:2px;background:rgba(30,54,56,0.07);font-family:'DM Mono',monospace;font-size:10px;font-weight:500;color:#1e3638;letter-spacing:0.1em;margin-bottom:4px}
.pf-mono-badge::before{content:'>';color:#df0134;margin-right:4px}
.pf-alert{padding:14px 18px;border-radius:2px;font-size:13px;border-left:3px solid;margin-bottom:8px}
.pf-alert.error{background:rgba(223,1,52,0.07);color:#c0001f;border-color:#df0134}
.pf-alert.success{background:rgba(30,120,60,0.07);color:#1a6635;border-color:#20a050}
.pf-submit-bar{display:flex;align-items:center;justify-content:space-between;padding:22px 56px;border-top:1px solid #e8e5e0;background:#f5f4f0;position:sticky;bottom:0}
.pf-submit-note{font-size:11px;font-weight:300;color:#aaa;max-width:300px;line-height:1.6}
.pf-submit-btn{padding:15px 44px;background:#df0134;color:#fff;border:none;border-radius:2px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;cursor:pointer;transition:background 0.2s,transform 0.15s,opacity 0.2s}
.pf-submit-btn:hover{background:#b5002a}
.pf-submit-btn:active{transform:scale(0.98)}
.pf-submit-btn:disabled{opacity:0.4;cursor:not-allowed}
@media(max-width:900px){
  .pf-topbar,.pf-hero,.pf-submit-bar{padding-left:24px;padding-right:24px}
  .pf-hero{flex-direction:column;align-items:flex-start}
  .pf-hero-title{font-size:36px}
  .pf-body{grid-template-columns:1fr}
  .pf-sidebar{display:none}
  .pf-panel{padding:28px 24px}
  .pf-row{grid-template-columns:1fr}
}
`;

const APPLICANT_DOMAINS = [
  { value:'touristic',    label:'Touristic',    icon:'✈️' },
  { value:'medical',      label:'Medical',      icon:'🏥' },
  { value:'marketable',   label:'Marketable',   icon:'📊' },
  { value:'agricultural', label:'Agricultural', icon:'🌾' },
];
const CODER_DOMAINS = [
  { value:'medical_coding',      label:'Medical Coding',      icon:'💊' },
  { value:'agricultural_coding', label:'Agricultural Coding', icon:'🌿' },
  { value:'educational_coding',  label:'Educational Coding',  icon:'📚' },
  { value:'other',               label:'Other',               icon:'⚡' },
];
const SEGMENTS = [
  { value:'domestic_women', label:'Domestic Women' },
  { value:'special_needs',  label:'Special Needs'  },
  { value:'farmers',        label:'Farmers'        },
  { value:'patients',       label:'Patients'       },
  { value:'tourists',       label:'Tourists'       },
  { value:'children',       label:'Children'       },
  { value:'other',          label:'Other'          },
];
const ACTOR_OPTIONS = ['2','3','4','More','Less'];
const APPLICANT_STEPS = [
  { title:'Profile',     desc:'Talent & nationality' },
  { title:'Domain',      desc:'Service sector'       },
  { title:'Your Phrase', desc:'Describe your skill'  },
  { title:'Payment',     desc:'MTCN tracking'        },
];
const CODER_STEPS = [
  { title:'App Info',  desc:'Name & nationality' },
  { title:'Domain',    desc:'Coding sector'      },
  { title:'Community', desc:'Segment & actors'   },
  { title:'Phrase',    desc:'Describe your app'  },
];

export default function PhraseForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('applicant');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [app, setApp] = useState({ talent:'', nationality:'', gender:'', domain:'', phrase:'', mtcn:'' });
  const [cod, setCod] = useState({ service_app:'', nationality:'', domain:'', domain_other:'', phrase:'', segment:'', segment_other:'', actors:'' });

  const setA = k => e => setApp(p => ({ ...p, [k]: e.target.value }));
  const setC = k => e => setCod(p => ({ ...p, [k]: e.target.value }));

  const appFilled   = Object.values(app).filter(Boolean).length;
  const codFilled   = Object.values(cod).filter(Boolean).length;
  const appStep     = appFilled < 2 ? 0 : appFilled < 4 ? 1 : appFilled < 5 ? 2 : 3;
  const codStep     = codFilled < 2 ? 0 : codFilled < 4 ? 1 : codFilled < 6 ? 2 : 3;
  const currentStep = mode === 'applicant' ? appStep : codStep;
  const steps       = mode === 'applicant' ? APPLICANT_STEPS : CODER_STEPS;

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!user) { setError('You must be logged in.'); return; }
    const payload  = mode === 'applicant' ? { type:'applicant', ...app } : { type:'coder', ...cod };
    const required = mode === 'applicant'
      ? [app.talent, app.nationality, app.gender, app.domain, app.phrase, app.mtcn]
      : [cod.service_app, cod.nationality, cod.domain, cod.phrase, cod.segment, cod.actors];
    if (required.some(v => !v)) { setError('Please fill in all required fields.'); return; }
    setLoading(true);
    try {
      const res  = await fetch(`${BASE_URL}/phrases/add`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization':`Bearer ${user.token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed');
      setSuccess('Your phrase was submitted successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch(err) {
      setError(err.message || 'Failed to submit. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="pf-root">

        <div className="pf-topbar">
          <a href="/" className="pf-logo">Restructive<span>.</span></a>
          <button className="pf-back" onClick={() => navigate('/')}>← Back to Home</button>
        </div>

        <div className="pf-hero">
          <div>
            <p className="pf-hero-eyebrow">{mode === 'applicant' ? 'Service Application' : 'Coder Application'}</p>
            <h1 className="pf-hero-title">
              {mode === 'applicant' ? <><em>Share</em> Your Skill.</> : <><em>Submit</em> Your App Idea.</>}
            </h1>
            <p className="pf-hero-sub">
              {mode === 'applicant'
                ? 'Tell us about your talent and how you want to contribute to your community sector.'
                : 'Describe your service application idea and the value it brings to your community.'}
            </p>
          </div>
          <div className="pf-toggle-wrap">
            <span className="pf-toggle-label">Application Type</span>
            <div className="pf-toggle">
              <button type="button" className={`pf-toggle-btn ${mode==='applicant'?'active':''}`}
                onClick={() => { setMode('applicant'); setError(''); setSuccess(''); }}>Applicant</button>
              <button type="button" className={`pf-toggle-btn ${mode==='coder'?'active':''}`}
                onClick={() => { setMode('coder'); setError(''); setSuccess(''); }}>Coder</button>
            </div>
          </div>
        </div>

        {!user ? (
          <div className="pf-wall">
            <div className="pf-wall-icon">🔒</div>
            <h2 className="pf-wall-title">Login Required</h2>
            <p className="pf-wall-sub">You need an account to submit a phrase. Login or create a free account to continue.</p>
            <div className="pf-wall-btns">
              <button className="pf-wall-btn primary" onClick={() => navigate('/login')}>Login</button>
              <button className="pf-wall-btn secondary" onClick={() => navigate('/register')}>Register</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', flex:1 }}>
            <div className="pf-body">
              <aside className="pf-sidebar">
                {steps.map((s, i) => (
                  <div key={i} className={`pf-sidebar-step ${i===currentStep?'active':i<currentStep?'done':''}`}>
                    <div className="pf-step-num">{i < currentStep ? '✓' : i + 1}</div>
                    <div>
                      <div className="pf-step-title">{s.title}</div>
                      <div className="pf-step-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </aside>

              <div className="pf-panel">
                {error   && <div className="pf-alert error">{error}</div>}
                {success && <div className="pf-alert success">{success}</div>}

                {mode === 'applicant' && (<>
                  <div>
                    <div className="pf-section-head">
                      <div className="pf-section-num">1</div>
                      <h2 className="pf-section-title">Your Profile</h2>
                    </div>
                    <div className="pf-row">
                      <div className="pf-field">
                        <label className="pf-label">Talent or Skill *</label>
                        <input className="pf-input" type="text" value={app.talent} onChange={setA('talent')} placeholder="Name your skill, specialty or degree" />
                      </div>
                      <div className="pf-field">
                        <label className="pf-label">Nationality *</label>
                        <div className="pf-pills">
                          {['Lebanese','Other'].map(n => (
                            <label className="pf-pill" key={n}>
                              <input type="radio" name="app_nat" value={n.toLowerCase()} checked={app.nationality===n.toLowerCase()} onChange={setA('nationality')} />
                              <span className="pf-pill-dot" />{n}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="pf-field full">
                        <label className="pf-label">Gender *</label>
                        <div className="pf-pills">
                          {['Male','Female'].map(g => (
                            <label className="pf-pill" key={g}>
                              <input type="radio" name="app_gender" value={g.toLowerCase()} checked={app.gender===g.toLowerCase()} onChange={setA('gender')} />
                              <span className="pf-pill-dot" />{g}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="pf-section-head">
                      <div className="pf-section-num">2</div>
                      <h2 className="pf-section-title">Service Domain</h2>
                    </div>
                    <div className="pf-domain-grid">
                      {APPLICANT_DOMAINS.map(d => (
                        <label className="pf-domain-card" key={d.value}>
                          <input type="radio" name="app_domain" value={d.value} checked={app.domain===d.value} onChange={setA('domain')} />
                          <span className="pf-domain-icon">{d.icon}</span>{d.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="pf-section-head">
                      <div className="pf-section-num">3</div>
                      <h2 className="pf-section-title">Your Phrase</h2>
                    </div>
                    <div className="pf-field">
                      <label className="pf-label">Describe your service interest and skill *</label>
                      <textarea className="pf-textarea" value={app.phrase} onChange={setA('phrase')} placeholder="Write a phrase that describes your service interest and skill..." />
                    </div>
                  </div>

                  <div>
                    <div className="pf-section-head">
                      <div className="pf-section-num">4</div>
                      <h2 className="pf-section-title">Payment Tracking</h2>
                    </div>
                    <div className="pf-field">
                      <label className="pf-label">MTCN Number *</label>
                      <input className="pf-input" type="text" value={app.mtcn} onChange={setA('mtcn')} placeholder="Enter your MTCN number for payment tracking" />
                    </div>
                  </div>
                </>)}

                {mode === 'coder' && (<>
                  <div>
                    <div className="pf-section-head">
                      <div className="pf-section-num">1</div>
                      <h2 className="pf-section-title">App Information</h2>
                    </div>
                    <span className="pf-mono-badge">coder mode active</span>
                    <div className="pf-row" style={{ marginTop:16 }}>
                      <div className="pf-field">
                        <label className="pf-label">Service App Name *</label>
                        <input className="pf-input" type="text" value={cod.service_app} onChange={setC('service_app')} placeholder="Name your service application" />
                      </div>
                      <div className="pf-field">
                        <label className="pf-label">Nationality *</label>
                        <div className="pf-pills">
                          {['Lebanese','Other'].map(n => (
                            <label className="pf-pill" key={n}>
                              <input type="radio" name="cod_nat" value={n.toLowerCase()} checked={cod.nationality===n.toLowerCase()} onChange={setC('nationality')} />
                              <span className="pf-pill-dot" />{n}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="pf-section-head">
                      <div className="pf-section-num">2</div>
                      <h2 className="pf-section-title">Coding Sectoral Domain</h2>
                    </div>
                    <div className="pf-domain-grid">
                      {CODER_DOMAINS.map(d => (
                        <label className="pf-domain-card" key={d.value}>
                          <input type="radio" name="cod_domain" value={d.value} checked={cod.domain===d.value} onChange={setC('domain')} />
                          <span className="pf-domain-icon">{d.icon}</span>{d.label}
                        </label>
                      ))}
                    </div>
                    {cod.domain === 'other' && (
                      <div className="pf-field" style={{ marginTop:16 }}>
                        <label className="pf-label">Specify Your Coding Sector</label>
                        <input className="pf-input" type="text" value={cod.domain_other} onChange={setC('domain_other')} placeholder="Enter your coding sector" />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="pf-section-head">
                      <div className="pf-section-num">3</div>
                      <h2 className="pf-section-title">Community Segment</h2>
                    </div>
                    <label className="pf-label" style={{ marginBottom:12, display:'block' }}>Who are the beneficiaries of your app? *</label>
                    <div className="pf-pills" style={{ marginBottom:16 }}>
                      {SEGMENTS.map(s => (
                        <label className="pf-pill" key={s.value}>
                          <input type="radio" name="cod_segment" value={s.value} checked={cod.segment===s.value} onChange={setC('segment')} />
                          <span className="pf-pill-dot" />{s.label}
                        </label>
                      ))}
                    </div>
                    {cod.segment === 'other' && (
                      <div className="pf-field" style={{ marginBottom:20 }}>
                        <label className="pf-label">Specify Target Segment</label>
                        <input className="pf-input" type="text" value={cod.segment_other} onChange={setC('segment_other')} placeholder="Enter your target community segment" />
                      </div>
                    )}
                    <div className="pf-field">
                      <label className="pf-label">Number of Actors *</label>
                      <p style={{ fontSize:11, color:'#aaa', marginBottom:12, fontWeight:300 }}>Actors are individuals you need to activate your service system</p>
                      <div className="pf-actors">
                        {ACTOR_OPTIONS.map(a => (
                          <label className="pf-actor" key={a}>
                            <input type="radio" name="cod_actors" value={a} checked={cod.actors===a} onChange={setC('actors')} />{a}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="pf-section-head">
                      <div className="pf-section-num">4</div>
                      <h2 className="pf-section-title">Your Phrase</h2>
                    </div>
                    <div className="pf-field">
                      <label className="pf-label">Describe your app idea and its value *</label>
                      <textarea className="pf-textarea" value={cod.phrase} onChange={setC('phrase')} placeholder="Write a phrase that describes your app idea and the value it brings..." />
                    </div>
                  </div>
                </>)}
              </div>
            </div>

            <div className="pf-submit-bar">
              <p className="pf-submit-note">
                {mode === 'applicant'
                  ? 'Your MTCN is used only for payment verification. All submissions are reviewed.'
                  : 'Your app idea is reviewed by our team. Actors will be matched to your system.'}
              </p>
              <button type="submit" className="pf-submit-btn" disabled={loading || !!success}>
                {loading ? 'Submitting…' : 'Submit Phrase →'}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}