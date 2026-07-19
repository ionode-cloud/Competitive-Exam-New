// Footer.jsx — Professional multi-column footer
import '../footer.css';

const quickLinks = [
  { label: 'Home',            href: '#' },
  { label: 'About Us',        href: '#' },
  { label: 'All Courses',     href: '#' },
  { label: 'Test Series',     href: '#tests' },
  { label: 'Free Mock Tests', href: '#mocks' },
  { label: 'Current Affairs', href: '#current-affairs' },
  { label: 'Contact Us',      href: '#' },
];

const examLinks = [
  { label: 'OSSSC RI / ARI',      href: '#' },
  { label: 'OPSC OAS',            href: '#' },
  { label: 'Odisha Police SI',     href: '#' },
  { label: 'OSSC CGL',            href: '#' },
  { label: 'SSC CGL / CHSL',      href: '#' },
  { label: 'IBPS PO / Clerk',     href: '#' },
  { label: 'Railway NTPC',         href: '#' },
];

const resourceLinks = [
  { label: 'PDF Study Material',  href: '#materials' },
  { label: 'PYQ Papers',          href: '#pyq' },
  { label: 'Live Batches',        href: '#live' },
  { label: 'Video Lectures',      href: '#subjects' },
  { label: 'Practice Quiz',       href: '#mocks' },
  { label: 'Exam Notifications',  href: '#' },
  { label: 'Admit Card Alerts',   href: '#' },
];


const socials = [
  { icon: '▶️', label: 'YouTube',   href: '#' },
  { icon: '✈️', label: 'Telegram',  href: '#' },
  { icon: '💬', label: 'WhatsApp',  href: '#' },
  { icon: '📷', label: 'Instagram', href: '#' },
  { icon: '🐦', label: 'Twitter',   href: '#' },
  { icon: '💼', label: 'LinkedIn',  href: '#' },
];

export default function Footer() {
  return (
    <footer className="pro-footer">

      {/* ── Main columns ── */}
      <div className="footer-main">

        {/* Brand column */}
        <div className="footer-brand-col">
          <a href="#" className="footer-logo">
            <span className="f-mark">PH</span>
            <span className="f-name">PrepHub</span>
          </a>
          <p className="footer-tagline">
            Odisha's #1 platform for competitive exam preparation. We help
            lakhs of aspirants crack OSSSC, OPSC, SSC, Banking &amp; Railway
            exams with expert-crafted content.
          </p>

          {/* Social icons */}
          <div className="footer-socials">
            {socials.map((s, i) => (
              <a key={i} className="social-btn" href={s.href} title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>

          {/* Contact mini */}
          <div className="footer-contact-mini">
            <a href="tel:+919876543210">
              <span className="fc-icon">📞</span>
              +91 98765 43210
            </a>
            <a href="mailto:info@prephub.in">
              <span className="fc-icon">✉️</span>
              info@prephub.in
            </a>
            <a href="#">
              <span className="fc-icon">📍</span>
              Bhubaneswar, Odisha — 751001
            </a>
          </div>

          {/* Trust badges */}
          <div className="footer-badges">
            <span className="footer-badge">🔒 Secure Payments</span>
            <span className="footer-badge">✅ ISO Certified</span>
            <span className="footer-badge">🏅 Award Winning</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            {quickLinks.map((l, i) => (
              <li key={i}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        {/* Exams */}
        <div className="footer-col">
          <h4>Exams</h4>
          <ul>
            {examLinks.map((l, i) => (
              <li key={i}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            {resourceLinks.map((l, i) => (
              <li key={i}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter-col">
          <h4>Stay Updated</h4>
          <p>
            Get exam notifications, free PDFs, and daily current affairs
            straight to your inbox. Join 2 lakh+ aspirants!
          </p>
          <div className="newsletter-form">
            <input
              className="newsletter-input"
              type="email"
              placeholder="Enter your email address"
            />
            <input
              className="newsletter-input"
              type="tel"
              placeholder="Mobile number (optional)"
            />
            <button className="newsletter-btn">
              🔔 Subscribe Now
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          © 2026 PrepHub. Made with <span className="heart">♥</span> for
          Odisha aspirants. All rights reserved.
        </div>
        <div className="footer-bottom-right">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Refund Policy</a>
          <a href="#">Disclaimer</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
