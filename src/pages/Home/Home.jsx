import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { imagesByCategory } from '../../data/portfolioImages.js';
import Lightbox from '../../components/Lightbox/Lightbox.jsx';
import goldenHour from '../../assets/images/love-story/golden-hour-04.jpg';
import windowLight from '../../assets/images/portrait/window-light-02.jpg';
import quietMoments from '../../assets/images/love-story/golden-hour-03.jpg';
import './Home.css';

const FEATURED = [
  { src: goldenHour, category: 'loveStory' },
  { src: windowLight, category: 'portrait' },
  { src: quietMoments, category: 'loveStory' },
];

export default function Home() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const openSession = openIndex !== null ? FEATURED[openIndex] : null;
  const sessionImages = openSession ? imagesByCategory(openSession.category) : [];
  const startIndex = openSession
    ? Math.max(sessionImages.findIndex((img) => img.src === openSession.src), 0)
    : 0;

  return (
    <div className="home">
      <div className="page-head">
        <p className="kicker">{t.home.kicker}</p>
        <h1 className="headline-italic">{t.home.headline}</h1>
      </div>

      <div className="featured container">
        {t.home.featured.map((item, i) => (
          <figure className="featured-item" key={item.caption}>
            <button
              type="button"
              className="featured-imgbox"
              onClick={() => setOpenIndex(i)}
              aria-label={item.caption}
            >
              <img src={FEATURED[i].src} alt={item.caption} loading={i === 0 ? 'eager' : 'lazy'} />
            </button>
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>

      {openSession && (
        <Lightbox
          images={sessionImages}
          startIndex={startIndex}
          label={t.portfolio.filters[openSession.category]}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </div>
  );
}
