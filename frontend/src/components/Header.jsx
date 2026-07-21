// Header.jsx — MarqueeBanner + Top Row + MegaNav all in one component
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaPhoneAlt,
  FaUniversity,
  FaTrain,
  FaLandmark,
  FaShieldAlt,
  FaChalkboardTeacher,
  FaCalculator,
  FaPuzzlePiece,
  FaBookOpen,
  FaGlobe,
  FaLaptopCode,
  FaFont,
  FaNewspaper,
  FaFileAlt,
  FaSearch,
  FaUser,
  FaGift,
  FaClock,
  FaTimes,
  FaExclamationTriangle,
  FaCheckCircle,
  FaCopy,
  FaCheck,
  FaTag
} from 'react-icons/fa';

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
        <a href="tel:+919876543210" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><FaPhoneAlt /> +91 98765 43210</a>
        <a href="https://sunilsiracademy.com/">sunilsiracademy.com</a>
      </div>
    </div>
  );
}

/* ─── Nav Tabs ─── */
const TABS = [
  { label: 'Home',          to: '/',              arrow: false },
  { 
    label: 'Exam Section',  
    to: '/exam-section',  
    arrow: true,
    categories: [
      { label: 'Bank & Insurance', icon: <FaUniversity />, desc: 'IBPS, SBI, LIC exam prep modules' },
      { label: 'SSC & Railway',    icon: <FaTrain />, desc: 'CGL, CHSL, MTS & RRB NTPC packs' },
      { label: 'State PSC / SSSC', icon: <FaLandmark />, desc: 'OPSC OAS, OSSSC RI syllabus prep' },
      { label: 'Police & Defence', icon: <FaShieldAlt />, desc: 'SI, Constable mock test series' },
      { label: 'Teaching',         icon: <FaChalkboardTeacher />, desc: 'OTET, OSSTET & school teacher papers' }
    ]
  },
  { 
    label: 'Moke Test',  
    to: '/mock-test',  
    arrow: true,
    categories: [
      { label: 'State PSC / SSSC',  icon: <FaLandmark />, desc: 'OSSSC, OSSC CGL mock exams' },
      { label: 'SSC & Railway',     icon: <FaTrain />, desc: 'SSC CGL, CHSL, RRB mocks' },
      { label: 'Bank & Insurance',  icon: <FaUniversity />, desc: 'IBPS, SBI, LIC mocks' },
      { label: 'Police & Defence',  icon: <FaShieldAlt />, desc: 'Odisha Police SI & Constable mocks' }
    ]
  },
  { 
    label: 'Subject Test Page', 
    to: '/subject-test', 
    arrow: true,
    categories: [
      { label: 'Mathematics',       icon: <FaCalculator />, desc: 'Quantitative aptitude & shortcuts' },
      { label: 'Reasoning',         icon: <FaPuzzlePiece />, desc: 'Logical, analytical & mental ability' },
      { label: 'English',           icon: <FaBookOpen />, desc: 'Grammar review & vocabulary builder' },
      { label: 'General Knowledge', icon: <FaGlobe />, desc: 'National, world history & current affairs' },
      { label: 'Computer',          icon: <FaLaptopCode />, desc: 'MS Office, networking & OS fundamentals' },
      { label: 'Odia Language',     icon: <FaFont />, desc: 'Odia grammar & syntax mock tests' }
    ]
  },
  { 
    label: 'PYQ Ebook',     
    to: '/pyq-ebook',     
    arrow: true,
    categories: [
      { label: 'Computer PYQs',     icon: <FaLaptopCode />, desc: 'Previous computer science papers' },
      { label: 'English PYQs',      icon: <FaBookOpen />, desc: 'Solved English grammar papers' },
      { label: 'Odia PYQs',          icon: <FaFont />, desc: 'Previous Odia grammar sheets' },
      { label: 'Math PYQs',          icon: <FaCalculator />, desc: 'Aptitude tests with solutions' },
      { label: 'GK PYQs',            icon: <FaGlobe />, desc: 'Solved general knowledge capsules' }
    ]
  },
  { 
    label: 'Material Page', 
    to: '/materials',     
    arrow: true,
    categories: [
      { label: 'Current Affairs Capsule', icon: <FaNewspaper />, desc: 'Daily, monthly updates for 2026' },
      { label: 'Odisha GK Notes',          icon: <FaLandmark />, desc: 'History, geography & schemes of Odisha' },
      { label: 'Static GK Capsule',       icon: <FaGlobe />, desc: 'Awards, lists & sports summaries' },
      { label: 'Grammar Capsules',        icon: <FaFileAlt />, desc: 'Formulas & syntax shortcut PDFs' }
    ]
  },
  { label: 'Contact Us',    to: '/contact',       arrow: false },
  { label: 'Subscription',  to: '/subscription',  arrow: false, badge: 'NEW' },
];

