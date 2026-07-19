// pages/MaterialsPage.jsx
import { useState } from 'react';

const categories = ['All', 'Current Affairs', 'Odisha GK', 'Static GK', 'English', 'Computer', 'Mathematics', 'Reasoning'];

const materials = [
  { title: 'Daily Current Affairs PDF — July 2026',       cat: 'Current Affairs', icon: '📰', color: '#B4232F', bg: '#FCEBEA', size: '2.4 MB', date: 'Today',      tag: '🆕 New',       free: true  },
  { title: 'Monthly Current Affairs — June 2026',         cat: 'Current Affairs', icon: '📰', color: '#B4232F', bg: '#FCEBEA', size: '8.1 MB', date: '1 Jul 2026',  tag: '',             free: true  },
  { title: 'Odisha GK Complete Capsule 2026',             cat: 'Odisha GK',       icon: '🏛️', color: '#7C3AED', bg: '#F3ECFE', size: '5.6 MB', date: 'Updated',     tag: '🔥 Popular',   free: false },
  { title: 'Odisha Govt Schemes & Policies 2026',         cat: 'Odisha GK',       icon: '📋', color: '#7C3AED', bg: '#F3ECFE', size: '3.2 MB', date: 'Jun 2026',    tag: '⚡ Demanded',  free: true  },
  { title: 'Static GK Capsule — Awards & Honours',        cat: 'Static GK',       icon: '🌍', color: '#1957D6', bg: '#EAF1FD', size: '4.1 MB', date: 'Jun 2026',    tag: '',             free: true  },
  { title: 'Static GK — Books, Authors & Organizations',  cat: 'Static GK',       icon: '📚', color: '#1957D6', bg: '#EAF1FD', size: '3.8 MB', date: 'May 2026',    tag: '',             free: true  },
  { title: 'English Prepositions — Rules & 500 Examples', cat: 'English',         icon: '📝', color: '#0F9D58', bg: '#E8F8EE', size: '2.1 MB', date: 'Jun 2026',    tag: '🆕 New',       free: true  },
  { title: 'English Grammar Complete Notes',              cat: 'English',         icon: '📖', color: '#0F9D58', bg: '#E8F8EE', size: '4.9 MB', date: 'May 2026',    tag: '⭐ Top Rated', free: false },
  { title: 'Computer Fundamentals — Odia Medium PDF',    cat: 'Computer',         icon: '💻', color: '#0891B2', bg: '#E0F7FA', size: '3.5 MB', date: 'Jul 2026',    tag: '🔥 Hot',       free: false },
  { title: 'MS Office & Internet — Practice Questions',  cat: 'Computer',         icon: '💾', color: '#0891B2', bg: '#E0F7FA', size: '2.8 MB', date: 'Jun 2026',    tag: '',             free: true  },
  { title: 'Maths Shortcut Tricks for OSSSC',            cat: 'Mathematics',      icon: '🧮', color: '#EA7A1E', bg: '#FEF1E4', size: '3.1 MB', date: 'May 2026',    tag: '⚡ Popular',   free: false },
  { title: 'Reasoning Non-Verbal Tricks PDF',            cat: 'Reasoning',        icon: '🧩', color: '#C2740A', bg: '#FEF3E2', size: '2.7 MB', date: 'Jun 2026',    tag: '',             free: true  },
];

export default function MaterialsPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? materials : materials.filter(m => m.cat === active);

  return (
    <div style={{ minHeight: '80vh', background: 'var(--bg)' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, rgb(15, 23, 42), rgba(234, 122, 30, 0.133))', padding: '44px 0 36px' }}>
        <div className="wrap">
          <div className="eyebrow" style={{ color: '#FDE68A' }}>Study Materials</div>
          <h1 style={{ fontFamily: 'var(--disp)', fontSize: 'clamp(24px,3.5vw,36px)', color: '#fff', margin: '8px 0 10px' }}>
            Free &amp; Premium Study Materials
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 14, maxWidth: '52ch', lineHeight: 1.7 }}>
            Download Current Affairs, Odisha GK, Static GK, English, Computer &amp; more PDFs — curated for Odisha state exams.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 18, flexWrap: 'wrap' }}>
            {[{ n: '200+', l: 'Free PDFs' }, { n: 'Daily', l: 'CA Updates' }, { n: '2L+', l: 'Downloads' }].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 10, padding: '10px 18px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--disp)', fontSize: 20, fontWeight: 800, color: '#FFC93C' }}>{s.n}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--line)', overflowX: 'auto' }}>
        <div className="wrap" style={{ display: 'flex', gap: 6, padding: '12px 32px', flexWrap: 'nowrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              padding: '7px 16px', borderRadius: 20,
              border: active === cat ? 'none' : '1px solid var(--line)',
              background: active === cat ? 'var(--primary)' : '#fff',
              color: active === cat ? '#fff' : 'var(--muted)',
              fontWeight: 600, fontSize: 12.5, cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all .15s',
            }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Material grid */}
      <div className="wrap" style={{ padding: '32px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
          {filtered.map((m, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid var(--line)', borderRadius: 12,
              padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'flex-start',
              transition: 'box-shadow .15s',
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--sh-2)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
            >
              <div style={{ width: 44, height: 44, borderRadius: 10, background: m.bg, color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{m.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 3 }}>
                  <span style={{ fontSize: 10.5, background: m.free ? '#EAF9EF' : m.bg, color: m.free ? '#16A34A' : m.color, fontWeight: 700, padding: '2px 7px', borderRadius: 20 }}>
                    {m.free ? '🆓 Free' : '💎 Premium'}
                  </span>
                  {m.tag && <span style={{ fontSize: 10, color: 'var(--muted-2)', fontWeight: 600 }}>{m.tag}</span>}
                </div>
                <h3 style={{ fontSize: 13.5, margin: '0 0 4px', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.title}</h3>
                <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--muted-2)' }}>
                  <span>📁 {m.size}</span>
                  <span>🕐 {m.date}</span>
                </div>
              </div>
              <button style={{
                background: m.free ? 'var(--primary)' : m.color,
                color: '#fff', border: 'none', borderRadius: 8,
                padding: '8px 14px', fontWeight: 700, fontSize: 12, cursor: 'pointer', flexShrink: 0,
              }}>
                {m.free ? '⬇ Download' : '🔓 Unlock'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
