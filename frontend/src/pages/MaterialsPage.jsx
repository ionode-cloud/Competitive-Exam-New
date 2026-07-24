// pages/MaterialsPage.jsx
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FaNewspaper,
  FaLandmark,
  FaGlobe,
  FaBookOpen,
  FaLaptopCode,
  FaCalculator,
  FaPuzzlePiece,
  FaFileAlt,
  FaEye,
  FaLock,
  FaUpload,
  FaFolderOpen,
  FaClock,
  FaMobileAlt,
  FaQrcode,
  FaCreditCard,
  FaUniversity,
  FaTimes,
  FaPlusCircle
} from 'react-icons/fa';

const categories = ['All', 'Current Affairs', 'Odisha GK', 'Static GK', 'English', 'Computer', 'Mathematics', 'Reasoning'];

const initialMaterials = [
  {
    id: 1,
    title: 'Integrated Power Supply Manual (IPS.pdf)',
    filename: 'IPS.pdf',
    cat: 'Current Affairs',
    icon: <FaNewspaper />,
    color: '#B4232F',
    bg: '#FCEBEA',
    size: '7.2 MB',
    date: 'Today',
    tag: 'New',
    free: true,
    price: 0,
    pdfUrl: '/IPS.pdf',
    desc: 'Integrated Power Supply (IPS) Operation & Maintenance Manual — Complete technical guidelines and maintenance procedures.',
    instructions: [
      'Read the operation and maintenance steps carefully.',
      'Refer to section diagrams for electrical connections.',
      'Check troubleshooting steps given in Section 12.',
      'Protected online viewing mode.'
    ]
  },
  {
    id: 2,
    title: 'Monthly Current Affairs — June 2026',
    filename: 'IPS.pdf',
    cat: 'Current Affairs',
    icon: <FaNewspaper />,
    color: '#B4232F',
    bg: '#FCEBEA',
    size: '7.2 MB',
    date: '1 Jul 2026',
    tag: '',
    free: true,
    price: 0,
    pdfUrl: '/IPS.pdf',
    desc: 'Complete 30-day compiled capsule for June 2026. Highly recommended for OSSSC RI, ARI, OSSC CGL, and Bank PO prelims revision.',
    instructions: [
      'Categorized into distinct sections for easy revision.',
      'Includes one-liner revision tables for quick memory recall.',
      'Cross-check budget and scheme highlights given in Section 4.',
      'Read online directly in full PDF mode.'
    ]
  },
  {
    id: 3,
    title: 'Odisha GK Complete Capsule 2026',
    filename: 'IPS.pdf',
    cat: 'Odisha GK',
    icon: <FaLandmark />,
    color: '#7C3AED',
    bg: '#F3ECFE',
    size: '7.2 MB',
    date: 'Updated',
    tag: 'Popular',
    free: false,
    price: 149,
    pdfUrl: '/IPS.pdf',
    desc: 'Master Odisha History, Geography, Culture, Temples, Rivers, Famous Personalities, Freedom Movement, and Administrative Setup.',
    instructions: [
      'Must-read material for OPSC OAS, OSSC CGL, and OSSSC competitive exams.',
      'Covers updated Odisha Cabinet Ministers & District-wise statistics.',
      'Contains 500+ past year questions specific to Odisha GK.',
      'Requires one-time unlock payment to view.'
    ]
  },
  {
    id: 4,
    title: 'Odisha Govt Schemes & Policies 2026',
    filename: 'IPS.pdf',
    cat: 'Odisha GK',
    icon: <FaFileAlt />,
    color: '#7C3AED',
    bg: '#F3ECFE',
    size: '7.2 MB',
    date: 'Jun 2026',
    tag: 'Demanded',
    free: true,
    price: 0,
    pdfUrl: '/IPS.pdf',
    desc: 'Detailed breakdown of flagship Odisha government schemes (KALIA, BSKY, Laccmi, Mo School, Nua-O, etc.) with allocation and target beneficiaries.',
    instructions: [
      'Focus on nodal departments and launching year for each scheme.',
      'Review target beneficiary criteria as direct MCQs are asked.',
      'Includes objective quick-quiz at the end of PDF.'
    ]
  },
  {
    id: 5,
    title: 'Static GK Capsule — Awards & Honours',
    filename: 'IPS.pdf',
    cat: 'Static GK',
    icon: <FaGlobe />,
    color: '#1957D6',
    bg: '#EAF1FD',
    size: '7.2 MB',
    date: 'Jun 2026',
    tag: '',
    free: true,
    price: 0,
    pdfUrl: '/IPS.pdf',
    desc: 'Complete list of Bharat Ratna, Padma Awards, Nobel Prizes, Oscar Awards, Sahitya Akademi Awards, and Sports Honours for 2025–2026.',
    instructions: [
      'Memorize award categories and first Indian recipients list.',
      'Special focus on Odia award winners mentioned in Chapter 3.',
      'Revise daily using flashcard method.'
    ]
  },
  {
    id: 6,
    title: 'Static GK — Books, Authors & Organizations',
    filename: 'IPS.pdf',
    cat: 'Static GK',
    icon: <FaGlobe />,
    color: '#1957D6',
    bg: '#EAF1FD',
    size: '7.2 MB',
    date: 'May 2026',
    tag: '',
    free: true,
    price: 0,
    pdfUrl: '/IPS.pdf',
    desc: 'International Organizations & Headquarters, Important Days & Themes, Ancient & Modern Books and Authors.',
    instructions: [
      'Includes trick mnemonics to memorize UN agencies headquarters.',
      'Covers latest released books by prominent leaders & personalities.',
      'Contains 150+ multiple choice practice questions.'
    ]
  },
  {
    id: 7,
    title: 'English Prepositions — Rules & 500 Examples',
    filename: 'IPS.pdf',
    cat: 'English',
    icon: <FaBookOpen />,
    color: '#0F9D58',
    bg: '#E8F8EE',
    size: '7.2 MB',
    date: 'Jun 2026',
    tag: 'New',
    free: true,
    price: 0,
    pdfUrl: '/IPS.pdf',
    desc: 'Master Fixed Prepositions, Phrasal Verbs, and Confusion Rules with 500 solved practice examples tailored for competitive exams.',
    instructions: [
      'Study the 100 most asked fixed preposition pairings daily.',
      'Solve error detection exercises without checking answers first.',
      'Answers with grammar rules provided in the appendix.'
    ]
  },
  {
    id: 8,
    title: 'English Grammar Complete Notes',
    filename: 'IPS.pdf',
    cat: 'English',
    icon: <FaBookOpen />,
    color: '#0F9D58',
    bg: '#E8F8EE',
    size: '7.2 MB',
    date: 'May 2026',
    tag: 'Top Rated',
    free: false,
    price: 199,
    pdfUrl: '/IPS.pdf',
    desc: 'All grammar rules: Tenses, Subject-Verb Agreement, Voice Change, Direct & Indirect Speech, Articles, and Sentence Rearrangement.',
    instructions: [
      'Structured module-by-module course notes with rule shortcuts.',
      'Includes 1000+ practice questions with detailed explanations.',
      'Designed by senior English faculty for SSC & State exams.'
    ]
  },
  {
    id: 9,
    title: 'Computer Fundamentals — Odia Medium PDF',
    filename: 'IPS.pdf',
    cat: 'Computer',
    icon: <FaLaptopCode />,
    color: '#0891B2',
    bg: '#E0F7FA',
    size: '7.2 MB',
    date: 'Jul 2026',
    tag: 'Hot',
    free: false,
    price: 129,
    pdfUrl: '/IPS.pdf',
    desc: 'Computer Awareness & Application notes in simple Odia & English bilingual format covering MS Office, Internet, Shortcuts & Networking.',
    instructions: [
      'Ideal for OSSSC RI, ARI, Amin, and OSSC CGL computer practical/theory.',
      'Shortcut keys reference table given on page 42.',
      'Includes 300+ bilingual MCQs.'
    ]
  },
  {
    id: 10,
    title: 'MS Office & Internet — Practice Questions',
    filename: 'IPS.pdf',
    cat: 'Computer',
    icon: <FaLaptopCode />,
    color: '#0891B2',
    bg: '#E0F7FA',
    size: '7.2 MB',
    date: 'Jun 2026',
    tag: '',
    free: true,
    price: 0,
    pdfUrl: '/IPS.pdf',
    desc: 'Top 400 MS Word, Excel, PowerPoint, Networking & Cyber Security objective questions with step-by-step answer key.',
    instructions: [
      'Practice keyboard shortcuts on your computer while studying.',
      'Focus on Excel formulas and Word formatting questions.',
      'Self-assessment score sheet included on the last page.'
    ]
  },
  {
    id: 11,
    title: 'Maths Shortcut Tricks for OSSSC',
    filename: 'IPS.pdf',
    cat: 'Mathematics',
    icon: <FaCalculator />,
    color: '#EA7A1E',
    bg: '#FEF1E4',
    size: '7.2 MB',
    date: 'May 2026',
    tag: 'Popular',
    free: false,
    price: 149,
    pdfUrl: '/IPS.pdf',
    desc: 'Speed math formula book: Percentage shortcuts, Ratio tricks, Time & Work mental math formulas, and DI calculation hacks.',
    instructions: [
      'Learn 1 to 30 tables, squares, and cubes listed in Chapter 1.',
      'Apply Vedic math shortcuts for rapid 2-digit & 3-digit multiplication.',
      'Practice 20 speed math questions daily.'
    ]
  },
  {
    id: 12,
    title: 'Reasoning Non-Verbal Tricks PDF',
    filename: 'IPS.pdf',
    cat: 'Reasoning',
    icon: <FaPuzzlePiece />,
    color: '#C2740A',
    bg: '#FEF3E2',
    size: '7.2 MB',
    date: 'Jun 2026',
    tag: '',
    free: true,
    price: 0,
    pdfUrl: '/IPS.pdf',
    desc: 'Visual pattern recognition, Mirror & Water images, Paper cutting & folding, Embedded figures, and Series completion PDF.',
    instructions: [
      'Use elimination technique for option elimination in non-verbal test.',
      'High-resolution vector diagrams for clear visual practice.',
      'Includes answer key with step-by-step pattern logic.'
    ]
  },
];