function MegaNav() {
  const location = useLocation();
  const [openTab, setOpenTab] = useState(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const tabRefs = useRef([]);

  const handleClickOutside = useCallback((e) => {
    if (!e.target.closest('.nav-tab-container') && !e.target.closest('.mobile-dropdown-panel')) {
      setOpenTab(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => { setOpenTab(null); }, [location.pathname]);

  const ITEMS_PER_COL = 5;

  const toggleDropdown = (i, e) => {
    e.preventDefault();
    if (openTab === i) {
      setOpenTab(null);
      return;
    }
    const rect = tabRefs.current[i]?.getBoundingClientRect();
    if (rect) {
      const isMobile = window.innerWidth <= 768;
      const catCount = TABS[i]?.categories?.length || 0;
      const colCount = Math.ceil(catCount / ITEMS_PER_COL);
      const colWidth = 260;
      const totalWidth = colCount * colWidth;
      const maxLeft = window.innerWidth - totalWidth - 8;
      const left = Math.min(Math.max(0, rect.left), maxLeft);
      setDropdownStyle(
        isMobile
          ? {
              position: 'fixed',
              top: rect.bottom + 4,
              left: 8,
              right: 8,
              width: 'auto',
              zIndex: 9999,
            }
          : {
              position: 'fixed',
              top: rect.bottom + 4,
              left,
              width: totalWidth,
              zIndex: 9999,
            }
      );
    }
    setOpenTab(i);
  };

  const currentOpenTab = openTab !== null ? TABS[openTab] : null;

  return (
    <>
      <nav className="mega-nav">
        <div className="wrap">
          {TABS.map((tab, i) => (
            <div key={i} className="nav-tab-container" ref={el => tabRefs.current[i] = el}>
              {tab.categories ? (
                <button
                  className={`nav-tab nav-tab-btn${location.pathname === tab.to ? ' active' : ''}${openTab === i ? ' tab-open' : ''}`}
                  onClick={(e) => toggleDropdown(i, e)}
                  aria-expanded={openTab === i}
                >
                  {tab.label}
                  <span className={`nav-arrow${openTab === i ? ' rotated' : ''}`}>▾</span>
                  {tab.badge && <span className="badge-new">{tab.badge}</span>}
                </button>
              ) : (
                <Link
                  to={tab.to}
                  className={`nav-tab${location.pathname === tab.to ? ' active' : ''}`}
                >
                  {tab.label}
                  {tab.badge && <span className="badge-new">{tab.badge}</span>}
                </Link>
              )}
            </div>
          ))}
        </div>
      </nav>

      {openTab !== null && currentOpenTab?.categories && (() => {
        const cats = currentOpenTab.categories;
        const COLS = Math.ceil(cats.length / ITEMS_PER_COL);
        const columns = Array.from({ length: COLS }, (_, ci) =>
          cats.slice(ci * ITEMS_PER_COL, ci * ITEMS_PER_COL + ITEMS_PER_COL)
        );
        return (
          <div
            className="mobile-dropdown-panel"
            style={{
              ...dropdownStyle,
              display: 'flex',
              flexDirection: 'row',
              gap: 0,
              padding: 0,
              overflow: 'hidden',
            }}
          >
            <div className="dropdown-arrow-tip" />
            {columns.map((col, ci) => (
              <div
                key={ci}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '0 0 260px',
                  width: 260,
                  borderRight: ci < columns.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                  padding: '8px 0',
                }}
              >
                {col.map((cat, j) => (
                  <Link
                    key={j}
                    to={currentOpenTab.to}
                    className="dropdown-item"
                    onClick={() => setOpenTab(null)}
                  >
                    <span style={{ fontSize: 18, flexShrink: 0, color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>{cat.icon}</span>
                    <div>
                      <div className="dropdown-item-title">{cat.label}</div>
                      <div className="dropdown-item-desc">{cat.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        );
      })()}
    </>
  );
}

export default function Header() {
  const [secs, setSecs] = useState(11 * 3600 + 31 * 60 + 39);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', phone: '', password: '', terms: false });
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // New Year Sale Coupon Modal states
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [couponCopied, setCouponCopied] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [couponMessage, setCouponMessage] = useState('');

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
        <div className="top-row wrap">
          <Link to="/" className="brand">
            <span className="mark">GE</span>GovExam
          </Link>
          <div className="search-cluster">
            <span className="search-icon-prefix" style={{ display: 'flex', alignItems: 'center' }}><FaSearch /></span>
            <input className="search-input" type="text" placeholder="Search courses, tests, PDFs, current affairs..." />
            <button className="search-btn">Search</button>
          </div>
          <div className="sale-cluster" style={{ position: 'relative' }}>
            <div 
              className="sale-text" 
              onClick={() => setShowSaleModal(true)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', cursor: 'pointer', userSelect: 'none' }}
              title="Click to view & claim New Year Sale Coupon!"
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <FaGift style={{ color: '#F59E0B' }} /> New Year Sale is Live!
              </span>
              <span className="sale-timer" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <FaClock /> {h}:{m}:{s}
              </span>
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
              <div className="user-chip" onClick={() => { setShowAuthModal(true); setAuthMode('login'); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="user-avatar" style={{ background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaUser fontSize={12} /></span> Login / Register
              </div>
            )}
          </div>
        </div>
        <MegaNav />
      </header>

      {/* New Year Sale Coupon Popup Form Modal */}
      {showSaleModal && (
        <div className="auth-modal-overlay" onClick={() => setShowSaleModal(false)}>
          <div className="auth-modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '460px', padding: 0, overflow: 'hidden', borderRadius: '16px' }}>
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
              padding: '24px 24px 20px', color: '#fff', position: 'relative'
            }}>
              <button 
                onClick={() => setShowSaleModal(false)} 
                style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
                  width: '28px', height: '28px', color: '#fff', fontSize: '13px', fontWeight: '800',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <FaTimes />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#FFC93C', fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                <FaGift /> Festive Special Offer
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 900, margin: '6px 0 4px', color: '#fff', letterSpacing: '-0.5px', textAlign: 'left' }}>
                🎉 New Year Sale is Live!
              </h2>
              <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0, textAlign: 'left' }}>
                Get flat 50% discount on all premium test series &amp; study material plans.
              </p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)',
                color: '#FFC93C', fontSize: '12px', fontWeight: 800, padding: '4px 12px', borderRadius: '20px', marginTop: '12px'
              }}>
                <FaClock /> Offer Ends In: {h}h {m}m {s}s
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px' }}>
              {/* Coupon Code Banner Box */}
              <div style={{
                background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                border: '2px dashed #F59E0B', borderRadius: '12px', padding: '16px 20px',
                marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#92400E', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    Your Special Coupon Code
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: '#78350F', letterSpacing: '1.5px', marginTop: '2px' }}>
                    NEWYEAR50
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('NEWYEAR50');
                    setCouponCopied(true);
                    setTimeout(() => setCouponCopied(false), 2000);
                  }}
                  style={{
                    padding: '8px 16px', background: '#D97706', color: '#fff',
                    border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '12.5px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                    boxShadow: '0 2px 8px rgba(217, 119, 6, 0.3)', transition: 'all 0.15s'
                  }}
                >
                  {couponCopied ? <><FaCheck /> Copied!</> : <><FaCopy /> Copy Code</>}
                </button>
              </div>

              {/* Benefits list */}
              <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                  WHAT YOU GET WITH THIS COUPON:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'Flat 50% instant discount on all subscription packages',
                    'Free PYQ E-Book Library Access (Worth ₹999)',
                    '100+ Full Length & Subject-Wise Mock Test Series',
                    'All Odisha Exams: OSSSC, OPSC OAS, OSSC CGL & Police SI'
                  ].map((benefit, bIdx) => (
                    <div key={bIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--ink)', fontWeight: 600 }}>
                      <span style={{ color: '#0F9D58', fontWeight: 900, display: 'flex', alignItems: 'center' }}><FaCheckCircle /></span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Claim Form */}
              <form onSubmit={(e) => {
                e.preventDefault();
                setCouponMessage('Coupon NEWYEAR50 applied successfully! Redirecting to plans...');
                setTimeout(() => {
                  setShowSaleModal(false);
                  setCouponMessage('');
                  window.location.href = '/subscription';
                }, 1200);
              }}>
                <div style={{ marginBottom: '14px', textAlign: 'left' }}>
                  <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--muted)', marginBottom: '4px', display: 'block' }}>Applied Coupon Code</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text" 
                      value="NEWYEAR50" 
                      readOnly 
                      style={{
                        width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #F59E0B',
                        background: '#FFFBEB', fontSize: '14px', fontWeight: '800', color: '#92400E', outline: 'none', boxSizing: 'border-box'
                      }} 
                    />
                    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#0F9D58', fontWeight: '800', fontSize: '12px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <FaTag /> 50% OFF
                    </span>
                  </div>
                </div>

                <div style={{ marginBottom: '16px', textAlign: 'left' }}>
                  <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--muted)', marginBottom: '4px', display: 'block' }}>Select Subscription Plan</label>
                  <select
                    value={selectedPlan}
                    onChange={e => setSelectedPlan(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid var(--line)',
                      background: '#f8fafc', fontSize: '13.5px', fontWeight: '700', color: 'var(--ink)', outline: 'none', boxSizing: 'border-box'
                    }}
                  >
                    <option value="starter">Starter Plan — ₹249 (Reg. ₹499)</option>
                    <option value="pro">Pro Package (Best Value) — ₹749 (Reg. ₹1,499)</option>
                    <option value="super">Super Access — ₹1,499 (Reg. ₹2,999)</option>
                  </select>
                </div>

                {couponMessage && (
                  <div style={{ background: '#E8F8EE', border: '1px solid #0F9D58', color: '#0F9D58', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: 6, textAlign: 'left' }}>
                    <FaCheckCircle /> {couponMessage}
                  </div>
                )}

                <button
                  type="submit"
                  style={{
                    width: '100%', padding: '12px', background: 'linear-gradient(135deg, #FFC93C 0%, #F59E0B 100%)',
                    color: '#0F172A', border: 'none', borderRadius: '8px', fontWeight: '900', fontSize: '14.5px', cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(245, 158, 11, 0.5)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(245, 158, 11, 0.4)';
                  }}
                >
                  Claim 50% Off &amp; Redeem Offer →
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="auth-modal-card" onClick={e => e.stopPropagation()}>
            <button className="auth-modal-close" onClick={() => setShowAuthModal(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaTimes /></button>
            
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
              <div style={{ background: '#FCEBEA', border: '1px solid #B4232F', color: '#B4232F', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', fontWeight: 700, marginBottom: '16px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 6 }}>
                <FaExclamationTriangle /> {authError}
              </div>
            )}

            {authSuccess && (
              <div style={{ background: '#E8F8EE', border: '1px solid #0F9D58', color: '#0F9D58', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', fontWeight: 700, marginBottom: '16px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 6 }}>
                <FaCheckCircle /> {authSuccess}
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
