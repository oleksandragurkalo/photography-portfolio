import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './Packages.css';

export default function Packages() {
  const { t } = useLanguage();

  return (
    <div className="packages">
      <div className="page-head">
        <p className="kicker">{t.packages.kicker}</p>
        <h1 className="headline-italic">{t.packages.headline}</h1>
      </div>

      <div className="packages-grid container">
        {t.packages.tiers.map((tier) => (
          <div className={`package-card ${tier.popular ? 'is-popular' : ''}`} key={tier.id}>
            {tier.popular && <span className="package-tag">{tier.tag}</span>}
            <h3 className="package-title">{tier.title}</h3>
            <p className="package-subtitle">{tier.subtitle}</p>
            <ul className="package-features">
              {tier.features.map((f) => (
                <li key={f}>
                  <span className="dash">—</span> {f}
                </li>
              ))}
            </ul>
            <Link to="/contact" className={`package-cta ${tier.popular ? 'is-filled' : ''}`}>
              {t.packages.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="packages-note container">{t.packages.note}</p>
    </div>
  );
}
