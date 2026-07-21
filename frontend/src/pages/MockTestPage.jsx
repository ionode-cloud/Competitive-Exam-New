// MockTestPage.jsx — Full-Length Mock Tests (2-level: Category → Exams Grid → Tests)
import { useState } from 'react';
import {
  FaLandmark,
  FaTrain,
  FaUniversity,
  FaShieldAlt,
  FaClipboardList,
  FaClock,
  FaArrowLeft,
  FaChevronRight
} from 'react-icons/fa';

const mockTestCategories = [
  {
    category: 'State PSC / SSSC (Odisha)',
    icon: <FaLandmark />,
    color: '#7C3AED',
    bg: '#F3ECFE',
    topics: [
      { name: 'OPSC OAS', tests: [
        { title: 'OPSC OAS Prelims Paper-I (GS)', qs: 100, mins: 120, diff: 'Medium', free: false },
        { title: 'OPSC OAS GS Paper-II', qs: 100, mins: 120, diff: 'Hard', free: false },
      ]},
      { name: 'OSSSC RI', tests: [
        { title: 'OSSSC RI Full Length Mock Test 1', qs: 100, mins: 120, diff: 'Medium', free: true },
        { title: 'OSSSC RI Full Length Mock Test 2', qs: 100, mins: 120, diff: 'Hard', free: false },
      ]},
      { name: 'OSSC CGL', tests: [
        { title: 'OSSC CGL Prelims Full Test 1', qs: 150, mins: 150, diff: 'Medium', free: true },
        { title: 'OSSC CGL Prelims Full Test 2', qs: 150, mins: 150, diff: 'Hard', free: false },
      ]},
      { name: 'OSSSC ARI & Amin', tests: [
        { title: 'OSSSC ARI & Amin Model Paper 2026', qs: 100, mins: 120, diff: 'Easy', free: true },
      ]},
      { name: 'OSSSC JE', tests: [
        { title: 'OSSSC JE Mock Test 1', qs: 100, mins: 120, diff: 'Medium', free: false },
      ]},
      { name: 'OPSC ASO', tests: [
        { title: 'OPSC ASO Full Mock', qs: 100, mins: 120, diff: 'Hard', free: false },
      ]},
    ]
  },
  {
    category: 'SSC & Railway',
    icon: <FaTrain />,
    color: '#0F9D58',
    bg: '#E8F8EE',
    topics: [
      { name: 'SSC CGL', tests: [
        { title: 'SSC CGL Tier-1 Complete Mock Test', qs: 100, mins: 60, diff: 'Medium', free: true },
        { title: 'SSC CGL Tier-1 Mock Test 2', qs: 100, mins: 60, diff: 'Hard', free: false },
      ]},
      { name: 'SSC CHSL', tests: [
        { title: 'SSC CHSL 10+2 Mock Exam', qs: 100, mins: 60, diff: 'Easy', free: false },
      ]},
      { name: 'RRB NTPC', tests: [
        { title: 'RRB NTPC CBT-1 Sectional Mock', qs: 120, mins: 90, diff: 'Medium', free: true },
      ]},
      { name: 'SSC MTS', tests: [
        { title: 'SSC MTS Full Revision Paper', qs: 90, mins: 90, diff: 'Easy', free: false },
      ]},
      { name: 'SSC GD Constable', tests: [
        { title: 'SSC GD Constable Mock 1', qs: 80, mins: 60, diff: 'Easy', free: true },
      ]},
      { name: 'RRB Group D', tests: [
        { title: 'RRB Group D Mock Test', qs: 100, mins: 90, diff: 'Medium', free: false },
      ]},
    ]
  },
  {
    category: 'Bank & Insurance',
    icon: <FaUniversity />,
    color: '#1957D6',
    bg: '#EAF1FD',
    topics: [
      { name: 'IBPS PO', tests: [
        { title: 'IBPS PO Prelims Mock Series 1', qs: 100, mins: 60, diff: 'Hard', free: true },
        { title: 'IBPS PO Mains Mock Test', qs: 155, mins: 180, diff: 'Hard', free: false },
      ]},
      { name: 'SBI Clerk', tests: [
        { title: 'SBI Clerk Prelims Complete Paper', qs: 100, mins: 60, diff: 'Medium', free: false },
      ]},
      { name: 'RBI Grade B', tests: [
        { title: 'RBI Grade B Phase-1 practice', qs: 200, mins: 120, diff: 'Hard', free: false },
      ]},
      { name: 'LIC AAO', tests: [
        { title: 'LIC AAO Generalist Mock Test', qs: 100, mins: 60, diff: 'Medium', free: true },
      ]},
      { name: 'IBPS Clerk', tests: [
        { title: 'IBPS Clerk Prelims Mock', qs: 100, mins: 60, diff: 'Easy', free: true },
      ]},
      { name: 'SBI PO', tests: [
        { title: 'SBI PO Prelims Full Mock', qs: 100, mins: 60, diff: 'Hard', free: false },
      ]},
    ]
  },
  {
    category: 'Police & Defence',
    icon: <FaShieldAlt />,
    color: '#B4232F',
    bg: '#FCEBEA',
    topics: [
      { name: 'Odisha Police SI', tests: [
        { title: 'Odisha Police SI GS + Language', qs: 100, mins: 120, diff: 'Medium', free: true },
      ]},
      { name: 'Odisha Police Constable', tests: [
        { title: 'Odisha Police Constable Test 1', qs: 100, mins: 120, diff: 'Easy', free: false },
      ]},
      { name: 'NDA', tests: [
        { title: 'NDA Mathematics Full Mock', qs: 120, mins: 150, diff: 'Hard', free: false },
      ]},
      { name: 'CDS', tests: [
        { title: 'CDS GK & English Mock', qs: 100, mins: 120, diff: 'Medium', free: true },
      ]},
      { name: 'CAPF', tests: [
        { title: 'CAPF Paper 1 Mock Test', qs: 125, mins: 150, diff: 'Hard', free: false },
      ]},
    ]
  },
];

