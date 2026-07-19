// ExamSectionPage.jsx — Browse all exam categories
import { useState } from 'react';

const examCategories = [
  {
    icon: '🏦', label: 'Bank & Insurance', color: '#1957D6', bg: '#EAF1FD',
    exams: [
      { name: 'IBPS PO', sub: 'Probationary Officer', tag: '🔥 Hot' },
      { name: 'SBI Clerk', sub: 'Junior Associate', tag: '⭐ Popular' },
      { name: 'RBI Grade B', sub: 'Officer Grade B', tag: '🆕 New' },
      { name: 'LIC AAO', sub: 'Assistant Admin Officer', tag: '⚡ Demand' },
    ]
  },
  {
    icon: '🚆', label: 'SSC & Railway', color: '#0F9D58', bg: '#E8F8EE',
    exams: [
      { name: 'SSC CGL', sub: 'Combined Graduate Level', tag: '🔥 Hot' },
      { name: 'SSC CHSL', sub: 'Combined Higher Secondary', tag: '⭐ Popular' },
      { name: 'RRB NTPC', sub: 'Non-Technical Popular Categories', tag: '⚡ Demand' },
      { name: 'RRB Group D', sub: 'Group D Posts', tag: '🆕 New' },
    ]
  },
  {
    icon: '🏛️', label: 'State PSC / SSSC', color: '#7C3AED', bg: '#F3ECFE',
    exams: [
      { name: 'OPSC OAS', sub: 'Odisha Administrative Service', tag: '🔥 Hot' },
      { name: 'OSSSC RI', sub: 'Revenue Inspector', tag: '⭐ Popular' },
      { name: 'OSSC CGL', sub: 'Combined Graduate Level', tag: '⚡ Demand' },
      { name: 'OSSSC ARI', sub: 'Assistant Revenue Inspector', tag: '🆕 New' },
    ]
  },
  {
    icon: '🚔', label: 'Police & Defence', color: '#B4232F', bg: '#FCEBEA',
    exams: [
      { name: 'Odisha Police SI', sub: 'Sub-Inspector', tag: '🔥 Hot' },
      { name: 'Odisha Police Constable', sub: 'Constable Posts', tag: '⚡ Demand' },
      { name: 'NDA', sub: 'National Defence Academy', tag: '⭐ Popular' },
      { name: 'CDS', sub: 'Combined Defence Services', tag: '🆕 New' },
    ]
  },
  {
    icon: '📚', label: 'Teaching', color: '#EA7A1E', bg: '#FEF1E4',
    exams: [
      { name: 'OTET', sub: 'Odisha Teacher Eligibility Test', tag: '🔥 Hot' },
      { name: 'CTET', sub: 'Central Teacher Eligibility Test', tag: '⭐ Popular' },
      { name: 'KVS PGT', sub: 'Post Graduate Teacher', tag: '⚡ Demand' },
      { name: 'DSSSB TGT', sub: 'Trained Graduate Teacher', tag: '🆕 New' },
    ]
  },
  {
    icon: '⚖️', label: 'Regulatory Bodies', color: '#0891B2', bg: '#E0F7FA',
    exams: [
      { name: 'SEBI Grade A', sub: 'Securities & Exchange Board', tag: '🔥 Hot' },
      { name: 'NABARD Grade A', sub: 'National Bank for Agriculture', tag: '⭐ Popular' },
      { name: 'IRDAI', sub: 'Insurance Regulatory Development', tag: '⚡ Demand' },
      { name: 'SIDBI', sub: 'Small Industries Dev Bank', tag: '🆕 New' },
    ]
  },
];

const tagColors = {
  '🔥 Hot': '#B4232F',
  '⭐ Popular': '#1957D6',
  '🆕 New': '#0F9D58',
  '⚡ Demand': '#EA7A1E',
};

export default function ExamSectionPage() {
  const [active, setActive] = useState(0);
  const cat = examCategories[active];

  return (
    <div style={{ minHeight: '80vh', background: 'var(--bg)' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, rgb(15, 23, 42), rgba(234, 122, 30, 0.133))', padding: '44px 0 36px' }}>
        <div className="wrap">
          <div className="eyebrow" style={{ color: '#FDE68A' }}>Exam Section</div>
          <h1 style={{ fontFamily: 'var(--disp)', fontSize: 'clamp(24px,3.5vw,36px)', color: '#fff', margin: '8px 0 10px' }}>
            Browse All Competitive Exams
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 14, maxWidth: '52ch', lineHeight: 1.7 }}>
            Find your target exam category and get structured preparation resources — tests, PDFs & live classes.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 18, flexWrap: 'wrap' }}>
            {[{ n: '50+', l: 'Exams Covered' }, { n: '6', l: 'Categories' }, { n: '10K+', l: 'Students' }].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 10, padding: '10px 18px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--disp)', fontSize: 20, fontWeight: 800, color: '#FFC93C' }}>{s.n}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 36, paddingBottom: 48 }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
          {examCategories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '9px 18px', borderRadius: 30, border: '2px solid',
                borderColor: active === i ? examCategories[i].color : 'var(--line)',
                background: active === i ? examCategories[i].bg : 'var(--card)',
                color: active === i ? examCategories[i].color : 'var(--text)',
                fontWeight: 700, fontSize: 13, cursor: 'pointer',
                transition: 'all .18s',
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Active Category */}
        <div style={{
          background: 'var(--card)', border: `2px solid ${cat.color}33`,
          borderRadius: 16, padding: 28, marginBottom: 32,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: cat.bg, color: cat.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26
            }}>{cat.icon}</div>
            <div>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{cat.label}</h2>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{cat.exams.length} exams available</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {cat.exams.map((exam, j) => (
              <div key={j} style={{
                background: 'var(--bg)', border: '1px solid var(--line)',
                borderRadius: 12, padding: '18px 20px',
                transition: 'all .18s', cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--sh-2)'; e.currentTarget.style.borderColor = cat.color + '55'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'var(--line)'; }}
              >
                <span style={{
                  fontSize: 10, fontWeight: 700, color: tagColors[exam.tag],
                  background: tagColors[exam.tag] + '18',
                  padding: '2px 8px', borderRadius: 20, display: 'inline-block', marginBottom: 8
                }}>{exam.tag}</span>
                <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 800, color: cat.color }}>{exam.name}</h3>
                <p style={{ margin: '0 0 14px', fontSize: 12.5, color: 'var(--muted)' }}>{exam.sub}</p>
                <a href="#" style={{
                  display: 'inline-block', fontSize: 12, fontWeight: 700,
                  color: '#fff', background: cat.color,
                  padding: '6px 14px', borderRadius: 8
                }}>Explore Exam →</a>
              </div>
            ))}
          </div>
        </div>

        {/* All Categories Grid */}
        <div style={{ marginTop: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>All Exam Categories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {examCategories.map((cat, i) => (
              <div key={i}
                onClick={() => setActive(i)}
                style={{
                  background: cat.bg, border: `1.5px solid ${cat.color}33`,
                  borderRadius: 14, padding: '20px 22px',
                  cursor: 'pointer', transition: 'all .18s',
                  display: 'flex', alignItems: 'center', gap: 14,
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: '#fff', color: cat.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0
                }}>{cat.icon}</div>
                <div>
                  <div style={{ fontWeight: 800, color: cat.color, fontSize: 15 }}>{cat.label}</div>
                  <div style={{ fontSize: 12, color: cat.color, opacity: .7 }}>{cat.exams.length} exams</div>
                </div>
                <span style={{ marginLeft: 'auto', color: cat.color, fontWeight: 800 }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
