import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* ══════════════════════════════════════════════════════════
   1. HERO DASHBOARD
══════════════════════════════════════════════════════════ */
const catTiles = [
  { icon: '🏦', label: 'Bank & Insurance',  bg: 'var(--blue-bg)',   go: 'var(--blue)'   },
  { icon: '🚆', label: 'SSC & Railway',     bg: 'var(--green-bg)',  go: 'var(--green)'  },
  { icon: '🏛️', label: 'Regulatory Bodies', bg: 'var(--purple-bg)', go: 'var(--purple)' },
  { icon: '📍', label: 'State PSC / SSSC',  bg: 'var(--orange-bg)', go: 'var(--orange)' },
];

const promoSlides = [
  { tag: 'MAINS QUANT BATCH', title: 'Saviour 4.0 — One Stop Solution', desc: '50+ live mains-level quant classes, topic-wise sessions, sectional tests + quizzes.', price: '₹499', orig: '₹1,999', cta: 'Grab It Now' },
  { tag: 'OPSC OAS BATCH', title: 'Mission OAS 2026 — Comprehensive', desc: 'Integrated Prelims + Mains syllabus coverage with senior civil servant mentors.', price: '₹2,499', orig: '₹9,999', cta: 'Enrol Now' },
  { tag: 'OSSSC RI / ARI', title: 'Revenue Inspector Special Batch', desc: 'Complete syllabus of Mathematics, Computer, Odia, English and General Knowledge.', price: '₹999', orig: '₹3,999', cta: 'Join Batch' },
  { tag: 'OSSC CGL BATCH', title: 'CGL Target Batch 2026', desc: 'Topic wise video classes, daily quizzes, full-length test series and doubt clearing.', price: '₹1,199', orig: '₹4,999', cta: 'Get Admission' },
];

function Dashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % promoSlides.length), 4000);
    return () => clearInterval(timer);
  }, []);
  const slide = promoSlides[currentSlide];

  return (
    <div className="dashboard-full">
      <div className="dash-grid">
        <div className="cat-tiles">
          {catTiles.map((t, i) => (
            <div key={i} className="cat-tile" style={{ background: t.bg }}>
              <span className="icon">{t.icon}</span>
              <h3>{t.label}</h3>
              <span className="go" style={{ background: t.go }}>→</span>
            </div>
          ))}
        </div>
        <div className="promo-banner" style={{ transition: 'all 0.5s ease-in-out' }}>
          <span className="promo-tag" style={{ animation: 'fadeIn 0.5s' }}>{slide.tag}</span>
          <h2 style={{ animation: 'fadeIn 0.5s' }}>{slide.title}</h2>
          <p style={{ animation: 'fadeIn 0.5s' }}>{slide.desc}</p>
          <div className="promo-price" style={{ animation: 'fadeIn 0.5s' }}>
            <span>{slide.orig}</span>{slide.price}
          </div>
          <a className="promo-cta" style={{ animation: 'fadeIn 0.5s' }}>{slide.cta}</a>
          <div className="promo-dots">
            {promoSlides.map((_, i) => (
              <span
                key={i}
                className={currentSlide === i ? 'active' : ''}
                onClick={() => setCurrentSlide(i)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION HEADER HELPER
══════════════════════════════════════════════════════════ */
function SectionHeader({ eyebrow, title, linkTo, linkLabel }) {
  return (
    <div className="section-head-row" style={{ marginBottom: '32px' }}>
      <div>
        <div className="eyebrow" style={{ letterSpacing: '1.5px', fontWeight: 800, color: '#F59E0B' }}>{eyebrow}</div>
        <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 28px)', fontWeight: 850, letterSpacing: '-0.5px', marginTop: '6px' }}>{title}</h2>
      </div>
      {linkTo && (
        <Link className="see-all" to={linkTo} style={{ fontSize: '13.5px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', transition: 'transform 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
          onMouseLeave={e => e.currentTarget.style.transform = ''}>
          {linkLabel || 'View All →'}
        </Link>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   2. QUICK ACCESS
══════════════════════════════════════════════════════════ */
const qaPanels = [
  { 
    bgAccent: 'rgba(124, 58, 237, 0.08)', 
    themeColor: '#7C3AED', 
    icon: '⭐', 
    title: 'Popular', 
    sub: 'Best-selling picks',
    links: [
      { icon: '📄', label: 'PYQ Bank', href: '/pyq-ebook' }, 
      { icon: '📝', label: 'Mock Tests', href: '/subject-test' }, 
      { icon: '🏆', label: 'Test Series', href: '/subject-test' }, 
      { icon: '💎', label: 'Super Plan', href: '/subscription' }
    ] 
  },
  { 
    bgAccent: 'rgba(16, 185, 129, 0.08)', 
    themeColor: '#10B981', 
    icon: '🎥', 
    title: 'Video Classes', 
    sub: 'Learn, practice, improve',
    links: [
      { icon: '🧮', label: 'Quants', href: '/subject-test' }, 
      { icon: '🧩', label: 'Reasoning', href: '/subject-test' }, 
      { icon: '📖', label: 'English', href: '/subject-test' }, 
      { icon: '🌍', label: 'GK Hustle', href: '/materials' }
    ] 
  },
  { 
    bgAccent: 'rgba(59, 130, 246, 0.08)', 
    themeColor: '#3B82F6', 
    icon: '🎯', 
    title: 'Free Materials', 
    sub: 'Practice daily, free',
    links: [
      { icon: '📁', label: 'Free PDFs', href: '/materials' }, 
      { icon: '✅', label: 'Practice Quiz', href: '/subject-test' }, 
      { icon: '📄', label: 'PYP', href: '/pyq-ebook' }, 
      { icon: '📰', label: 'Daily CA', href: '/materials' }
    ] 
  },
  { 
    bgAccent: 'rgba(245, 158, 11, 0.08)', 
    themeColor: '#F59E0B', 
    icon: '📣', 
    title: 'Follow Us', 
    sub: 'Instant updates',
    links: [
      { icon: '💬', label: 'WhatsApp', href: '/contact' }, 
      { icon: '📷', label: 'Instagram', href: '/contact' }, 
      { icon: '✈️', label: 'Telegram', href: '/contact' }, 
      { icon: '▶️', label: 'YouTube', href: '/contact' }
    ] 
  },
];

function QuickAccess() {
  return (
    <section style={{ padding: '0', background: 'linear-gradient(to bottom, #f8fafc, #ffffff)' }}>
      <div className="wrap-full">
        <div className="qa-grid">
          {qaPanels.map((panel, i) => (
            <div key={i} className="qa-card-premium" style={{ '--bg-accent': panel.bgAccent }}>
              <div className="qa-card-header">
                <div className="qa-card-icon-wrap" style={{ color: panel.themeColor }}>
                  {panel.icon}
                </div>
                <div className="qa-card-title-wrap">
                  <h3>{panel.title}</h3>
                  <p>{panel.sub}</p>
                </div>
              </div>
              <div className="qa-card-grid">
                {panel.links.map((link, j) => (
                  <Link key={j} className="qa-card-link-item" to={link.href} style={{ '--theme-color': panel.themeColor }}>
                    <span className="qa-card-link-icon">{link.icon}</span>
                    <span className="qa-card-link-label">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   3. HOME SECTION — EXAM SECTION (Luxury Resort Cards)
══════════════════════════════════════════════════════════ */
const homeExamCategories = [
  { icon: '🏦', label: 'Bank & Insurance',  color: '#1957D6', banner: 'linear-gradient(135deg, #1957D6 0%, #1e3a8a 100%)', count: '12 exams', rating: '★ 4.9' },
  { icon: '🚆', label: 'SSC & Railway',     color: '#0F9D58', banner: 'linear-gradient(135deg, #0F9D58 0%, #064e3b 100%)', count: '8 exams', rating: '★ 4.8'  },
  { icon: '🏛️', label: 'State PSC / SSSC',  color: '#7C3AED', banner: 'linear-gradient(135deg, #7C3AED 0%, #4c1d95 100%)', count: '15 exams', rating: '★ 4.9' },
  { icon: '🚔', label: 'Police & Defence',  color: '#B4232F', banner: 'linear-gradient(135deg, #B4232F 0%, #7f1d1d 100%)', count: '6 exams', rating: '★ 4.7'  },
  { icon: '📚', label: 'Teaching',          color: '#EA7A1E', banner: 'linear-gradient(135deg, #EA7A1E 0%, #7c2d12 100%)', count: '9 exams', rating: '★ 4.8'  },
];

function ExamSectionPreview() {
  return (
    <section id="exam-section" style={{ background: '#fff', padding: '0' }}>
      <div className="wrap-full">
        <SectionHeader eyebrow="🎯 Exam Section" title="Explore Curated Exam Categories" linkTo="/exam-section" linkLabel="All Categories →" />
        <div className="exam-grid">
          {homeExamCategories.map((cat, i) => (
            <Link key={i} to="/exam-section" style={{ textDecoration: 'none' }}>
              <div className="exam-card-premium-v2" style={{ '--accent-color': cat.color }}>
                {/* Header Banner Background */}
                <div className="exam-card-v2-header" style={{ background: cat.banner }}>
                  <span>{cat.icon}</span>
                  {/* Rating tag */}
                  <div className="exam-card-v2-rating">{cat.rating}</div>
                </div>
                {/* Description details */}
                <div className="exam-card-v2-body">
                  <h3>{cat.label}</h3>
                  <p>{cat.count}</p>
                  <div className="exam-card-v2-footer">
                    <span>Explore Pack</span>
                    <span style={{ marginLeft: '4px' }}>→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   4. HOME SECTION — SUBJECT TEST (Horizontal Premium Cards)
══════════════════════════════════════════════════════════ */
const homeSubjectTests = [
  { icon: '🧮', name: 'Mathematics', color: '#B4232F', bg: '#FCEBEA', desc: 'Quantitative aptitude sets', tests: 4, free: 2, banner: 'linear-gradient(135deg, #B4232F 0%, #7f1d1d 100%)' },
  { icon: '🧩', name: 'Reasoning',   color: '#7C3AED', bg: '#F3ECFE', desc: 'Logical & mental tests', tests: 4, free: 2, banner: 'linear-gradient(135deg, #7C3AED 0%, #4c1d95 100%)' },
  { icon: '📖', name: 'English',     color: '#1957D6', bg: '#EAF1FD', desc: 'Grammar & vocab review', tests: 4, free: 2, banner: 'linear-gradient(135deg, #1957D6 0%, #1e3a8a 100%)' },
  { icon: '🌍', name: 'GK',          color: '#0F9D58', bg: '#E8F8EE', desc: 'State & national awareness', tests: 4, free: 2, banner: 'linear-gradient(135deg, #0F9D58 0%, #064e3b 100%)' },
  { icon: '💻', name: 'Computer',    color: '#0891B2', bg: '#E0F7FA', desc: 'OS & software systems', tests: 4, free: 2, banner: 'linear-gradient(135deg, #0891B2 0%, #164e63 100%)' },
  { icon: '🔤', name: 'Odia',        color: '#EA7A1E', bg: '#FEF1E4', desc: 'Odia syntax & revision', tests: 4, free: 2, banner: 'linear-gradient(135deg, #EA7A1E 0%, #7c2d12 100%)' },
];

function SubjectTestPreview() {
  return (
    <section id="subject-test" style={{ padding: '0', background: 'var(--bg)' }}>
      <div className="wrap-full">
        <SectionHeader eyebrow="📝 Subject Test" title="Popular Destinations: Subject Modules" linkTo="/subject-test" linkLabel="All Subjects →" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '24px' }}>
          {homeSubjectTests.map((s, i) => (
            <Link key={i} to="/subject-test" style={{ textDecoration: 'none' }}>
              <div className="subject-card-premium" style={{ '--accent-color': s.color }}>
                {/* Colored Top Header Banner */}
                <div className="subject-card-banner" style={{ background: s.banner }}>
                  {/* Floating Circular Offset Icon */}
                  <div className="subject-card-icon">
                    {s.icon}
                  </div>
                </div>
                {/* Description Body */}
                <div className="subject-card-body">
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                  <div className="subject-card-stats">
                    <span>📋 {s.tests} mock tests</span>
                    <span style={{ color: s.color, fontWeight: 700 }}>{s.free} Free tests</span>
                  </div>
                  <div className="subject-card-btn">
                    <span>Practice Now</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   5. HOME SECTION — PYQ EBOOK (Neumorphic Card Design)
══════════════════════════════════════════════════════════ */
const homePYQBooks = [
  { subject: 'Computer',     icon: '💻', color: '#1957D6', bg: '#EAF1FD', tag: '🔥 Most Demanded', pages: '180 pages', price: '₹199' },
  { subject: 'English',      icon: '📖', color: '#0F9D58', bg: '#E8F8EE', tag: '⭐ Best Seller',    pages: '220 pages', price: '₹149' },
  { subject: 'Odia',         icon: '🔤', color: '#7C3AED', bg: '#F3ECFE', tag: '🆕 New Edition',   pages: '160 pages', price: '₹129' },
  { subject: 'Mathematics',  icon: '🧮', color: '#B4232F', bg: '#FCEBEA', tag: '⚡ High Demand',   pages: '250 pages', price: '₹219' },
  { subject: 'General Knowledge', icon: '🌍', color: '#EA7A1E', bg: '#FEF1E4', tag: '🔥 Most Demanded', pages: '300 pages', price: '₹249' },
  { subject: 'OSSSC RI PYQ', icon: '📋', color: '#B4232F', bg: '#FCEBEA', tag: '🆕 Free',          pages: '140 pages', price: 'Free' },
];

function PYQEbookPreview() {
  return (
    <section id="pyq-ebook" style={{ background: '#fff', padding: '0' }}>
      <div className="wrap-full">
        <SectionHeader eyebrow="📚 PYQ Ebook" title="Neumorphic E-Book Library Showcase" linkTo="/pyq-ebook" linkLabel="All E-Books →" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '22px' }}>
          {homePYQBooks.map((book, i) => (
            <Link key={i} to="/pyq-ebook" style={{ textDecoration: 'none' }}>
              <div className="neumorphic-card">
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  {/* Neumorphic rotating circle container */}
                  <div className="neumorphic-icon-circle" style={{ color: book.color, flexShrink: 0 }}>
                    {book.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: '9px', fontWeight: 800, color: book.color, background: `${book.color}11`, padding: '2px 8px', borderRadius: '10px' }}>
                      {book.tag}
                    </span>
                    <h3 style={{ fontSize: '14.5px', fontWeight: 850, margin: '4px 0 0', color: 'var(--ink)' }}>{book.subject}</h3>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1.5px dashed rgba(0,0,0,0.06)', paddingTop: '12px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>📋 {book.pages}</span>
                  <span style={{ fontSize: '14.5px', fontWeight: 800, color: book.color }}>{book.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   6. HOME SECTION — MATERIAL PAGE (Why Choose Us / Grad Border)
══════════════════════════════════════════════════════════ */
const homeMaterials = [
  { title: 'Current Affairs', icon: '📰', color: '#B4232F', bg: '#FCEBEA', desc: 'Daily & Monthly Current Affairs PDF — Updated for 2026 Exams', tag: '🔥 Most Demanded' },
  { title: 'Odisha GK',       icon: '🏛️', color: '#7C3AED', bg: '#F3ECFE', desc: 'History, Geography, Culture, Economy, Govt. Schemes of Odisha', tag: '⭐ Top Rated' },
  { title: 'Static GK',       icon: '🌍', color: '#1957D6', bg: '#EAF1FD', desc: 'Awards, Sports, Books, Science, Polity, Economy capsule',       tag: '⚡ High Demand' },
  { title: 'Grammar & English',icon: '📝', color: '#0F9D58', bg: '#E8F8EE', desc: 'English Prepositions, Rules, Usage & Practice Questions',        tag: '🆕 Newly Added' },
];

function MaterialPagePreview() {
  return (
    <section id="material-page" style={{ padding: '0', background: 'var(--bg)' }}>
      <div className="wrap-full">
        <SectionHeader eyebrow="📁 Material Page" title="Statistics & Core Study Repositories" linkTo="/materials" linkLabel="Full Library →" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '20px' }}>
          {homeMaterials.map((m, i) => (
            <Link key={i} to="/materials" style={{ textDecoration: 'none' }}>
              <div className="grad-border-card" style={{ '--accent-color': m.color }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: m.bg, color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                    {m.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: m.color, background: `${m.color}15`, padding: '2px 8px', borderRadius: '12px', display: 'inline-block', marginBottom: '6px' }}>
                      {m.tag}
                    </span>
                    <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 4px' }}>{m.title}</h3>
                    <p style={{ fontSize: '12.5px', color: 'var(--muted)', margin: 0, lineHeight: 1.45 }}>{m.desc}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   8. HOME SECTION — SUBSCRIPTION (Premium Glassmorphism Packages)
══════════════════════════════════════════════════════════ */
const homePackages = [
  { name: 'Starter Plan',   price: '₹499',   period: '/mo', color: '#1957D6', bg: '#EAF1FD', features: ['5 Mock Tests', '10 Subject Tests', 'Basic Materials'], highlight: false },
  { name: 'Pro Package',    price: '₹1,499', period: '/mo', color: '#7C3AED', bg: '#F3ECFE', features: ['50 Mock Tests', 'All Subject Tests', 'Live Classes'], highlight: true },
  { name: 'Super Access',   price: '₹2,999', period: '/mo', color: '#B4232F', bg: '#FCEBEA', features: ['Unlimited Tests', 'All Courses', 'Doubt Sessions'], highlight: false },
];

function SubscriptionPreview() {
  return (
    <section id="subscription" style={{ background: '#fff', padding: '0' }}>
      <div className="wrap-full">
        <SectionHeader eyebrow="💎 Subscription" title="Choose the Luxury Plan for Ultimate Success" linkTo="/subscription" linkLabel="View All Subscriptions →" />
        <div className="pkg-grid" style={{ alignItems: 'stretch' }}>
          {homePackages.map((pkg, i) => (
            <div key={i} className={`pricing-card-premium ${pkg.highlight ? 'recommended' : ''}`} style={{ 
              background: pkg.bg, 
              border: `1.5px solid ${pkg.color}33`, 
              color: 'var(--ink)',
              transform: pkg.highlight ? 'scale(1.03)' : 'none',
              boxShadow: pkg.highlight ? `0 10px 30px ${pkg.color}22` : 'none'
            }}>
              {pkg.highlight && (
                <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                  <span className="premium-price-badge" style={{ background: pkg.color, color: '#fff' }}>BEST RECOMMENDED</span>
                </div>
              )}
              <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: pkg.color, marginBottom: '10px' }}>
                {pkg.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                <span style={{ fontSize: '32px', fontWeight: 900, color: 'var(--ink)' }}>{pkg.price}</span>
                <span style={{ fontSize: '14px', opacity: 0.75, color: 'var(--muted)' }}>{pkg.period}</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '20px', marginBottom: '28px' }}>
                {pkg.features.map((f, j) => (
                  <div key={j} style={{ fontSize: '13.5px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--ink)' }}>
                    <span style={{ color: pkg.color, fontWeight: 900 }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <Link to="/subscription" style={{
                display: 'block', padding: '12px', textAlign: 'center',
                background: pkg.color,
                color: '#fff',
                borderRadius: '10px', fontWeight: 800, fontSize: '14px', textDecoration: 'none',
                boxShadow: `0 4px 12px ${pkg.color}33`,
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = `0 6px 16px ${pkg.color}55`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = `0 4px 12px ${pkg.color}33`;
              }}>
                Get {pkg.name} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   9. CTA BAND
══════════════════════════════════════════════════════════ */
function CTABand() {
  return (
    <section style={{ padding: '0' }}>
      <div className="wrap-full">
        <div className="cta-band-premium" style={{ borderRadius: '25px', padding: '56px 40px', textAlign: 'center', position: 'relative' }}>
          <div style={{ position: 'relative', zIndex: 5 }}>
            <div className="eyebrow" style={{ color: '#FFC93C', letterSpacing: '2px', fontWeight: 800 }}>START PREPARATION</div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(24px, 3.5vw, 32px)', margin: '14px 0 24px', fontWeight: 850, letterSpacing: '-0.5px' }}>
              Take your first mock test today.
            </h2>
            <Link className="btn btn-premium-glow" to="/subject-test" style={{ padding: '14px 36px', fontSize: '14.5px', borderRadius: '12px', display: 'inline-block' }}>
              Start Free Mock
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   DEFAULT EXPORT — LandingPage (all sections)
══════════════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <div className="landing-page-container">
      {/* Hero */}
      <Dashboard />
      {/* Quick Access */}
      <QuickAccess />
      {/* Exam Section Preview */}
      <ExamSectionPreview />
      {/* Subject Test Preview */}
      <SubjectTestPreview />
      {/* PYQ Ebook Preview */}
      <PYQEbookPreview />
      {/* Material Page Preview */}
      <MaterialPagePreview />
      {/* Subscription Preview */}
      <SubscriptionPreview />
      {/* CTA */}
      <CTABand />
    </div>
  );
}
