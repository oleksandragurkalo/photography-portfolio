import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { portfolioImages } from '../../data/portfolioImages.js';
import Lightbox from '../../components/Lightbox/Lightbox.jsx';
import './Portfolio.css';

const CATEGORIES = ['all', 'portrait', 'loveStory', 'family'];

export default function Portfolio() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');
  const [active, setActive] = useState(CATEGORIES.includes(initialCategory) ? initialCategory : 'all');
  const [openIndex, setOpenIndex] = useState(null);

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
          <button
            type="button"
            className="gallery-item"
            key={img.src}
            onClick={() => setOpenIndex(i)}
            aria-label={t.portfolio.filters[img.category]}
          >
            <img src={img.src} alt="" loading={i < 3 ? 'eager' : 'lazy'} />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={visible}
          startIndex={openIndex}
          label={t.portfolio.filters[active]}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </div>
  );
}
