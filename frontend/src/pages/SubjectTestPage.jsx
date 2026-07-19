// SubjectTestPage.jsx — Subject-wise tests
import { useState } from 'react';

const subjects = [
  {
    icon: '🧮', name: 'Mathematics', color: '#B4232F', bg: '#FCEBEA',
    desc: 'Arithmetic, Algebra, Geometry & Data Interpretation',
    tests: [
      { title: 'Number System Full Test', qs: 30, mins: 30, diff: 'Easy', free: true },
      { title: 'Percentage & Profit-Loss', qs: 40, mins: 40, diff: 'Medium', free: false },
      { title: 'Time & Work Advanced', qs: 35, mins: 35, diff: 'Hard', free: false },
      { title: 'Data Interpretation Set', qs: 25, mins: 30, diff: 'Medium', free: true },
    ]
  },
  {
    icon: '🧩', name: 'Reasoning', color: '#7C3AED', bg: '#F3ECFE',
    desc: 'Verbal, Non-Verbal, Logical & Analytical Reasoning',
    tests: [
      { title: 'Syllogism Practice Set', qs: 20, mins: 20, diff: 'Easy', free: true },
      { title: 'Blood Relations & Direction', qs: 30, mins: 30, diff: 'Medium', free: false },
      { title: 'Coding-Decoding Advanced', qs: 25, mins: 25, diff: 'Hard', free: false },
      { title: 'Seating Arrangement Full', qs: 30, mins: 35, diff: 'Medium', free: true },
    ]
  },
  {
    icon: '📖', name: 'English', color: '#1957D6', bg: '#EAF1FD',
    desc: 'Grammar, Comprehension, Vocabulary & Writing',
    tests: [
      { title: 'Spotting Errors Test', qs: 30, mins: 25, diff: 'Easy', free: true },
      { title: 'Reading Comprehension Set', qs: 20, mins: 30, diff: 'Medium', free: false },
      { title: 'Fill in the Blanks', qs: 40, mins: 35, diff: 'Medium', free: false },
      { title: 'Para Jumbles & Cloze', qs: 25, mins: 25, diff: 'Hard', free: true },
    ]
  },
  {
    icon: '🌍', name: 'General Knowledge', color: '#0F9D58', bg: '#E8F8EE',
    desc: 'Odisha GK, India GK, Static & Current Affairs',
    tests: [
      { title: 'Odisha History & Culture', qs: 50, mins: 45, diff: 'Easy', free: true },
      { title: 'India Polity & Constitution', qs: 40, mins: 40, diff: 'Medium', free: false },
      { title: 'Current Affairs July 2026', qs: 30, mins: 30, diff: 'Easy', free: true },
      { title: 'Static GK Full Revision', qs: 60, mins: 55, diff: 'Medium', free: false },
    ]
  },
  {
    icon: '💻', name: 'Computer', color: '#0891B2', bg: '#E0F7FA',
    desc: 'MS Office, Internet, Hardware, Software & OS',
    tests: [
      { title: 'MS Office Full Test', qs: 40, mins: 35, diff: 'Easy', free: true },
      { title: 'Internet & Networking', qs: 30, mins: 25, diff: 'Medium', free: false },
      { title: 'Computer Fundamentals', qs: 50, mins: 45, diff: 'Easy', free: false },
      { title: 'Database & OS Concepts', qs: 35, mins: 30, diff: 'Hard', free: true },
    ]
  },
  {
    icon: '🔤', name: 'Odia Language', color: '#EA7A1E', bg: '#FEF1E4',
    desc: 'Vyakaran, Sahitya, Translation & Idioms',
    tests: [
      { title: 'Odia Vyakaran Full Test', qs: 40, mins: 40, diff: 'Easy', free: true },
      { title: 'Odia Sahitya & Literature', qs: 30, mins: 35, diff: 'Medium', free: false },
      { title: 'Translation & Idioms', qs: 25, mins: 25, diff: 'Medium', free: true },
      { title: 'Odia Grammar Advanced', qs: 35, mins: 30, diff: 'Hard', free: false },
    ]
  },
];

const diffColors = { Easy: '#0F9D58', Medium: '#EA7A1E', Hard: '#B4232F' };

export default function SubjectTestPage() {
  const [activeSubject, setActiveSubject] = useState(0);
  const sub = subjects[activeSubject];

  return (
    <div style={{ minHeight: '80vh', background: 'var(--bg)' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, rgb(15, 23, 42), rgba(234, 122, 30, 0.133))', padding: '44px 0 36px' }}>
        <div className="wrap">
          <div className="eyebrow" style={{ color: '#FDE68A' }}>Subject Test</div>
          <h1 style={{ fontFamily: 'var(--disp)', fontSize: 'clamp(24px,3.5vw,36px)', color: '#fff', margin: '8px 0 10px' }}>
            Subject-Wise Practice Tests
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 14, maxWidth: '52ch', lineHeight: 1.7 }}>
            Master every topic with focused subject tests — free & premium options for all Odisha exams.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 18, flexWrap: 'wrap' }}>
            {[{ n: '6', l: 'Subjects' }, { n: '24+', l: 'Practice Tests' }, { n: '12', l: 'Free Tests' }].map((s, i) => (
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

          {/* Sidebar — Subjects */}
          <div className="responsive-sidebar">
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: 1.5, marginBottom: 10 }}>SUBJECTS</div>
            {subjects.map((s, i) => (
              <button key={i} onClick={() => setActiveSubject(i)} style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                padding: '11px 14px', borderRadius: 10, border: 'none',
                background: activeSubject === i ? s.bg : 'transparent',
                color: activeSubject === i ? s.color : 'var(--text)',
                fontWeight: activeSubject === i ? 800 : 500,
                fontSize: 13.5, cursor: 'pointer', marginBottom: 4,
                textAlign: 'left', transition: 'all .15s',
                borderLeft: activeSubject === i ? `3px solid ${s.color}` : '3px solid transparent',
              }}>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                {s.name}
              </button>
            ))}
          </div>

          {/* Tests Panel */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Subject Header */}
            <div className="subject-header-responsive" style={{
              background: sub.bg, border: `1.5px solid ${sub.color}33`,
              borderRadius: 14, marginBottom: 20,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: '#fff', color: sub.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0
              }}>{sub.icon}</div>
              <div>
                <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800, color: sub.color }}>{sub.name}</h2>
                <p style={{ margin: 0, fontSize: 13, color: sub.color, opacity: .75 }}>{sub.desc}</p>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: sub.color }}>{sub.tests.length}</div>
                <div style={{ fontSize: 11, color: sub.color, opacity: .7 }}>Tests Available</div>
              </div>
            </div>

            {/* Test Cards */}
            <div style={{ display: 'grid', gap: 14 }}>
              {sub.tests.map((test, j) => (
                <div key={j} className="responsive-test-card" style={{
                  borderLeft: `4px solid ${sub.color}`,
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
                      <span>📝 {test.qs} Questions</span>
                      <span>⏱ {test.mins} Minutes</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
