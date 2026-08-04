import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner container">
        <span>{t.footer.copyright}</span>
        <span>{t.footer.location}</span>
      </div>
    </footer>
  );
}
