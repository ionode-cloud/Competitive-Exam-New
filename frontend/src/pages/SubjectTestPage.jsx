// SubjectTestPage.jsx — Subject-wise tests (2-level: Topics → Tests)
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FaCalculator,
  FaPuzzlePiece,
  FaBookOpen,
  FaGlobe,
  FaLaptopCode,
  FaFont,
  FaFileAlt,
  FaClock,
  FaArrowLeft,
  FaChevronRight
} from 'react-icons/fa';

const subjects = [
  {
    icon: <FaCalculator />, name: 'Mathematics', color: '#B4232F', bg: '#FCEBEA',
    desc: 'Arithmetic, Algebra, Geometry & Data Interpretation',
    topics: [
      { name: 'Simplification', tests: [
        { title: 'Simplification Practice Set 1', qs: 30, mins: 25, diff: 'Easy', free: true },
        { title: 'Simplification Advanced', qs: 25, mins: 20, diff: 'Medium', free: false },
      ]},
      { name: 'Approximations', tests: [
        { title: 'Approximation Test 1', qs: 20, mins: 15, diff: 'Easy', free: true },
      ]},
      { name: 'Number Series', tests: [
        { title: 'Number Series Basic', qs: 20, mins: 20, diff: 'Easy', free: true },
        { title: 'Number Series Advanced', qs: 25, mins: 25, diff: 'Hard', free: false },
      ]},
      { name: 'Average', tests: [{ title: 'Average Practice Set', qs: 25, mins: 20, diff: 'Easy', free: true }] },
      { name: 'Profit and Loss', tests: [{ title: 'Profit & Loss Set 1', qs: 30, mins: 25, diff: 'Medium', free: false }] },
      { name: 'Percentage', tests: [{ title: 'Percentage Full Test', qs: 30, mins: 30, diff: 'Medium', free: true }] },
      { name: 'Data Interpretation', tests: [
        { title: 'DI Practice Set 1', qs: 25, mins: 30, diff: 'Medium', free: true },
        { title: 'DI Advanced Set', qs: 30, mins: 35, diff: 'Hard', free: false },
      ]},
      { name: 'Mixture and Alligation', tests: [{ title: 'Mixture Alligation Test', qs: 20, mins: 20, diff: 'Medium', free: false }] },
      { name: 'Ratio and Proportion', tests: [{ title: 'Ratio & Proportion Set', qs: 25, mins: 20, diff: 'Easy', free: true }] },
      { name: 'Quadratic Equation', tests: [{ title: 'Quadratic Full Test', qs: 20, mins: 20, diff: 'Medium', free: false }] },
      { name: 'Simple interest', tests: [{ title: 'Simple Interest Practice', qs: 20, mins: 15, diff: 'Easy', free: true }] },
      { name: 'Compound interest', tests: [{ title: 'Compound Interest Test', qs: 20, mins: 20, diff: 'Medium', free: false }] },
      { name: 'Problems on ages', tests: [{ title: 'Age Problems Set', qs: 20, mins: 15, diff: 'Easy', free: true }] },
      { name: 'Probability', tests: [{ title: 'Probability Full Test', qs: 20, mins: 20, diff: 'Medium', free: false }] },
      { name: 'Mensuration', tests: [{ title: 'Mensuration Practice', qs: 25, mins: 25, diff: 'Medium', free: false }] },
      { name: 'Time and Work', tests: [{ title: 'Time & Work Advanced', qs: 35, mins: 35, diff: 'Hard', free: false }] },
      { name: 'Time and Distance', tests: [{ title: 'Time Distance Set 1', qs: 30, mins: 25, diff: 'Medium', free: true }] },
      { name: 'Boats and Stream', tests: [{ title: 'Boats & Streams Test', qs: 20, mins: 20, diff: 'Medium', free: true }] },
      { name: 'Problems on Trains', tests: [{ title: 'Trains Problem Set', qs: 20, mins: 15, diff: 'Easy', free: false }] },
      { name: 'Partnership', tests: [{ title: 'Partnership Practice', qs: 15, mins: 15, diff: 'Medium', free: true }] },
      { name: 'Data Sufficiency Quant', tests: [{ title: 'Data Sufficiency Test', qs: 20, mins: 20, diff: 'Hard', free: false }] },
      { name: 'Inequality Quant', tests: [{ title: 'Inequality Test', qs: 20, mins: 15, diff: 'Medium', free: false }] },
    ]
  },
  {
    icon: <FaPuzzlePiece />, name: 'Reasoning', color: '#7C3AED', bg: '#F3ECFE',
    desc: 'Verbal, Non-Verbal, Logical & Analytical Reasoning',
    topics: [
      { name: 'Syllogism', tests: [
        { title: 'Syllogism Practice Set', qs: 20, mins: 20, diff: 'Easy', free: true },
        { title: 'Syllogism Advanced', qs: 25, mins: 25, diff: 'Hard', free: false },
      ]},
      { name: 'Blood Relations', tests: [{ title: 'Blood Relations Test 1', qs: 20, mins: 20, diff: 'Medium', free: true }] },
      { name: 'Direction Sense', tests: [{ title: 'Direction & Distance', qs: 20, mins: 15, diff: 'Easy', free: false }] },
      { name: 'Coding-Decoding', tests: [
        { title: 'Coding Decoding Set 1', qs: 25, mins: 25, diff: 'Medium', free: true },
        { title: 'Coding-Decoding Advanced', qs: 25, mins: 25, diff: 'Hard', free: false },
      ]},
      { name: 'Seating Arrangement', tests: [{ title: 'Seating Arrangement Full', qs: 30, mins: 35, diff: 'Medium', free: true }] },
      { name: 'Puzzles', tests: [{ title: 'Puzzle Practice Set', qs: 25, mins: 30, diff: 'Hard', free: false }] },
      { name: 'Inequalities', tests: [{ title: 'Inequalities Test', qs: 20, mins: 15, diff: 'Easy', free: true }] },
      { name: 'Input-Output', tests: [{ title: 'Input Output Set', qs: 20, mins: 20, diff: 'Medium', free: false }] },
      { name: 'Alphanumeric Series', tests: [{ title: 'Alphanumeric Series Test', qs: 20, mins: 20, diff: 'Medium', free: true }] },
      { name: 'Order & Ranking', tests: [{ title: 'Order Ranking Practice', qs: 15, mins: 15, diff: 'Easy', free: false }] },
      { name: 'Analogy', tests: [{ title: 'Analogy Practice Set', qs: 20, mins: 15, diff: 'Easy', free: true }] },
      { name: 'Classification', tests: [{ title: 'Classification Test', qs: 15, mins: 15, diff: 'Medium', free: false }] },
    ]
  },
  {
    icon: <FaBookOpen />, name: 'English', color: '#1957D6', bg: '#EAF1FD',
    desc: 'Grammar, Comprehension, Vocabulary & Writing',
    topics: [
      { name: 'Spotting Errors', tests: [{ title: 'Spotting Errors Test', qs: 30, mins: 25, diff: 'Easy', free: true }] },
      { name: 'Reading Comprehension', tests: [{ title: 'RC Set 1', qs: 20, mins: 30, diff: 'Medium', free: false }] },
      { name: 'Fill in the Blanks', tests: [{ title: 'Fill Blanks Full Test', qs: 40, mins: 35, diff: 'Medium', free: false }] },
      { name: 'Para Jumbles', tests: [{ title: 'Para Jumbles & Cloze', qs: 25, mins: 25, diff: 'Hard', free: true }] },
      { name: 'Cloze Test', tests: [{ title: 'Cloze Test Practice', qs: 20, mins: 20, diff: 'Medium', free: false }] },
      { name: 'Sentence Improvement', tests: [{ title: 'Sentence Improvement Set', qs: 25, mins: 20, diff: 'Easy', free: true }] },
      { name: 'Idioms & Phrases', tests: [{ title: 'Idioms & Phrases Test', qs: 20, mins: 15, diff: 'Easy', free: true }] },
      { name: 'Vocabulary', tests: [{ title: 'Vocabulary Practice', qs: 30, mins: 25, diff: 'Medium', free: false }] },
      { name: 'Active & Passive Voice', tests: [{ title: 'Voice Change Test', qs: 20, mins: 15, diff: 'Easy', free: true }] },
      { name: 'Tenses', tests: [{ title: 'Tenses Full Test', qs: 30, mins: 25, diff: 'Medium', free: false }] },
    ]
  },
  {
    icon: <FaGlobe />, name: 'General Knowledge', color: '#0F9D58', bg: '#E8F8EE',
    desc: 'Odisha GK, India GK, Static & Current Affairs',
    topics: [
      { name: 'Odisha History & Culture', tests: [{ title: 'Odisha History Full Test', qs: 50, mins: 45, diff: 'Easy', free: true }] },
      { name: 'India Polity', tests: [{ title: 'India Polity & Constitution', qs: 40, mins: 40, diff: 'Medium', free: false }] },
      { name: 'Current Affairs', tests: [{ title: 'Current Affairs July 2026', qs: 30, mins: 30, diff: 'Easy', free: true }] },
      { name: 'Static GK', tests: [{ title: 'Static GK Full Revision', qs: 60, mins: 55, diff: 'Medium', free: false }] },
      { name: 'Indian Geography', tests: [{ title: 'Indian Geography Test', qs: 30, mins: 30, diff: 'Medium', free: true }] },
      { name: 'Science & Technology', tests: [{ title: 'Science Tech Practice', qs: 25, mins: 25, diff: 'Easy', free: false }] },
      { name: 'Odisha GK', tests: [{ title: 'Odisha GK Complete Set', qs: 40, mins: 40, diff: 'Medium', free: true }] },
      { name: 'Economy', tests: [{ title: 'Economy Practice Set', qs: 30, mins: 30, diff: 'Medium', free: false }] },
    ]
  },
  {
    icon: <FaLaptopCode />, name: 'Computer', color: '#0891B2', bg: '#E0F7FA',
    desc: 'MS Office, Internet, Hardware, Software & OS',
    topics: [
      { name: 'MS Office', tests: [{ title: 'MS Office Full Test', qs: 40, mins: 35, diff: 'Easy', free: true }] },
      { name: 'Internet & Networking', tests: [{ title: 'Internet & Networking Test', qs: 30, mins: 25, diff: 'Medium', free: false }] },
      { name: 'Computer Fundamentals', tests: [{ title: 'Computer Fundamentals', qs: 50, mins: 45, diff: 'Easy', free: false }] },
      { name: 'Database & DBMS', tests: [{ title: 'Database & OS Concepts', qs: 35, mins: 30, diff: 'Hard', free: true }] },
      { name: 'Operating System', tests: [{ title: 'OS Full Practice', qs: 30, mins: 25, diff: 'Medium', free: false }] },
      { name: 'Cybersecurity', tests: [{ title: 'Cybersecurity Test', qs: 20, mins: 20, diff: 'Easy', free: true }] },
      { name: 'Computer Hardware', tests: [{ title: 'Hardware Basics Test', qs: 25, mins: 20, diff: 'Easy', free: false }] },
    ]
  },
  {
    icon: <FaFont />, name: 'Odia Language', color: '#EA7A1E', bg: '#FEF1E4',
    desc: 'Vyakaran, Sahitya, Translation & Idioms',
    topics: [
      { name: 'Odia Vyakaran', tests: [{ title: 'Odia Vyakaran Full Test', qs: 40, mins: 40, diff: 'Easy', free: true }] },
      { name: 'Odia Sahitya', tests: [{ title: 'Odia Sahitya & Literature', qs: 30, mins: 35, diff: 'Medium', free: false }] },
      { name: 'Translation', tests: [{ title: 'Translation & Idioms', qs: 25, mins: 25, diff: 'Medium', free: true }] },
      { name: 'Idioms & Proverbs', tests: [{ title: 'Odia Idioms Test', qs: 20, mins: 20, diff: 'Easy', free: false }] },
      { name: 'Odia Grammar Advanced', tests: [{ title: 'Odia Grammar Advanced', qs: 35, mins: 30, diff: 'Hard', free: false }] },
      { name: 'Odia Composition', tests: [{ title: 'Odia Composition Practice', qs: 20, mins: 25, diff: 'Medium', free: true }] },
    ]
  },
];

