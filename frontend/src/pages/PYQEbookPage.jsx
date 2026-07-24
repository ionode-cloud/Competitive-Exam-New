// PYQEbookPage.jsx — PYQ E-Books library
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FaLaptopCode,
  FaBookOpen,
  FaFont,
  FaGlobe,
  FaCalculator,
  FaPuzzlePiece,
  FaFileAlt,
  FaFlask,
  FaSearch,
  FaBook,
  FaCalendarAlt,
  FaFire,
  FaStar,
  FaRegDotCircle,
  FaBolt
} from 'react-icons/fa';

const pyqBooks = [
  { subject: 'Computer', icon: <FaLaptopCode />, color: '#1957D6', bg: '#EAF1FD', desc: 'MS Office, Internet, Hardware & Software basics', exams: ['OSSSC', 'OSSC', 'Odisha Police'], pages: '180 pages', year: '2020-2025', tag: 'Most Demanded', tagIcon: <FaFire />, price: '₹199', free: false },
  { subject: 'English Language', icon: <FaBookOpen />, color: '#0F9D58', bg: '#E8F8EE', desc: 'Grammar, Vocabulary, Comprehension & Tenses', exams: ['OPSC', 'OSSC', 'OSSSC'], pages: '220 pages', year: '2018-2025', tag: 'Best Seller', tagIcon: <FaStar />, price: '₹149', free: false },
  { subject: 'Odia', icon: <FaFont />, color: '#7C3AED', bg: '#F3ECFE', desc: 'Vyakaran, Sahitya, Translation & Idioms', exams: ['OSSSC', 'OSSC', 'Odisha Police'], pages: '160 pages', year: '2019-2025', tag: 'New Edition', tagIcon: <FaRegDotCircle />, price: '₹129', free: false },
  { subject: 'General Knowledge', icon: <FaGlobe />, color: '#EA7A1E', bg: '#FEF1E4', desc: 'Odisha GK, India GK, Static & Current Affairs', exams: ['OSSSC', 'OSSC', 'OPSC'], pages: '300 pages', year: '2015-2025', tag: 'Most Demanded', tagIcon: <FaFire />, price: '₹249', free: false },
  { subject: 'Mathematics', icon: <FaCalculator />, color: '#B4232F', bg: '#FCEBEA', desc: 'Arithmetic, Algebra, Geometry & Data Interpretation', exams: ['OSSC', 'OSSSC', 'OPSC'], pages: '250 pages', year: '2016-2025', tag: 'High Demand', tagIcon: <FaBolt />, price: '₹219', free: false },
  { subject: 'Reasoning', icon: <FaPuzzlePiece />, color: '#0891B2', bg: '#E0F7FA', desc: 'Verbal, Non-Verbal, Logical & Analytical Reasoning', exams: ['OSSSC', 'OSSC', 'Odisha Police'], pages: '190 pages', year: '2018-2025', tag: 'High Demand', tagIcon: <FaBolt />, price: '₹169', free: false },
  { subject: 'OSSSC RI Previous Papers', icon: <FaFileAlt />, color: '#B4232F', bg: '#FCEBEA', desc: 'Complete previous year question papers of OSSSC RI', exams: ['OSSSC'], pages: '140 pages', year: '2017-2024', tag: 'Most Demanded', tagIcon: <FaFire />, price: 'Free', free: true },
  { subject: 'OSSC CGL Previous Papers', icon: <FaFileAlt />, color: '#1957D6', bg: '#EAF1FD', desc: 'Complete previous year question papers of OSSC CGL', exams: ['OSSC'], pages: '160 pages', year: '2018-2024', tag: 'Popular', tagIcon: <FaStar />, price: 'Free', free: true },
  { subject: 'General Science', icon: <FaFlask />, color: '#0891B2', bg: '#E0F7FA', desc: 'Physics, Chemistry, Biology for competitive exams', exams: ['SSC', 'Bank', 'OSSSC'], pages: '200 pages', year: '2018-2025', tag: 'Popular', tagIcon: <FaStar />, price: '₹179', free: false },
];

export default function PYQEbookPage() {
  const [searchParams] = useSearchParams();

  // Pre-fill search from ?q= URL param (primitive string — reliable comparison)
  const urlQ = searchParams.get('q') ?? '';
  const [search, setSearch] = useState(urlQ);

  // Re-sync if param changes (e.g. user clicks a different card)
  useEffect(() => {
    setSearch(urlQ);
  }, [urlQ]);

  const filtered = pyqBooks.filter(book =>
    book.subject.toLowerCase().includes(search.toLowerCase()) || book.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '80vh', background: 'var(--bg)' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, rgb(15, 23, 42), rgba(234, 122, 30, 0.133))', padding: '22px 0 18px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div className="eyebrow" style={{ color: '#FDE68A' }}>PYQ Ebook</div>
              <h1 style={{ fontFamily: 'var(--disp)', fontSize: 'clamp(20px,2.8vw,30px)', color: '#fff', margin: '6px 0 8px' }}>
                Previous Year Question E-Books
              </h1>
              <p style={{ color: '#94A3B8', fontSize: 13.5, maxWidth: '52ch', lineHeight: 1.6, margin: '0 0 14px' }}>
                Topic-wise PYQ collections — the most trusted exam resource for Odisha state exams.
              </p>
              {/* Search */}
              <div style={{ maxWidth: 380, position: 'relative' }}>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search subjects or exams..."
                  style={{
                    width: '100%', padding: '10px 42px 10px 16px',
                    borderRadius: 30, border: 'none', fontSize: 13.5,
                    background: 'rgba(255,255,255,.95)', outline: 'none', boxSizing: 'border-box'
                  }}
                />
                <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: 'var(--muted)', display: 'flex', alignItems: 'center' }}><FaSearch /></span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', paddingTop: 6 }}>
              {[{ n: '9+', l: 'E-Books' }, { n: '2', l: 'Free Titles' }, { n: '7', l: 'Subjects' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 16px', minWidth: 72 }}>
                  <div style={{ fontFamily: 'var(--disp)', fontSize: 20, fontWeight: 900, color: '#FFC93C', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 10.5, color: '#CBD5E1', marginTop: 4, letterSpacing: 0.4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 32, paddingBottom: 48 }}>

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
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: book.color, borderRadius: '14px 0 0 14px' }} />
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginLeft: 4 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 12,
                  background: book.bg, color: book.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0
                }}>{book.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: book.color, background: book.bg, padding: '2px 8px', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      {book.tagIcon} {book.tag}
                    </span>
                    {book.free && <span style={{ fontSize: 10, fontWeight: 800, color: '#0F9D58', background: '#E8F8EE', padding: '2px 8px', borderRadius: 20 }}>FREE</span>}
                  </div>
                  <h3 style={{ fontSize: 15, margin: '0 0 4px', fontWeight: 800 }}>{book.subject}</h3>
                  <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 10px', lineHeight: 1.5 }}>{book.desc}</p>
                  <div style={{ fontSize: 11, color: 'var(--muted-2)', marginBottom: 12, display: 'flex', alignItems: 'center' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><FaBook /> {book.pages}</span>
                    <span style={{ margin: '0 8px' }}>·</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><FaCalendarAlt /> {book.year}</span>
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
