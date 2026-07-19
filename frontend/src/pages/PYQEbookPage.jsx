// PYQEbookPage.jsx — PYQ E-Books library
import { useState } from 'react';

const filters = ['All', 'OSSSC', 'OSSC', 'OPSC', 'Odisha Police', 'SSC', 'Bank'];

const pyqBooks = [
  { subject: 'Computer', icon: '💻', color: '#1957D6', bg: '#EAF1FD', desc: 'MS Office, Internet, Hardware & Software basics', exams: ['OSSSC', 'OSSC', 'Odisha Police'], pages: '180 pages', year: '2020-2025', tag: '🔥 Most Demanded', price: '₹199', free: false },
  { subject: 'English Language', icon: '📖', color: '#0F9D58', bg: '#E8F8EE', desc: 'Grammar, Vocabulary, Comprehension & Tenses', exams: ['OPSC', 'OSSC', 'OSSSC'], pages: '220 pages', year: '2018-2025', tag: '⭐ Best Seller', price: '₹149', free: false },
  { subject: 'Odia', icon: '🔤', color: '#7C3AED', bg: '#F3ECFE', desc: 'Vyakaran, Sahitya, Translation & Idioms', exams: ['OSSSC', 'OSSC', 'Odisha Police'], pages: '160 pages', year: '2019-2025', tag: '🆕 New Edition', price: '₹129', free: false },
  { subject: 'General Knowledge', icon: '🌍', color: '#EA7A1E', bg: '#FEF1E4', desc: 'Odisha GK, India GK, Static & Current Affairs', exams: ['OSSSC', 'OSSC', 'OPSC'], pages: '300 pages', year: '2015-2025', tag: '🔥 Most Demanded', price: '₹249', free: false },
  { subject: 'Mathematics', icon: '🧮', color: '#B4232F', bg: '#FCEBEA', desc: 'Arithmetic, Algebra, Geometry & Data Interpretation', exams: ['OSSC', 'OSSSC', 'OPSC'], pages: '250 pages', year: '2016-2025', tag: '⚡ High Demand', price: '₹219', free: false },
  { subject: 'Reasoning', icon: '🧩', color: '#0891B2', bg: '#E0F7FA', desc: 'Verbal, Non-Verbal, Logical & Analytical Reasoning', exams: ['OSSSC', 'OSSC', 'Odisha Police'], pages: '190 pages', year: '2018-2025', tag: '⚡ High Demand', price: '₹169', free: false },
  { subject: 'OSSSC RI Previous Papers', icon: '📋', color: '#B4232F', bg: '#FCEBEA', desc: 'Complete previous year question papers of OSSSC RI', exams: ['OSSSC'], pages: '140 pages', year: '2017-2024', tag: '🔥 Most Demanded', price: 'Free', free: true },
  { subject: 'OSSC CGL Previous Papers', icon: '📋', color: '#1957D6', bg: '#EAF1FD', desc: 'Complete previous year question papers of OSSC CGL', exams: ['OSSC'], pages: '160 pages', year: '2018-2024', tag: '⭐ Popular', price: 'Free', free: true },
  { subject: 'General Science', icon: '🔬', color: '#0891B2', bg: '#E0F7FA', desc: 'Physics, Chemistry, Biology for competitive exams', exams: ['SSC', 'Bank', 'OSSSC'], pages: '200 pages', year: '2018-2025', tag: '⭐ Popular', price: '₹179', free: false },
];

export default function PYQEbookPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = pyqBooks.filter(book => {
    const matchFilter = activeFilter === 'All' || book.exams.includes(activeFilter);
    const matchSearch = book.subject.toLowerCase().includes(search.toLowerCase()) || book.desc.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div style={{ minHeight: '80vh', background: 'var(--bg)' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, rgb(15, 23, 42), rgba(234, 122, 30, 0.133))', padding: '44px 0 36px' }}>
        <div className="wrap">
          <div className="eyebrow" style={{ color: '#FDE68A' }}>PYQ Ebook</div>
          <h1 style={{ fontFamily: 'var(--disp)', fontSize: 'clamp(24px,3.5vw,36px)', color: '#fff', margin: '8px 0 10px' }}>
            Previous Year Question E-Books
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 14, maxWidth: '52ch', lineHeight: 1.7, marginBottom: 18 }}>
            Topic-wise PYQ collections — the most trusted exam resource for Odisha state exams.
          </p>
          <div style={{ display: 'flex', gap: 16, marginBottom: 22, flexWrap: 'wrap' }}>
            {[{ n: '9+', l: 'E-Books' }, { n: '2', l: 'Free Titles' }, { n: '7', l: 'Subjects' }].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 10, padding: '10px 18px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--disp)', fontSize: 20, fontWeight: 800, color: '#FFC93C' }}>{s.n}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
          {/* Search */}
          <div style={{ maxWidth: 480, position: 'relative' }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search subjects or exams..."
              style={{
                width: '100%', padding: '13px 48px 13px 18px',
                borderRadius: 30, border: 'none', fontSize: 14,
                background: 'rgba(255,255,255,.95)', outline: 'none', boxSizing: 'border-box'
              }}
            />
            <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 18 }}>🔍</span>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 32, paddingBottom: 48 }}>
        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding: '7px 18px', borderRadius: 25, border: '1.5px solid',
              borderColor: activeFilter === f ? '#0891B2' : 'var(--line)',
              background: activeFilter === f ? '#E0F7FA' : 'var(--card)',
              color: activeFilter === f ? '#0891B2' : 'var(--text)',
              fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all .15s'
            }}>{f}</button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--muted)', alignSelf: 'center' }}>
            {filtered.length} books found
          </span>
        </div>

        {/* Books Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 18 }}>
          {filtered.map((book, i) => (
            <div key={i} style={{
              background: 'var(--card)', border: '1px solid var(--line)',
              borderRadius: 14, padding: 22, position: 'relative', overflow: 'hidden',
              transition: 'all .18s', cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--sh-2)'; e.currentTarget.style.borderColor = book.color + '55'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'var(--line)'; }}
            >
              {/* Left accent */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: book.color, borderRadius: '14px 0 0 14px' }} />
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginLeft: 4 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 12,
                  background: book.bg, color: book.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0
                }}>{book.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: book.color, background: book.bg, padding: '2px 8px', borderRadius: 20 }}>{book.tag}</span>
                    {book.free && <span style={{ fontSize: 10, fontWeight: 800, color: '#0F9D58', background: '#E8F8EE', padding: '2px 8px', borderRadius: 20 }}>FREE</span>}
                  </div>
                  <h3 style={{ fontSize: 15, margin: '0 0 4px', fontWeight: 800 }}>{book.subject}</h3>
                  <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 10px', lineHeight: 1.5 }}>{book.desc}</p>
                  <div style={{ fontSize: 11, color: 'var(--muted-2)', marginBottom: 12 }}>
                    <span>📄 {book.pages}</span>
                    <span style={{ margin: '0 8px' }}>·</span>
                    <span>📅 {book.year}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                    {book.exams.map((ex, j) => (
                      <span key={j} style={{ fontSize: 10, fontWeight: 700, background: 'var(--bg)', border: '1px solid var(--line)', padding: '2px 7px', borderRadius: 6, color: 'var(--muted)' }}>{ex}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 900, fontSize: 17, color: book.color }}>{book.price}</span>
                    <a href="#" style={{
                      fontSize: 12.5, fontWeight: 700, color: '#fff', background: book.color,
                      padding: '7px 16px', borderRadius: 8
                    }}>{book.free ? 'Download Free →' : 'Get E-Book →'}</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