export default function MaterialsPage() {
  const [searchParams] = useSearchParams();

  // Derive the active category from ?cat= param (primitive string — reliable comparison)
  const paramCat = searchParams.get('cat') ?? '';
  const urlCat = categories.includes(paramCat) ? paramCat : 'All';

  const [active, setActive] = useState(urlCat);
  const [materialsList, setMaterialsList] = useState(initialMaterials);

  // Re-sync when ?cat= param changes
  useEffect(() => {
    setActive(urlCat);
  }, [urlCat]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [activePdf, setActivePdf] = useState(null);
  const [paymentMaterial, setPaymentMaterial] = useState(null);
  const [unlockedIds, setUnlockedIds] = useState([]);

  // Payment states
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // File input ref for manual PDF upload
  const fileInputRef = useRef(null);

  const filtered = active === 'All' ? materialsList : materialsList.filter(m => m.cat === active);

  const handleOpenPdfModal = (m) => {
    setActivePdf(m);
  };

  const handleActionButtonClick = (m) => {
    const isUnlocked = m.free || unlockedIds.includes(m.id);
    if (isUnlocked) {
      handleOpenPdfModal(m);
    } else {
      setPaymentMaterial(m);
      setPaymentSuccess(false);
    }
  };

  const handleConfirmPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      setUnlockedIds(prev => [...prev, paymentMaterial.id]);
      setTimeout(() => {
        const mat = paymentMaterial;
        setPaymentMaterial(null);
        setPaymentSuccess(false);
        handleOpenPdfModal(mat);
      }, 1000);
    }, 1500);
  };

  // Manual PDF Upload Handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const blobUrl = URL.createObjectURL(file);
      const formattedSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      
      const newPdfItem = {
        id: Date.now(),
        title: file.name.replace(/\.[^/.]+$/, ''),
        filename: file.name,
        cat: 'Current Affairs',
        icon: <FaFileAlt />,
        color: '#0F9D58',
        bg: '#E8F8EE',
        size: formattedSize,
        date: 'Today',
        tag: 'Uploaded',
        free: true,
        price: 0,
        pdfUrl: blobUrl,
        desc: `Custom uploaded document: ${file.name}`,
        instructions: [
          'Directly uploaded from local computer.',
          'Read and revise directly on screen in full PDF mode.'
        ]
      };

      setMaterialsList(prev => [newPdfItem, ...prev]);
      handleOpenPdfModal(newPdfItem);
      e.target.value = '';
    } else if (file) {
      alert('Please select a valid PDF file (.pdf).');
    }
  };

  const pdfSource = activePdf ? (activePdf.pdfUrl || '/IPS.pdf') : '/IPS.pdf';

  return (
    <div style={{ minHeight: '80vh', background: 'var(--bg)' }}>


      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, rgb(15, 23, 42), rgba(234, 122, 30, 0.133))', padding: '22px 0 18px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div className="eyebrow" style={{ color: '#FDE68A' }}>Study Materials</div>
              <h1 style={{ fontFamily: 'var(--disp)', fontSize: 'clamp(20px,2.8vw,30px)', color: '#fff', margin: '6px 0 8px' }}>
                Free &amp; Premium Study Materials
              </h1>
              <p style={{ color: '#94A3B8', fontSize: 13.5, maxWidth: '52ch', lineHeight: 1.6, margin: '0 0 12px' }}>
                Read Current Affairs, Odisha GK, Static GK, English, Computer &amp; more PDFs online — curated for Odisha state exams.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', paddingTop: 6 }}>
              {[{ n: '200+', l: 'Free PDFs' }, { n: 'Daily', l: 'CA Updates' }, { n: '2L+', l: 'Downloads' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 16px', minWidth: 72 }}>
                  <div style={{ fontFamily: 'var(--disp)', fontSize: 20, fontWeight: 900, color: '#FFC93C', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 10.5, color: '#CBD5E1', marginTop: 4, letterSpacing: 0.4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--line)', overflowX: 'auto' }}>
        <div className="wrap" style={{ display: 'flex', gap: 6, padding: '12px 32px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'nowrap' }}>
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
      </div>

      {/* Material grid */}
      <div className="wrap" style={{ padding: '32px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
          {filtered.map((m) => {
            const isUnlocked = m.free || unlockedIds.includes(m.id);
            return (
              <div key={m.id} style={{
                background: '#fff', border: '1px solid var(--line)', borderRadius: 12,
                padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'flex-start',
                transition: 'box-shadow .15s',
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--sh-2)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
              >
                <div style={{ width: 44, height: 44, borderRadius: 10, background: m.bg, color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{m.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 3 }}>
                    <span style={{ fontSize: 10.5, background: isUnlocked ? '#EAF9EF' : '#FEF2F2', color: isUnlocked ? '#16A34A' : '#DC2626', fontWeight: 700, padding: '2px 7px', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      {isUnlocked ? <><FaEye fontSize={10} /> Free Access</> : <><FaLock fontSize={10} /> Paid (₹{m.price})</>}
                    </span>
                    {m.tag && <span style={{ fontSize: 10, color: 'var(--muted-2)', fontWeight: 600 }}>{m.tag}</span>}
                  </div>
                  <h3 style={{ fontSize: 13.5, margin: '0 0 4px', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.title}</h3>
                  <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--muted-2)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><FaFolderOpen /> {m.size}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><FaClock /> {m.date}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                  <button
                    onClick={() => setSelectedMaterial(m)}
                    style={{
                      background: 'var(--bg)',
                      color: 'var(--ink)',
                      border: '1px solid var(--line)',
                      borderRadius: 8,
                      padding: '7px 12px',
                      fontWeight: 700,
                      fontSize: 12,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = m.bg;
                      e.currentTarget.style.borderColor = m.color + '44';
                      e.currentTarget.style.color = m.color;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'var(--bg)';
                      e.currentTarget.style.borderColor = 'var(--line)';
                      e.currentTarget.style.color = 'var(--ink)';
                    }}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleActionButtonClick(m)}
                    style={{
                      background: isUnlocked ? '#0F9D58' : '#DC2626',
                      color: '#fff', border: 'none', borderRadius: 8,
                      padding: '7px 12px', fontWeight: 700, fontSize: 12, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4
                    }}
                  >
                    {isUnlocked ? <><FaEye /> View PDF</> : <><FaLock /> Lock</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details & Instructions Modal */}
      {selectedMaterial && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10000, padding: 20,
          }}
          onClick={() => setSelectedMaterial(null)}
        >
          <div
            style={{
              background: '#fff', borderRadius: 16, maxWidth: 560, width: '100%',
              maxHeight: '90vh', overflowY: 'auto', border: '1px solid var(--line)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', animation: 'dropdownIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex', flexDirection: 'column',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px', background: selectedMaterial.bg,
              borderBottom: `1.5px solid ${selectedMaterial.color}22`,
              borderRadius: '16px 16px 0 0', display: 'flex', alignItems: 'center', gap: 14,
              position: 'relative'
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: '#fff', color: selectedMaterial.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, boxShadow: '0 4px 12px rgba(0,0,0,0.06)', flexShrink: 0
              }}>
                {selectedMaterial.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0, paddingRight: 24 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 10.5, background: '#fff', color: selectedMaterial.color, fontWeight: 800, padding: '2px 8px', borderRadius: 12 }}>
                    {selectedMaterial.cat}
                  </span>
                  <span style={{ fontSize: 11, color: selectedMaterial.color, fontWeight: 700, opacity: 0.8, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <FaFolderOpen /> {selectedMaterial.size} • <FaClock /> {selectedMaterial.date}
                  </span>
                </div>
                <h2 style={{ fontSize: 17, fontWeight: 850, margin: 0, color: 'var(--ink)', lineHeight: 1.3 }}>
                  {selectedMaterial.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedMaterial(null)}
                style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'rgba(0,0,0,0.06)', border: 'none', borderRadius: 50,
                  width: 28, height: 28, fontSize: 14, fontWeight: 800,
                  cursor: 'pointer', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
              {/* About Subject */}
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 13, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FaBookOpen /> About Subject & Content
                </h3>
                <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, margin: 0, background: '#F8FAFC', padding: '14px 16px', borderRadius: 10, border: '1px solid #E2E8F0' }}>
                  {selectedMaterial.desc}
                </p>
              </div>

              {/* Instructions */}
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FaFileAlt /> Instructions for Candidates
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {selectedMaterial.instructions.map((inst, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5, color: '#475569', lineHeight: 1.5 }}>
                      <span style={{
                        background: selectedMaterial.bg, color: selectedMaterial.color,
                        width: 20, height: 20, borderRadius: 50, fontSize: 11, fontWeight: 800,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1
                      }}>
                        {idx + 1}
                      </span>
                      <span>{inst}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer / Action Button area */}
            <div style={{
              padding: '16px 24px', background: '#F8FAFC', borderTop: '1px solid var(--line)',
              borderRadius: '0 0 16px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12
            }}>
              <button
                onClick={() => setSelectedMaterial(null)}
                style={{
                  padding: '10px 20px', borderRadius: 10, border: '1px solid var(--line)',
                  background: '#fff', color: 'var(--muted)', fontWeight: 700, fontSize: 13, cursor: 'pointer'
                }}
              >
                Close
              </button>
              {(() => {
                const isUnlocked = selectedMaterial.free || unlockedIds.includes(selectedMaterial.id);
                return (
                  <button
                    onClick={() => {
                      const mat = selectedMaterial;
                      setSelectedMaterial(null);
                      handleActionButtonClick(mat);
                    }}
                    style={{
                      flex: 1, maxWidth: 260, padding: '12px 20px', borderRadius: 10, border: 'none',
                      background: isUnlocked ? '#0F9D58' : '#DC2626',
                      color: '#fff', fontWeight: 800, fontSize: 14, cursor: 'pointer',
                      boxShadow: `0 4px 14px ${isUnlocked ? '#0F9D5844' : '#DC262644'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                    }}
                  >
                    {isUnlocked ? <><FaEye /> View PDF</> : <><FaLock /> Pay ₹{selectedMaterial.price} to Unlock</>}
                  </button>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal for Locked Items */}
      {paymentMaterial && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10000, padding: 20,
          }}
          onClick={() => !isProcessingPayment && setPaymentMaterial(null)}
        >
          <div
            style={{
              background: '#fff', borderRadius: 18, maxWidth: 460, width: '100%',
              border: '1px solid var(--line)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden', animation: 'dropdownIn 0.2s ease-out'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Payment Header */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '20px 24px', color: '#fff', position: 'relative' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#FFC93C', letterSpacing: 1, textTransform: 'uppercase' }}>
                Secure Payment
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 850, margin: '4px 0 0', color: '#fff' }}>
                Unlock PDF Study Material
              </h2>
              <button
                onClick={() => setPaymentMaterial(null)}
                disabled={isProcessingPayment}
                style={{
                  position: 'absolute', top: 18, right: 18,
                  background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 50,
                  width: 28, height: 28, color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Payment Body */}
            <div style={{ padding: '24px' }}>
              {paymentSuccess ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ fontSize: 48, color: '#0F9D58', marginBottom: 12 }}>✓</div>
                  <h3 style={{ fontSize: 18, fontWeight: 850, color: '#0F9D58', margin: '0 0 6px' }}>Payment Successful!</h3>
                  <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>Unlocking PDF Reader...</p>
                </div>
              ) : (
                <>
                  {/* Summary Box */}
                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: '14px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 24, color: paymentMaterial.color }}>{paymentMaterial.icon}</span>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--ink)' }}>{paymentMaterial.title}</div>
                        <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>PDF Document • {paymentMaterial.size}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--ink)', background: '#fff', padding: '4px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}>
                      ₹{paymentMaterial.price}
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', marginBottom: 10 }}>SELECT PAYMENT METHOD</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {[
                        { id: 'upi', label: 'UPI / GPay / PhonePe', icon: <FaMobileAlt /> },
                        { id: 'qr', label: 'Scan QR Code', icon: <FaQrcode /> },
                        { id: 'card', label: 'Credit / Debit Card', icon: <FaCreditCard /> },
                        { id: 'netbank', label: 'Net Banking', icon: <FaUniversity /> }
                      ].map((pm) => (
                        <div
                          key={pm.id}
                          onClick={() => setSelectedPaymentMethod(pm.id)}
                          style={{
                            border: `1.5px solid ${selectedPaymentMethod === pm.id ? 'var(--primary)' : 'var(--line)'}`,
                            background: selectedPaymentMethod === pm.id ? '#F0F7FF' : '#fff',
                            borderRadius: 10, padding: '12px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.15s'
                          }}
                        >
                          <span style={{ fontSize: 18, color: selectedPaymentMethod === pm.id ? 'var(--primary)' : 'var(--muted)' }}>{pm.icon}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: selectedPaymentMethod === pm.id ? 'var(--primary)' : 'var(--ink)' }}>
                            {pm.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pay Button */}
                  <button
                    onClick={handleConfirmPayment}
                    disabled={isProcessingPayment}
                    style={{
                      width: '100%', padding: '14px', borderRadius: 10, border: 'none',
                      background: 'linear-gradient(135deg, #0F9D58 0%, #059669 100%)',
                      color: '#fff', fontWeight: 850, fontSize: 15, cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(15, 157, 88, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                    }}
                  >
                    {isProcessingPayment ? '⏳ Processing Payment...' : <><FaLock /> Pay ₹{paymentMaterial.price} &amp; View PDF</>}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PDF Full Screen Modal rendering Native Browser PDF Engine */}
      {activePdf && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: '#2a2e33', zIndex: 100000, display: 'flex', flexDirection: 'column',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          {/* Top Bar with Title and Close Reader button */}
          <div
            style={{
              height: 44, background: '#1e293b', color: '#f1f5f9',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 18px', boxShadow: '0 2px 10px rgba(0,0,0,0.4)', userSelect: 'none',
              zIndex: 10, borderBottom: '1px solid #334155'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: 0.3, color: '#f8fafc', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <FaFileAlt /> {activePdf.title}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button
                onClick={() => setActivePdf(null)}
                style={{
                  background: '#DC2626', color: '#fff', border: 'none',
                  padding: '5px 14px', borderRadius: 6, fontWeight: 800, fontSize: 12.5,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4
                }}
              >
                <FaTimes /> Close PDF View
              </button>
            </div>
          </div>

          {/* Main Workspace rendering native browser PDF viewer with sidebar thumbnails, 1/40 page count & full functionality */}
          <div style={{ flex: 1, width: '100%', height: 'calc(100% - 44px)', background: '#323639' }}>
            <iframe
              src={pdfSource}
              title={activePdf.title}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                background: '#323639'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
