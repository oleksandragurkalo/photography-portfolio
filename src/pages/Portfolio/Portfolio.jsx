import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { shoots, shootsByCategory, findShoot } from '../../data/portfolioImages.js';
import Lightbox from '../../components/Lightbox/Lightbox.jsx';
import './Portfolio.css';

const CATEGORIES = Object.keys(shoots);

// Sets each tile's grid-row-end span from its rendered image height, so
// grid-auto-flow: dense can pack tiles like masonry with no leftover gaps,
// regardless of photo count or aspect-ratio mix.
function useMasonryLayout(deps) {
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;

    function layoutItem(item) {
      const img = item.querySelector('img');
      if (!img) return;
      const rowHeight = parseFloat(getComputedStyle(grid).gridAutoRows);
      const marginBottom = parseFloat(getComputedStyle(item).marginBottom);
      const contentHeight = img.getBoundingClientRect().height + marginBottom;
      // Round to nearest (not up) so quantization error stays near zero on
      // average instead of compounding down a column as more tiles stack.
      const rowSpan = Math.round(contentHeight / rowHeight);
      item.style.gridRowEnd = `span ${rowSpan}`;
    }

    function layoutAll() {
      Array.from(grid.children).forEach(layoutItem);
    }

    layoutAll();

    const images = Array.from(grid.querySelectorAll('img'));
    const pendingImages = images.filter((img) => !img.complete);
    function onImageLoad(event) {
      const item = event.target.closest('.gallery-item');
      if (item) layoutItem(item);
    }
    pendingImages.forEach((img) => img.addEventListener('load', onImageLoad));

    let resizeTimer;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layoutAll, 100);
    }
    window.addEventListener('resize', onResize);

    return () => {
      pendingImages.forEach((img) => img.removeEventListener('load', onImageLoad));
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return gridRef;
}

export default function Portfolio() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openIndex, setOpenIndex] = useState(null);

  const categoryParam = searchParams.get('category');
  const category = CATEGORIES.includes(categoryParam) ? categoryParam : null;

  const shootParam = searchParams.get('shoot');
  const shoot = category ? findShoot(category, shootParam) : null;

  const shootsInCategory = useMemo(() => (category ? shootsByCategory(category) : []), [category]);

  const galleryRef = useMasonryLayout([shoot]);

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

          <div className="gallery container" ref={galleryRef}>
            {shoot.photos.map((img, i) => (
              <button
                type="button"
                className="gallery-item"
                key={img.src}
                onClick={() => setOpenIndex(i)}
                aria-label={shoot.name}
              >
                <img src={img.src} alt="" loading="eager" />
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
