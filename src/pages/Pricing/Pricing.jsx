import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './Pricing.css';

export default function Pricing() {
  const { t } = useLanguage();

  return (
    <div className="pricing">
      <div className="page-head">
        <p className="kicker">{t.pricing.kicker}</p>
        <h1 className="headline-italic">{t.pricing.headline}</h1>
      </div>

      <div className="pricing-grid container">
        {t.pricing.tiers.map((tier) => (
          <div className={`price-card ${tier.popular ? 'is-popular' : ''}`} key={tier.id}>
            {tier.popular && <span className="price-tag">{tier.tag}</span>}
            <h3 className="price-title">{tier.title}</h3>
            <div className="price-row">
              {/*<span className="price-value">{tier.price}</span>*/}
              <span className="price-per">{tier.per}</span>
            </div>
            <p className="price-subtitle">{tier.subtitle}</p>
            <ul className="price-features">
              {tier.features.map((f) => (
                <li key={f}>
                  <span className="dash">—</span> {f}
                </li>
              ))}
            </ul>
            <Link to="/contact" className={`price-cta ${tier.popular ? 'is-filled' : ''}`}>
              {t.pricing.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="pricing-note container">{t.pricing.note}</p>
    </div>
  );
}
