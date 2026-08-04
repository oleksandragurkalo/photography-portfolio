import { useMemo, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { portfolioImages } from '../../data/portfolioImages.js';
import './Portfolio.css';

const CATEGORIES = ['all', 'portrait', 'loveStory', 'family'];

export default function Portfolio() {
  const { t } = useLanguage();
  const [active, setActive] = useState('all');

  const visible = useMemo(
    () => (active === 'all' ? portfolioImages : portfolioImages.filter((img) => img.category === active)),
    [active],
  );

  return (
    <div className="portfolio">
      <div className="page-head">
        <p className="kicker">{t.portfolio.kicker}</p>
        <h1 className="headline-italic">{t.portfolio.headline}</h1>
      </div>

      <div className="portfolio-filters container">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`portfolio-filter ${active === cat ? 'is-active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {t.portfolio.filters[cat]}
          </button>
        ))}
      </div>

      <div className="gallery container">
        {visible.map((img, i) => (
          <div className="gallery-item" key={img.src}>
            <img src={img.src} alt="" loading={i < 3 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>
    </div>
  );
}
