// SubscriptionPage.jsx — Subscription & Pricing plans
import { useState } from 'react';
import {
  FaFileAlt,
  FaClipboardList,
  FaVideo,
  FaTrophy,
  FaCheck,
  FaTimes
} from 'react-icons/fa';

const plans = [
  {
    name: 'Starter',
    price: '₹499',
    duration: '/month',
    color: '#1957D6',
    bg: '#EAF1FD',
    highlight: false,
    badge: null,
    features: [
      { ok: true,  text: '5 Full-Length Mock Tests' },
      { ok: true,  text: '10 Subject-Wise Tests' },
      { ok: true,  text: '2 PYQ E-Books (Free Titles)' },
      { ok: true,  text: 'Basic Study Materials' },
      { ok: false, text: 'Live Classes Access' },
      { ok: false, text: 'Video Course Library' },
      { ok: false, text: 'Doubt Clearing Sessions' },
      { ok: false, text: 'All-India Rank & Analytics' },
    ]
  },
  {
    name: 'Pro',
    price: '₹1,499',
    duration: '/month',
    color: '#7C3AED',
    bg: '#F3ECFE',
    highlight: true,
    badge: 'Most Popular',
    features: [
      { ok: true, text: '50 Full-Length Mock Tests' },
      { ok: true, text: 'All Subject-Wise Tests' },
      { ok: true, text: 'All PYQ E-Books' },
      { ok: true, text: 'Complete Study Materials' },
      { ok: true, text: 'Live Classes Access' },
      { ok: true, text: 'Video Course Library' },
      { ok: false, text: 'Doubt Clearing Sessions' },
      { ok: false, text: 'All-India Rank & Analytics' },
    ]
  },
  {
    name: 'Super',
    price: '₹2,999',
    duration: '/month',
    color: '#B4232F',
    bg: '#FCEBEA',
    highlight: false,
    badge: 'Best Value',
    features: [
      { ok: true, text: 'Unlimited Mock Tests' },
      { ok: true, text: 'All Subject-Wise Tests' },
      { ok: true, text: 'All PYQ E-Books + New Editions' },
      { ok: true, text: 'Premium Study Materials' },
      { ok: true, text: 'All Live Classes + Recordings' },
      { ok: true, text: 'Full Video Course Library' },
      { ok: true, text: 'Daily Doubt Clearing Sessions' },
      { ok: true, text: 'All-India Rank & Deep Analytics' },
    ]
  },
];

const combos = [
  { name: 'PDF Course Bundle', price: '₹3,999', orig: '₹7,999', icon: <FaFileAlt />, color: '#1957D6', bg: '#EAF1FD', items: ['All Subject PDFs', 'PYQ E-Books', 'Free Updates 1 Year'] },
  { name: 'Test Series Pack', price: '₹1,299', orig: '₹2,999', icon: <FaClipboardList />, color: '#0F9D58', bg: '#E8F8EE', items: ['100+ Mock Tests', 'All-India Rank', 'Detailed Analysis'] },
  { name: 'Live Batch + Materials', price: '₹4,999', orig: '₹9,999', icon: <FaVideo />, color: '#7C3AED', bg: '#F3ECFE', items: ['60 Live Classes', 'Class Recordings', 'Study Notes'] },
  { name: 'All-in-One Super Plan', price: '₹7,999', orig: '₹19,999', icon: <FaTrophy />, color: '#B4232F', bg: '#FCEBEA', items: ['Everything in Super', '6 Months Access', 'Priority Support'] },
];