const diffColors = { Easy: '#0F9D58', Medium: '#EA7A1E', Hard: '#B4232F' };

export default function SubjectTestPage() {
  const [searchParams] = useSearchParams();

  // Derive a primitive number so useEffect compares by value (not object reference)
  const rawSub = parseInt(searchParams.get('sub') ?? '', 10);
  const urlSub = isNaN(rawSub) ? 0 : Math.min(Math.max(rawSub, 0), subjects.length - 1);

  const [activeSubject, setActiveSubject] = useState(urlSub);
  const [activeTopic, setActiveTopic] = useState(null);

  // Re-sync whenever the ?sub= param value changes
  useEffect(() => {
    setActiveSubject(urlSub);
    setActiveTopic(null);
  }, [urlSub]); // primitive number — reliable comparison

  const sub = subjects[activeSubject];
  const topic = activeTopic !== null ? sub.topics[activeTopic] : null;

  const handleSubjectChange = (i) => {
    setActiveSubject(i);
    setActiveTopic(null);
  };

  return (
    <div style={{ minHeight: '80vh', background: 'var(--bg)' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, rgb(15, 23, 42), rgba(234, 122, 30, 0.133))', padding: '22px 0 18px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div className="eyebrow" style={{ color: '#FDE68A' }}>Subject Test</div>
              <h1 style={{ fontFamily: 'var(--disp)', fontSize: 'clamp(20px,2.8vw,30px)', color: '#fff', margin: '6px 0 8px' }}>
                Subject-Wise Practice Tests
              </h1>
              <p style={{ color: '#94A3B8', fontSize: 13.5, maxWidth: '52ch', lineHeight: 1.6, margin: 0 }}>
                Master every topic with focused subject tests — free &amp; premium options for all Odisha exams.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', paddingTop: 6 }}>
              {[{ n: '6', l: 'Subjects' }, { n: '24+', l: 'Practice Tests' }, { n: '12', l: 'Free Tests' }].map((s, i) => (
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

          {/* Sidebar — Subjects */}
          <div className="responsive-sidebar">
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: 1.5, marginBottom: 10 }}>SUBJECTS</div>
            {subjects.map((s, i) => (
              <button key={i} onClick={() => handleSubjectChange(i)} style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                padding: '11px 14px', borderRadius: 10, border: 'none',
                background: activeSubject === i ? s.bg : 'transparent',
                color: activeSubject === i ? s.color : 'var(--text)',
                fontWeight: activeSubject === i ? 800 : 500,
                fontSize: 13.5, cursor: 'pointer', marginBottom: 4,
                textAlign: 'left', transition: 'all .15s',
                borderLeft: activeSubject === i ? `3px solid ${s.color}` : '3px solid transparent',
              }}>
                <span style={{ fontSize: 16, display: 'flex', alignItems: 'center' }}>{s.icon}</span>
                {s.name}
              </button>
            ))}
          </div>

          {/* Main Panel */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Subject Header */}
            <div className="subject-header-responsive" style={{
              background: sub.bg, border: `1.5px solid ${sub.color}33`,
              borderRadius: 14, marginBottom: 16,
            }}>
              <div style={{
                width: 50, height: 50, borderRadius: 12,
                background: '#fff', color: sub.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0
              }}>{sub.icon}</div>
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: '0 0 3px', fontSize: 17, fontWeight: 800, color: sub.color }}>{sub.name}</h2>
                <p style={{ margin: 0, fontSize: 12.5, color: sub.color, opacity: .75 }}>
                  {topic ? `${topic.name}` : sub.desc}
                </p>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: sub.color }}>{topic ? topic.tests.length : sub.topics.length}</div>
                <div style={{ fontSize: 11, color: sub.color, opacity: .7 }}>{topic ? 'Tests' : 'Topics'}</div>
              </div>
            </div>

            {/* Breadcrumb / Back button */}
            {topic && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 13 }}>
                <button onClick={() => setActiveTopic(null)} style={{
                  background: sub.bg, border: `1px solid ${sub.color}44`,
                  borderRadius: 8, cursor: 'pointer',
                  color: sub.color, fontWeight: 700, fontSize: 13, padding: '5px 12px',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <FaArrowLeft fontSize={11} /> Back to Topics
                </button>
                <span style={{ color: 'var(--muted)', fontSize: 12 }}>›</span>
                <span style={{ color: 'var(--muted)', fontWeight: 600, fontSize: 13 }}>{topic.name}</span>
              </div>
            )}

            {/* Topics Grid */}
            {!topic && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(195px, 1fr))', gap: 9 }}>
                {sub.topics.map((t, j) => (
                  <button key={j} onClick={() => setActiveTopic(j)} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '13px 15px', borderRadius: 10,
                    background: 'var(--card)', border: '1px solid var(--line)',
                    cursor: 'pointer', textAlign: 'left', transition: 'all .15s',
                    gap: 8, width: '100%',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = sub.color + '66'; e.currentTarget.style.boxShadow = `0 2px 10px ${sub.color}18`; e.currentTarget.style.background = sub.bg; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.background = 'var(--card)'; }}
                  >
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)', flex: 1, lineHeight: 1.3 }}>{t.name}</span>
                    <span style={{ color: sub.color, fontWeight: 900, fontSize: 14, flexShrink: 0, display: 'flex', alignItems: 'center' }}><FaChevronRight /></span>
                  </button>
                ))}
              </div>
            )}

            {/* Tests List */}
            {topic && (
              <div style={{ display: 'grid', gap: 14 }}>
                {topic.tests.map((test, j) => (
                  <div key={j} className="responsive-test-card" style={{ borderLeft: `4px solid ${sub.color}` }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        {test.free && (
                          <span style={{ fontSize: 10, fontWeight: 800, color: '#0F9D58', background: '#E8F8EE', padding: '2px 8px', borderRadius: 20 }}>FREE</span>
                        )}
                        <span style={{ fontSize: 10, fontWeight: 700, color: diffColors[test.diff], background: diffColors[test.diff] + '18', padding: '2px 8px', borderRadius: 20 }}>{test.diff}</span>
                      </div>
                      <h3 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700 }}>{test.title}</h3>
                      <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--muted)' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><FaFileAlt /> {test.qs} Questions</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><FaClock /> {test.mins} Minutes</span>
                      </div>
                    </div>
                    <a href="#" style={{
                      display: 'inline-block', fontSize: 13, fontWeight: 700,
                      color: '#fff', background: sub.color,
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
