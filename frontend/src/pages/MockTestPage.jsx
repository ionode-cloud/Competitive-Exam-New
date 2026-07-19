// MockTestPage.jsx — Full-Length Mock Tests
import { useState } from 'react';

const mockTestCategories = [
  {
    category: 'State PSC / SSSC (Odisha)',
    icon: '🏛️',
    color: '#7C3AED',
    bg: '#F3ECFE',
    tests: [
      { title: 'OSSSC RI Full Length Mock Test 1', qs: 100, mins: 120, diff: 'Medium', free: true },
      { title: 'OSSSC ARI & Amin Model Paper 2026', qs: 100, mins: 120, diff: 'Easy', free: true },
      { title: 'OSSC CGL Prelims Full Test 2', qs: 150, mins: 150, diff: 'Hard', free: false },
      { title: 'OPSC OAS Prelims Paper-I (GS)', qs: 100, mins: 120, diff: 'Medium', free: false },
    ]
  },
  {
    category: 'SSC & Railway',
    icon: '🚆',
    color: '#0F9D58',
    bg: '#E8F8EE',
    tests: [
      { title: 'SSC CGL Tier-1 Complete Mock Test', qs: 100, mins: 60, diff: 'Medium', free: true },
      { title: 'SSC CHSL 10+2 Mock Exam', qs: 100, mins: 60, diff: 'Easy', free: false },
      { title: 'RRB NTPC CBT-1 Sectional Mock', qs: 120, mins: 90, diff: 'Medium', free: true },
      { title: 'SSC MTS Full Revision Paper', qs: 90, mins: 90, diff: 'Easy', free: false },
    ]
  },
  {
    category: 'Bank & Insurance',
    icon: '🏦',
    color: '#1957D6',
    bg: '#EAF1FD',
    tests: [
      { title: 'IBPS PO Prelims Mock Series 1', qs: 100, mins: 60, diff: 'Hard', free: true },
      { title: 'SBI Clerk Prelims Complete Paper', qs: 100, mins: 60, diff: 'Medium', free: false },
      { title: 'RBI Grade B Phase-1 practice', qs: 200, mins: 120, diff: 'Hard', free: false },
      { title: 'LIC AAO Generalist Mock Test', qs: 100, mins: 60, diff: 'Medium', free: true },
    ]
  },
  {
    category: 'Police & Defence',
    icon: '🚔',
    color: '#B4232F',
    bg: '#FCEBEA',
    tests: [
      { title: 'Odisha Police SI GS + Language', qs: 100, mins: 120, diff: 'Medium', free: true },
      { title: 'Odisha Police Constable Test 1', qs: 100, mins: 120, diff: 'Easy', free: false },
      { title: 'NDA Mathematics Full Mock', qs: 120, mins: 150, diff: 'Hard', free: false },
    ]
  },
];

const diffColors = { Easy: '#0F9D58', Medium: '#EA7A1E', Hard: '#B4232F' };

export default function MockTestPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const cat = mockTestCategories[activeCategory];

  return (
    <div style={{ minHeight: '80vh', background: 'var(--bg)' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, rgb(15, 23, 42), rgba(234, 122, 30, 0.133))', padding: '44px 0 36px' }}>
        <div className="wrap">
          <div className="eyebrow" style={{ color: '#FDE68A' }}>Full Mock Test</div>
          <h1 style={{ fontFamily: 'var(--disp)', fontSize: 'clamp(24px,3.5vw,36px)', color: '#fff', margin: '8px 0 10px' }}>
            Full-Length Mock Exams
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 14, maxWidth: '52ch', lineHeight: 1.7 }}>
            Simulate real exam scenarios with full length mock papers tailored to the latest templates and syllabus.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 18, flexWrap: 'wrap' }}>
            {[{ n: '4', l: 'Categories' }, { n: '15+', l: 'Mock Exams' }, { n: '6', l: 'Free Mocks' }].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 10, padding: '10px 18px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--disp)', fontSize: 20, fontWeight: 800, color: '#FFC93C' }}>{s.n}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 36, paddingBottom: 48 }}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Sidebar — Categories */}
          <div className="responsive-sidebar">
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: 1.5, marginBottom: 10 }}>CATEGORIES</div>
            {mockTestCategories.map((c, i) => (
              <button key={i} onClick={() => setActiveCategory(i)} style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                padding: '11px 14px', borderRadius: 10, border: 'none',
                background: activeCategory === i ? c.bg : 'transparent',
                color: activeCategory === i ? c.color : 'var(--text)',
                fontWeight: activeCategory === i ? 800 : 500,
                fontSize: 13.5, cursor: 'pointer', marginBottom: 4,
                textAlign: 'left', transition: 'all .15s',
                borderLeft: activeCategory === i ? `3px solid ${c.color}` : '3px solid transparent',
              }}>
                <span style={{ fontSize: 18 }}>{c.icon}</span>
                {c.category}
              </button>
            ))}
          </div>

          {/* Tests Panel */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Category Header */}
            <div className="subject-header-responsive" style={{
              background: cat.bg, border: `1.5px solid ${cat.color}33`,
              borderRadius: 14, marginBottom: 20,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: '#fff', color: cat.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0
              }}>{cat.icon}</div>
              <div>
                <h2 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 800, color: cat.color }}>{cat.category}</h2>
                <p style={{ margin: 0, fontSize: 13, color: cat.color, opacity: .75 }}>Full Syllabus Mock Tests</p>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: cat.color }}>{cat.tests.length}</div>
                <div style={{ fontSize: 11, color: cat.color, opacity: .7 }}>Mocks Available</div>
              </div>
            </div>

            {/* Test Cards */}
            <div style={{ display: 'grid', gap: 14 }}>
              {cat.tests.map((test, j) => (
                <div key={j} className="responsive-test-card" style={{
                  borderLeft: `4px solid ${cat.color}`,
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      {test.free && (
                        <span style={{
                          fontSize: 10, fontWeight: 800, color: '#0F9D58',
                          background: '#E8F8EE', padding: '2px 8px', borderRadius: 20
                        }}>FREE</span>
                      )}
                      <span style={{
                        fontSize: 10, fontWeight: 700,
                        color: diffColors[test.diff],
                        background: diffColors[test.diff] + '18',
                        padding: '2px 8px', borderRadius: 20
                      }}>{test.diff}</span>
                    </div>
                    <h3 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700 }}>{test.title}</h3>
                    <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--muted)' }}>
                      <span>📋 {test.qs} Questions</span>
                      <span>⏱ {test.mins} Minutes</span>
                    </div>
                  </div>
                  <a href="#" style={{
                    display: 'inline-block', fontSize: 13, fontWeight: 700,
                    color: '#fff', background: cat.color,
                    padding: '9px 20px', borderRadius: 9,
                    whiteSpace: 'nowrap', flexShrink: 0
                  }}>
                    {test.free ? 'Start Free →' : 'Attempt →'}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
