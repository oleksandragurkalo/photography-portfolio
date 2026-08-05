import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { shoots, shootsByCategory, findShoot } from '../../data/portfolioImages.js';
import Lightbox from '../../components/Lightbox/Lightbox.jsx';
import './Portfolio.css';

const CATEGORIES = Object.keys(shoots);

export default function Portfolio() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openIndex, setOpenIndex] = useState(null);

  const categoryParam = searchParams.get('category');
  const category = CATEGORIES.includes(categoryParam) ? categoryParam : null;

  const shootParam = searchParams.get('shoot');
  const shoot = category ? findShoot(category, shootParam) : null;

  const shootsInCategory = useMemo(() => (category ? shootsByCategory(category) : []), [category]);

  function openCategory(cat) {
    setOpenIndex(null);
    setSearchParams({ category: cat });
  }

  function openShoot(shootId) {
    setOpenIndex(null);
    setSearchParams({ category, shoot: shootId });
  }

  function backToCategories() {
    setOpenIndex(null);
    setSearchParams({}, { replace: true });
  }

  function backToShoots() {
    setOpenIndex(null);
    setSearchParams({ category }, { replace: true });
  }

  return (
    <div className="portfolio">
      <div className="page-head">
        <p className="kicker">{t.portfolio.kicker}</p>
        <h1 className="headline-italic">{t.portfolio.headline}</h1>
      </div>

      {!category && (
        <div className="portfolio-covers container">
          {CATEGORIES.map((cat) => {
            const cover = shootsByCategory(cat)[0]?.photos[0]?.src;
            return (
              <button type="button" className="cover-tile" key={cat} onClick={() => openCategory(cat)}>
                <span className="cover-imgbox">{cover && <img src={cover} alt="" loading="lazy" />}</span>
                <span className="cover-label">{t.portfolio.filters[cat]}</span>
              </button>
            );
          })}
        </div>
      )}

      {category && !shoot && (
        <>
          <div className="portfolio-back container">
            <button type="button" className="back-link" onClick={backToCategories}>
              ← {t.portfolio.back}
            </button>
          </div>

          <div className="portfolio-covers container">
            {shootsInCategory.map((s) => (
              <button type="button" className="cover-tile" key={s.id} onClick={() => openShoot(s.id)}>
                <span className="cover-imgbox">
                  {s.photos[0]?.src && <img src={s.photos[0].src} alt="" loading="lazy" />}
                </span>
                <span className="cover-label">{s.name}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {category && shoot && (
        <>
          <div className="portfolio-back container">
            <button type="button" className="back-link" onClick={backToShoots}>
              ← {t.portfolio.backToShoots}
            </button>
          </div>

          <div className="gallery container">
            {shoot.photos.map((img, i) => (
              <button
                type="button"
                className="gallery-item"
                key={img.src}
                onClick={() => setOpenIndex(i)}
                aria-label={shoot.name}
              >
                <img src={img.src} alt="" loading={i < 3 ? 'eager' : 'lazy'} />
              </button>
            ))}
          </div>
        </>
      )}

      {shoot && openIndex !== null && (
        <Lightbox images={shoot.photos} startIndex={openIndex} label={shoot.name} onClose={() => setOpenIndex(null)} />
      )}
    </div>
  );
}