const diffColors = { Easy: '#0F9D58', Medium: '#EA7A1E', Hard: '#B4232F' };

export default function MockTestPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeTopic, setActiveTopic] = useState(null);
  const cat = mockTestCategories[activeCategory];
  const topic = activeTopic !== null ? cat.topics[activeTopic] : null;

  const handleCategoryChange = (i) => {
    setActiveCategory(i);
    setActiveTopic(null);
  };

  return (
    <div style={{ minHeight: '80vh', background: 'var(--bg)' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, rgb(15, 23, 42), rgba(234, 122, 30, 0.133))', padding: '22px 0 18px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div className="eyebrow" style={{ color: '#FDE68A' }}>Full Mock Test</div>
              <h1 style={{ fontFamily: 'var(--disp)', fontSize: 'clamp(20px,2.8vw,30px)', color: '#fff', margin: '6px 0 8px' }}>
                Full-Length Mock Exams
              </h1>
              <p style={{ color: '#94A3B8', fontSize: 13.5, maxWidth: '52ch', lineHeight: 1.6, margin: 0 }}>
                Simulate real exam scenarios with full length mock papers tailored to the latest templates and syllabus.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', paddingTop: 6 }}>
              {[{ n: '4', l: 'Categories' }, { n: '15+', l: 'Mock Exams' }, { n: '6', l: 'Free Mocks' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 16px', minWidth: 72 }}>
                  <div style={{ fontFamily: 'var(--disp)', fontSize: 20, fontWeight: 900, color: '#FFC93C', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 10.5, color: '#CBD5E1', marginTop: 4, letterSpacing: 0.4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 36, paddingBottom: 48 }}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Sidebar — Categories */}
          <div className="responsive-sidebar">
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: 1.5, marginBottom: 10 }}>CATEGORIES</div>
            {mockTestCategories.map((c, i) => (
              <button key={i} onClick={() => handleCategoryChange(i)} style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                padding: '11px 14px', borderRadius: 10, border: 'none',
                background: activeCategory === i ? c.bg : 'transparent',
                color: activeCategory === i ? c.color : 'var(--text)',
                fontWeight: activeCategory === i ? 800 : 500,
                fontSize: 13.5, cursor: 'pointer', marginBottom: 4,
                textAlign: 'left', transition: 'all .15s',
                borderLeft: activeCategory === i ? `3px solid ${c.color}` : '3px solid transparent',
              }}>
                <span style={{ fontSize: 16, display: 'flex', alignItems: 'center' }}>{c.icon}</span>
                {c.category}
              </button>
            ))}
          </div>

          {/* Main Panel */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Category Header */}
            <div className="subject-header-responsive" style={{
              background: cat.bg, border: `1.5px solid ${cat.color}33`,
              borderRadius: 14, marginBottom: 16,
            }}>
              <div style={{
                width: 50, height: 50, borderRadius: 12,
                background: '#fff', color: cat.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0
              }}>{cat.icon}</div>
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: '0 0 3px', fontSize: 17, fontWeight: 800, color: cat.color }}>{cat.category}</h2>
                <p style={{ margin: 0, fontSize: 12.5, color: cat.color, opacity: .75 }}>
                  {topic ? topic.name : 'Full Syllabus Mock Tests'}
                </p>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: cat.color }}>{topic ? topic.tests.length : cat.topics.length}</div>
                <div style={{ fontSize: 11, color: cat.color, opacity: .7 }}>{topic ? 'Tests' : 'Exams'}</div>
              </div>
            </div>

            {/* Back button */}
            {topic && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 13 }}>
                <button onClick={() => setActiveTopic(null)} style={{
                  background: cat.bg, border: `1px solid ${cat.color}44`,
                  borderRadius: 8, cursor: 'pointer',
                  color: cat.color, fontWeight: 700, fontSize: 13, padding: '5px 12px',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <FaArrowLeft fontSize={11} /> Back to Exams
                </button>
                <span style={{ color: 'var(--muted)', fontSize: 12 }}>›</span>
                <span style={{ color: 'var(--muted)', fontWeight: 600, fontSize: 13 }}>{topic.name}</span>
              </div>
            )}

            {/* Exams Grid */}
            {!topic && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(195px, 1fr))', gap: 9 }}>
                {cat.topics.map((t, j) => (
                  <button key={j} onClick={() => setActiveTopic(j)} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '13px 15px', borderRadius: 10,
                    background: 'var(--card)', border: '1px solid var(--line)',
                    cursor: 'pointer', textAlign: 'left', transition: 'all .15s',
                    gap: 8, width: '100%',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color + '66'; e.currentTarget.style.boxShadow = `0 2px 10px ${cat.color}18`; e.currentTarget.style.background = cat.bg; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.background = 'var(--card)'; }}
                  >
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)', flex: 1, lineHeight: 1.3 }}>{t.name}</span>
                    <span style={{ color: cat.color, fontWeight: 900, fontSize: 14, flexShrink: 0, display: 'flex', alignItems: 'center' }}><FaChevronRight /></span>
                  </button>
                ))}
              </div>
            )}

            {/* Tests List */}
            {topic && (
              <div style={{ display: 'grid', gap: 14 }}>
                {topic.tests.map((test, j) => (
                  <div key={j} className="responsive-test-card" style={{ borderLeft: `4px solid ${cat.color}` }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        {test.free && (
                          <span style={{ fontSize: 10, fontWeight: 800, color: '#0F9D58', background: '#E8F8EE', padding: '2px 8px', borderRadius: 20 }}>FREE</span>
                        )}
                        <span style={{ fontSize: 10, fontWeight: 700, color: diffColors[test.diff], background: diffColors[test.diff] + '18', padding: '2px 8px', borderRadius: 20 }}>{test.diff}</span>
                      </div>
                      <h3 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700 }}>{test.title}</h3>
                      <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--muted)' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><FaClipboardList /> {test.qs} Questions</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><FaClock /> {test.mins} Minutes</span>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
