import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './Nav.css';

const links = [
  { to: '/', key: 'home' },
  { to: '/portfolio', key: 'portfolio' },
  { to: '/about', key: 'about' },
  { to: '/pricing', key: 'pricing' },
  { to: '/contact', key: 'contact' },
];

export default function Nav() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-bar container">
        <NavLink to="/" className="nav-logo" onClick={() => setOpen(false)}>
          Bohdana Kosmyna
        </NavLink>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.key}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {t.nav[link.key]}
            </NavLink>
          ))}

          <div className="lang-switch">
            <button
              type="button"
              className={`lang-btn ${lang === 'ua' ? 'is-active' : ''}`}
              onClick={() => setLang('ua')}
            >
              UA
            </button>
            <span className="lang-sep">/</span>
            <button
              type="button"
              className={`lang-btn ${lang === 'pl' ? 'is-active' : ''}`}
              onClick={() => setLang('pl')}
            >
              PL
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