export default function SubscriptionPage() {
  const [billing, setBilling] = useState('yearly');

  return (
    <div style={{ minHeight: '80vh', background: 'var(--bg)' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, rgb(15, 23, 42), rgba(234, 122, 30, 0.133))', padding: '22px 0 18px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div className="eyebrow" style={{ color: '#FDE68A' }}>Subscription</div>
              <h1 style={{ fontFamily: 'var(--disp)', fontSize: 'clamp(20px,2.8vw,30px)', color: '#fff', margin: '6px 0 8px' }}>
                Choose Your Plan
              </h1>
              <p style={{ color: '#94A3B8', fontSize: 13.5, maxWidth: '52ch', lineHeight: 1.6, margin: '0 0 14px' }}>
                Invest in your preparation — unlock everything you need to crack the exam.
              </p>
              {/* Toggle */}
              <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,.15)', borderRadius: 30, padding: 4 }}>
                {['monthly', 'yearly'].map(b => (
                  <button key={b} onClick={() => setBilling(b)} style={{
                    padding: '7px 20px', borderRadius: 26, border: 'none',
                    background: billing === b ? '#fff' : 'transparent',
                    color: billing === b ? '#1a1f35' : '#fff',
                    fontWeight: 800, fontSize: 13, cursor: 'pointer', transition: 'all .2s',
                  }}>
                    {b === 'monthly' ? 'Monthly' : 'Yearly'}
                    {b === 'yearly' && <span style={{ marginLeft: 6, background: '#0F9D58', color: '#fff', fontSize: 10, padding: '1px 6px', borderRadius: 10, fontWeight: 800 }}>SAVE 40%</span>}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', paddingTop: 6 }}>
              {[{ n: '3', l: 'Plans' }, { n: '4', l: 'Combo Packs' }, { n: '40%', l: 'Yearly Savings' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 16px', minWidth: 72 }}>
                  <div style={{ fontFamily: 'var(--disp)', fontSize: 20, fontWeight: 900, color: '#FFC93C', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 10.5, color: '#CBD5E1', marginTop: 4, letterSpacing: 0.4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 40, paddingBottom: 56 }}>

        {/* Plans */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 56 }}>
          {plans.map((plan, i) => (
            <div key={i} style={{
              background: plan.highlight ? plan.color : 'var(--card)',
              color: plan.highlight ? '#fff' : 'var(--text)',
              border: plan.highlight ? 'none' : '1px solid var(--line)',
              borderRadius: 18, padding: '32px 28px',
              position: 'relative', overflow: 'hidden',
              transform: plan.highlight ? 'scale(1.04)' : 'none',
              boxShadow: plan.highlight ? '0 12px 40px ' + plan.color + '44' : 'none',
              transition: 'transform .2s',
            }}>
              {plan.badge && (
                <div style={{
                  position: 'absolute', top: 18, right: -24,
                  background: plan.highlight ? '#fff' : plan.color,
                  color: plan.highlight ? plan.color : '#fff',
                  fontSize: 10, fontWeight: 800, padding: '4px 32px 4px 12px',
                  transform: 'rotate(0deg)', borderRadius: 4,
                }}>{plan.badge}</div>
              )}
              <div style={{ fontSize: 13, fontWeight: 700, opacity: plan.highlight ? .75 : undefined, color: plan.highlight ? undefined : plan.color, marginBottom: 8 }}>{plan.name}</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 22 }}>
                <span style={{ fontSize: 36, fontWeight: 900 }}>
                  {billing === 'yearly'
                    ? '₹' + Math.round(parseInt(plan.price.replace('₹', '').replace(',', '')) * 0.6).toLocaleString('en-IN')
                    : plan.price}
                </span>
                <span style={{ fontSize: 13, opacity: .7, paddingBottom: 6 }}>{plan.duration}</span>
              </div>
              <div style={{ borderTop: plan.highlight ? 'rgba(255,255,255,.25) 1px solid' : '1px solid var(--line)', paddingTop: 20, marginBottom: 22 }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{
                    display: 'flex', alignItems: 'center', gap: 9,
                    marginBottom: 10, fontSize: 13.5,
                    opacity: f.ok ? 1 : (plan.highlight ? .45 : .4),
                  }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: 50,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: f.ok ? (plan.highlight ? 'rgba(255,255,255,.25)' : plan.color + '22') : 'transparent',
                      fontSize: 10, fontWeight: 900,
                      color: f.ok ? (plan.highlight ? '#fff' : plan.color) : (plan.highlight ? 'rgba(255,255,255,.4)' : 'var(--muted-2)'),
                      flexShrink: 0,
                    }}>
                      {f.ok ? <FaCheck /> : <FaTimes />}
                    </span>
                    {f.text}
                  </div>
                ))}
              </div>
              <button style={{
                width: '100%', padding: '13px',
                background: plan.highlight ? '#fff' : plan.color,
                color: plan.highlight ? plan.color : '#fff',
                border: 'none', borderRadius: 10,
                fontWeight: 800, fontSize: 15, cursor: 'pointer',
                transition: 'opacity .15s',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Get {plan.name} Plan →
              </button>
            </div>
          ))}
        </div>

        {/* Combo Packs */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: 2, marginBottom: 8 }}>COMBO PACKS</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>One-Time Packs — Pay Once, Save More</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 16 }}>
            {combos.map((combo, i) => (
              <div key={i} style={{
                background: combo.bg, border: `1.5px solid ${combo.color}33`,
                borderRadius: 16, padding: '24px 22px',
                transition: 'transform .18s', cursor: 'pointer',
                width: '280px', flexGrow: 1, maxWidth: '340px', boxSizing: 'border-box'
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                <div style={{ fontSize: 26, color: combo.color, marginBottom: 12, display: 'flex' }}>{combo.icon}</div>
                <h3 style={{ margin: '0 0 6px', fontSize: 15.5, fontWeight: 800, color: combo.color }}>{combo.name}</h3>
                <div style={{ marginBottom: 14 }}>
                  {combo.items.map((item, j) => (
                    <div key={j} style={{ fontSize: 12.5, color: combo.color, opacity: .8, marginBottom: 3, display: 'flex', alignItems: 'center', gap: 5 }}>
                      <FaCheck fontSize={10} /> {item}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <span style={{ fontSize: 20, fontWeight: 900, color: combo.color }}>{combo.price}</span>
                    <span style={{ fontSize: 12, color: combo.color, opacity: .6, marginLeft: 8, textDecoration: 'line-through' }}>{combo.orig}</span>
                  </div>
                  <button style={{
                    padding: '7px 16px', background: combo.color, color: '#fff',
                    border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 12.5, cursor: 'pointer'
                  }}>Buy Now →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
