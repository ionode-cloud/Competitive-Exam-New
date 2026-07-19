// Header.jsx — MarqueeBanner + Top Row + MegaNav all in one component
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/* ─── Marquee Banner ─── */
const trendingItems = [
  'OSSSC RI Notification 2026',
  'OPSC OAS Prelims Result',
  'Odisha Police SI Recruitment',
  'OSSC CGL New Exam Pattern',
  'OSSSC ARI Notification 2026',
];
const allItems = [...trendingItems, ...trendingItems];

function MarqueeBanner() {
  return (
    <div className="marquee-banner">
      <div className="marquee-left">
        <span className="marquee-fire-label">🔥 Trending:</span>
        <div className="marquee-track-wrapper">
          <div className="marquee-track">
            {allItems.map((item, idx) => (
              <span className="marquee-item" key={idx}>
                <a href="#">{item}</a>
                <span className="marquee-sep">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="marquee-right">
        <a href="tel:+919876543210">📞 +91 98765 43210</a>
        <a href="mailto:info@prephub.in">✉️ info@prephub.in</a>
      </div>
    </div>
  );
}

/* ─── Nav Tabs ─── */
/* ─── Nav Tabs ─── */
const TABS = [
  { label: 'Home',          to: '/',              arrow: false },
  { 
    label: 'Exam Section',  
    to: '/exam-section',  
    arrow: true,
    categories: [
      { label: 'Bank & Insurance', icon: '🏦', desc: 'IBPS, SBI, LIC exam prep modules' },
      { label: 'SSC & Railway',    icon: '🚆', desc: 'CGL, CHSL, MTS & RRB NTPC packs' },
      { label: 'State PSC / SSSC', icon: '🏛️', desc: 'OPSC OAS, OSSSC RI syllabus prep' },
      { label: 'Police & Defence', icon: '🚔', desc: 'SI, Constable mock test series' },
      { label: 'Teaching',         icon: '📚', desc: 'OTET, OSSTET & school teacher papers' }
    ]
  },
  { 
    label: 'Subject Test',  
    to: '/subject-test',  
    arrow: true,
    categories: [
      { label: 'Mathematics',       icon: '🧮', desc: 'Quantitative aptitude & shortcuts' },
      { label: 'Reasoning',         icon: '🧩', desc: 'Logical, analytical & mental ability' },
      { label: 'English',           icon: '📖', desc: 'Grammar review & vocabulary builder' },
      { label: 'General Knowledge', icon: '🌍', desc: 'National, world history & current affairs' },
      { label: 'Computer',          icon: '💻', desc: 'MS Office, networking & OS fundamentals' },
      { label: 'Odia Language',     icon: '🔤', desc: 'Odia grammar & syntax mock tests' }
    ]
  },
  { 
    label: 'PYQ Ebook',     
    to: '/pyq-ebook',     
    arrow: true,
    categories: [
      { label: 'Computer PYQs',     icon: '💻', desc: 'Previous computer science papers' },
      { label: 'English PYQs',      icon: '📖', desc: 'Solved English grammar papers' },
      { label: 'Odia PYQs',          icon: '🔤', desc: 'Previous Odia grammar sheets' },
      { label: 'Math PYQs',          icon: '🧮', desc: 'Aptitude tests with solutions' },
      { label: 'GK PYQs',            icon: '🌍', desc: 'Solved general knowledge capsules' }
    ]
  },
  { 
    label: 'Material Page', 
    to: '/materials',     
    arrow: true,
    categories: [
      { label: 'Current Affairs Capsule', icon: '📰', desc: 'Daily, monthly updates for 2026' },
      { label: 'Odisha GK Notes',          icon: '🏛️', desc: 'History, geography & schemes of Odisha' },
      { label: 'Static GK Capsule',       icon: '🌍', desc: 'Awards, lists & sports summaries' },
      { label: 'Grammar Capsules',        icon: '📝', desc: 'Formulas & syntax shortcut PDFs' }
    ]
  },
  { label: 'Contact Us',    to: '/contact',       arrow: false },
  { label: 'Subscription',  to: '/subscription',  arrow: false, badge: 'NEW' },
];

function MegaNav() {
  const location = useLocation();
  return (
    <nav className="mega-nav">
      <div className="wrap">
        {TABS.map((tab, i) => (
          <div key={i} className="nav-tab-container">
            <Link
              to={tab.to}
              className={`nav-tab${location.pathname === tab.to ? ' active' : ''}`}
            >
              {tab.label}
              {tab.arrow && <span className="nav-arrow">▾</span>}
              {tab.badge && <span className="badge-new">{tab.badge}</span>}
            </Link>
            {tab.categories && (
              <div className="nav-tab-dropdown">
                {tab.categories.map((cat, j) => (
                  <Link key={j} to={tab.to} className="dropdown-item">
                    <div>
                      <div className="dropdown-item-title">{cat.label}</div>
                      <div className="dropdown-item-desc">{cat.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}

export default function Header() {
  const [secs, setSecs] = useState(11 * 3600 + 31 * 60 + 39);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Popup Modal States
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authForm, setAuthForm] = useState({ name: '', email: '', phone: '', password: '', terms: false });
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  useEffect(() => {
    const id = setInterval(() => setSecs(p => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const checkUser = () => {
      const u = localStorage.getItem('user');
      setUser(u ? JSON.parse(u) : null);
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowDropdown(false);
    window.dispatchEvent(new Event('storage'));
  };

  const handleAuthChange = e => {
    const { name, value, type, checked } = e.target;
    setAuthForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAuthSubmit = e => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (authMode === 'login') {
      if (!authForm.email || !authForm.password) {
        setAuthError('Please fill in all fields.');
        return;
      }
      const nameFromEmail = authForm.email.split('@')[0];
      const displayName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
      const userData = {
        name: displayName === 'Mukesh' ? 'Mukesh' : displayName,
        email: authForm.email,
        isLoggedIn: true
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setAuthSuccess('Logged in successfully!');
      setUser(userData);
      window.dispatchEvent(new Event('storage'));
      setTimeout(() => {
        setShowAuthModal(false);
        setAuthSuccess('');
        setAuthForm({ name: '', email: '', phone: '', password: '', terms: false });
      }, 1000);
    } else {
      if (!authForm.name || !authForm.email || !authForm.phone || !authForm.password) {
        setAuthError('Please fill in all fields.');
        return;
      }
      if (!authForm.terms) {
        setAuthError('You must agree to the Terms & Conditions.');
        return;
      }
      setAuthSuccess('Account created successfully! Switching to login...');
      setTimeout(() => {
        setAuthMode('login');
        setAuthSuccess('');
      }, 1500);
    }
  };

  const h = String(Math.floor(secs / 3600)).padStart(2, '0');
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');

  return (
    <>
      <MarqueeBanner />
      <header>
        {/* Top row */}
        <div className="top-row wrap">
          <Link to="/" className="brand">
            <span className="mark">GE</span>GovExam
          </Link>
          <div className="search-cluster">
            <span className="search-icon-prefix">🔍</span>
            <input className="search-input" type="text" placeholder="Search courses, tests, PDFs, current affairs..." />
            <button className="search-btn">Search</button>
          </div>
          <div className="sale-cluster" style={{ position: 'relative' }}>
            <div className="sale-text">
              🎁 New Year Sale is Live!<br />
              <span className="sale-timer">⏱ {h}:{m}:{s}</span>
            </div>
            {user ? (
              <div style={{ position: 'relative' }}>
                <div className="user-chip" onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: 'pointer' }}>
                  <span className="user-avatar">{(user.name || 'User').substring(0, 2).toUpperCase()}</span>
                  {user.name || 'User'} ▾
                </div>
                {showDropdown && (
                  <div style={{
                    position: 'absolute', top: '100%', right: 0, marginTop: '8px',
                    background: '#fff', border: '1px solid var(--line)', borderRadius: '10px',
                    boxShadow: 'var(--sh-2)', width: '160px', zIndex: 100, display: 'flex', flexDirection: 'column', overflow: 'hidden'
                  }}>
                    <div style={{ padding: '12px 14px', fontSize: '11px', color: 'var(--muted)', borderBottom: '1px solid var(--line)', wordBreak: 'break-all' }}>
                      {user.email || 'user@prephub.in'}
                    </div>
                    <button onClick={handleLogout} style={{
                      padding: '10px 14px', background: 'none', border: 'none', textAlign: 'left',
                      fontSize: '13px', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer',
                      transition: 'background .15s'
                    }}
                    onMouseEnter={e => e.target.style.background = 'var(--bg)'}
                    onMouseLeave={e => e.target.style.background = 'transparent'}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="user-chip" onClick={() => { setShowAuthModal(true); setAuthMode('login'); }} style={{ cursor: 'pointer' }}>
                <span className="user-avatar" style={{ background: 'var(--primary)', color: '#fff' }}>👤</span> Login / Register
              </div>
            )}
          </div>
        </div>
        {/* Tab nav */}
        <MegaNav />
      </header>

      {/* Auth Modal Overlay */}
      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="auth-modal-card" onClick={e => e.stopPropagation()}>
            <button className="auth-modal-close" onClick={() => setShowAuthModal(false)}>✕</button>
            
            {/* Toggle Head */}
            <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '24px', paddingBottom: '2px' }}>
              <button 
                onClick={() => { setAuthMode('login'); setAuthError(''); setAuthSuccess(''); }} 
                style={{ 
                  flex: 1, padding: '10px', background: 'none', border: 'none', 
                  fontSize: '16px', fontWeight: 800, color: authMode === 'login' ? 'var(--primary)' : 'var(--muted)',
                  borderBottom: authMode === 'login' ? '3px solid var(--primary)' : '3px solid transparent',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                Login
              </button>
              <button 
                onClick={() => { setAuthMode('register'); setAuthError(''); setAuthSuccess(''); }} 
                style={{ 
                  flex: 1, padding: '10px', background: 'none', border: 'none', 
                  fontSize: '16px', fontWeight: 800, color: authMode === 'register' ? 'var(--primary)' : 'var(--muted)',
                  borderBottom: authMode === 'register' ? '3px solid var(--primary)' : '3px solid transparent',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                Register
              </button>
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: 850, letterSpacing: '-0.5px', marginBottom: '6px', color: 'var(--ink)', textAlign: 'left' }}>
              {authMode === 'login' ? 'Welcome Back!' : 'Create Premium Account'}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '20px', textAlign: 'left' }}>
              {authMode === 'login' ? 'Log in to access your mock tests and study materials.' : 'Sign up to begin your learning journey.'}
            </p>

            {authError && (
              <div style={{ background: '#FCEBEA', border: '1px solid #B4232F', color: '#B4232F', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', fontWeight: 700, marginBottom: '16px', textAlign: 'left' }}>
                ⚠️ {authError}
              </div>
            )}

            {authSuccess && (
              <div style={{ background: '#E8F8EE', border: '1px solid #0F9D58', color: '#0F9D58', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', fontWeight: 700, marginBottom: '16px', textAlign: 'left' }}>
                ✅ {authSuccess}
              </div>
            )}

            <form onSubmit={handleAuthSubmit}>
              {authMode === 'register' && (
                <div style={{ marginBottom: '12px', textAlign: 'left' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)' }}>Full Name *</label>
                  <input 
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid var(--line)',
                      background: '#f8fafc', fontSize: '13px', color: 'var(--ink)', outline: 'none', boxSizing: 'border-box', marginTop: '4px'
                    }} 
                    name="name" type="text" value={authForm.name} onChange={handleAuthChange} placeholder="Enter your name" required 
                  />
                </div>
              )}

              <div style={{ marginBottom: '12px', textAlign: 'left' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)' }}>Email Address *</label>
                <input 
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid var(--line)',
                    background: '#f8fafc', fontSize: '13px', color: 'var(--ink)', outline: 'none', boxSizing: 'border-box', marginTop: '4px'
                  }} 
                  name="email" type="email" value={authForm.email} onChange={handleAuthChange} placeholder="name@email.com" required 
                />
              </div>

              {authMode === 'register' && (
                <div style={{ marginBottom: '12px', textAlign: 'left' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)' }}>Phone Number *</label>
                  <input 
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid var(--line)',
                      background: '#f8fafc', fontSize: '13px', color: 'var(--ink)', outline: 'none', boxSizing: 'border-box', marginTop: '4px'
                    }} 
                    name="phone" type="tel" value={authForm.phone} onChange={handleAuthChange} placeholder="+91 XXXXX XXXXX" required 
                  />
                </div>
              )}

              <div style={{ marginBottom: '16px', textAlign: 'left' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)' }}>Password *</label>
                <input 
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid var(--line)',
                    background: '#f8fafc', fontSize: '13px', color: 'var(--ink)', outline: 'none', boxSizing: 'border-box', marginTop: '4px'
                  }} 
                  name="password" type="password" value={authForm.password} onChange={handleAuthChange} placeholder="••••••••" required 
                />
              </div>

              {authMode === 'login' ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ cursor: 'pointer' }} /> Remember me
                  </label>
                  <a href="#" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>Forgot?</a>
                </div>
              ) : (
                <div style={{ marginBottom: '20px', fontSize: '12px', textAlign: 'left' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--muted)', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" name="terms" checked={authForm.terms} onChange={handleAuthChange} 
                      style={{ marginTop: '2px', cursor: 'pointer' }} required 
                    />
                    <span>I agree to the Terms & Privacy Policy.</span>
                  </label>
                </div>
              )}

              <button 
                type="submit" 
                style={{
                  width: '100%', padding: '12px', background: 'linear-gradient(135deg, #FFC93C 0%, #F59E0B 100%)',
                  color: '#0F172A', border: 'none', borderRadius: '8px', fontWeight: '800', fontSize: '14.5px', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)', transition: 'all 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(245, 158, 11, 0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
                }}
              >
                {authMode === 'login' ? 'Login to Portal' : 'Register Account'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12.5px', color: 'var(--muted)' }}>
              {authMode === 'login' ? (
                <span>
                  Don't have an account?{' '}
                  <button 
                    onClick={() => { setAuthMode('register'); setAuthError(''); setAuthSuccess(''); }} 
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 800, cursor: 'pointer', padding: 0 }}
                  >
                    Register Now
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button 
                    onClick={() => { setAuthMode('login'); setAuthError(''); setAuthSuccess(''); }} 
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 800, cursor: 'pointer', padding: 0 }}
                  >
                    Login here
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
