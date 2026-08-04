import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../../i18n/translations.js';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner container">
        <span>{t.footer.copyright}</span>
        <a className="site-footer-instagram" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          {t.footer.instagram} · {INSTAGRAM_HANDLE}
        </a>
        <span>{t.footer.location}</span>
      </div>
    </footer>
  );
}
