// ContactUsPage.jsx — Contact form + info
import { useState } from 'react';

const contactInfo = [
  { icon: '📞', label: 'Call Us', value: '+91 98765 43210', sub: 'Mon–Sat, 9 AM – 7 PM', color: '#1957D6', bg: '#EAF1FD' },
  { icon: '✉️', label: 'Email Us', value: 'info@prephub.in', sub: 'Reply within 24 hours', color: '#0F9D58', bg: '#E8F8EE' },
  { icon: '💬', label: 'WhatsApp', value: '+91 98765 43210', sub: 'Chat instantly', color: '#0F9D58', bg: '#E8F8EE' },
  { icon: '📍', label: 'Office Address', value: 'PrepHub HQ, Bhubaneswar', sub: 'Odisha – 751001, India', color: '#7C3AED', bg: '#F3ECFE' },
];

const socials = [
  { icon: '▶️', name: 'YouTube', handle: '@PrepHubOdisha', color: '#B4232F', bg: '#FCEBEA', link: '#' },
  { icon: '✈️', name: 'Telegram', handle: 't.me/PrepHubOdisha', color: '#1957D6', bg: '#EAF1FD', link: '#' },
  { icon: '📷', name: 'Instagram', handle: '@prephub.in', color: '#7C3AED', bg: '#F3ECFE', link: '#' },
  { icon: '👥', name: 'Facebook', handle: 'PrepHub Odisha', color: '#1957D6', bg: '#EAF1FD', link: '#' },
];

export default function ContactUsPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: 10,
    border: '1.5px solid var(--line)', background: 'var(--bg)',
    fontSize: 14, color: 'var(--text)', outline: 'none',
    boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border .15s',
  };

  return (
    <div style={{ minHeight: '80vh', background: 'var(--bg)' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, rgb(15, 23, 42), rgba(234, 122, 30, 0.133))', padding: '44px 0 36px' }}>
        <div className="wrap">
          <div className="eyebrow" style={{ color: '#FDE68A' }}>Contact Us</div>
          <h1 style={{ fontFamily: 'var(--disp)', fontSize: 'clamp(24px,3.5vw,36px)', color: '#fff', margin: '8px 0 10px' }}>
            Get In Touch With Us
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 14, maxWidth: '52ch', lineHeight: 1.7 }}>
            Have questions? We're here to help you on your exam journey — Mon to Sat, 9 AM–7 PM.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 18, flexWrap: 'wrap' }}>
            {[{ n: '📞', l: 'Call Support' }, { n: '✉️', l: 'Email Us' }, { n: '24h', l: 'Reply Time' }].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 10, padding: '10px 18px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--disp)', fontSize: 20, fontWeight: 800, color: '#FFC93C' }}>{s.n}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 40, paddingBottom: 56 }}>
        {/* Contact Info Cards */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
          {contactInfo.map((info, i) => (
            <div key={i} style={{
              background: info.bg, border: `1.5px solid ${info.color}22`,
              borderRadius: 14, padding: '22px 20px', textAlign: 'center',
              transition: 'transform .18s', cursor: 'pointer',
              width: '280px', flexGrow: 1, maxWidth: '340px', boxSizing: 'border-box'
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>{info.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: info.color, letterSpacing: 1, marginBottom: 6 }}>{info.label}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: info.color, marginBottom: 4 }}>{info.value}</div>
              <div style={{ fontSize: 11.5, color: info.color, opacity: .7 }}>{info.sub}</div>
            </div>
          ))}
        </div>

        {/* Form + Socials */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, alignItems: 'flex-start' }}>
          {/* Contact Form */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Send Us a Message</h2>
            <p style={{ color: 'var(--muted)', fontSize: 13.5, marginBottom: 24 }}>Fill in the form and we'll respond within 24 hours.</p>

            {sent && (
              <div style={{
                background: '#E8F8EE', border: '1.5px solid #0F9D58', borderRadius: 10,
                padding: '12px 18px', marginBottom: 20, color: '#0F9D58', fontWeight: 700, fontSize: 14
              }}>
                ✅ Message sent! We'll reply soon.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Full Name *</label>
                  <input style={inputStyle} name="name" value={form.name} onChange={handleChange} placeholder="Your name" required
                    onFocus={e => e.target.style.borderColor = '#1957D6'}
                    onBlur={e => e.target.style.borderColor = 'var(--line)'}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Phone Number</label>
                  <input style={inputStyle} name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX"
                    onFocus={e => e.target.style.borderColor = '#1957D6'}
                    onBlur={e => e.target.style.borderColor = 'var(--line)'}
                  />
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Email Address *</label>
                <input style={inputStyle} name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required
                  onFocus={e => e.target.style.borderColor = '#1957D6'}
                  onBlur={e => e.target.style.borderColor = 'var(--line)'}
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Subject</label>
                <select style={{ ...inputStyle, appearance: 'none' }} name="subject" value={form.subject} onChange={handleChange}>
                  <option value="">Select a topic...</option>
                  <option>Course Enquiry</option>
                  <option>Subscription Help</option>
                  <option>Technical Issue</option>
                  <option>Feedback</option>
                  <option>Other</option>
                </select>
              </div>
              <div style={{ marginBottom: 22 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Message *</label>
                <textarea style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }} name="message" value={form.message} onChange={handleChange} placeholder="Write your message here..." required
                  onFocus={e => e.target.style.borderColor = '#1957D6'}
                  onBlur={e => e.target.style.borderColor = 'var(--line)'}
                />
              </div>
              <button type="submit" style={{
                width: '100%', padding: '13px', background: '#1957D6',
                color: '#fff', border: 'none', borderRadius: 10,
                fontWeight: 800, fontSize: 15, cursor: 'pointer',
                transition: 'background .15s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#1342A8'}
                onMouseLeave={e => e.currentTarget.style.background = '#1957D6'}
              >Send Message →</button>
            </form>
          </div>

          {/* Socials + Hours */}
          <div>
            <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: 28, marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 18 }}>Follow Us</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {socials.map((s, i) => (
                  <a key={i} href={s.link} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    background: s.bg, borderRadius: 10, padding: '12px 16px',
                    textDecoration: 'none', transition: 'transform .15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = ''}
                  >
                    <span style={{ fontSize: 22 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontWeight: 800, color: s.color, fontSize: 13 }}>{s.name}</div>
                      <div style={{ fontSize: 11.5, color: s.color, opacity: .75 }}>{s.handle}</div>
                    </div>
                    <span style={{ marginLeft: 'auto', color: s.color, fontWeight: 700, fontSize: 14 }}>→</span>
                  </a>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Support Hours</h3>
              {[
                { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
                { day: 'Saturday', time: '10:00 AM – 5:00 PM' },
                { day: 'Sunday', time: 'Closed' },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--line)' : 'none',
                  fontSize: 13.5
                }}>
                  <span style={{ color: 'var(--muted)', fontWeight: 600 }}>{row.day}</span>
                  <span style={{ fontWeight: 800, color: row.time === 'Closed' ? '#B4232F' : '#0F9D58' }}>{row.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
