import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { findShoot } from '../../data/portfolioImages.js';
import heroFamily from '../../assets/images/family/cheek-kiss.jpg';
import heroFamily1 from '../../assets/images/family/varvara-03.jpg';
import heroFamily2 from '../../assets/images/family/varvara-07.jpg';
import './Home.css';

const HERO_IMAGES = [heroFamily, heroFamily1, heroFamily2];
const SLIDE_INTERVAL_MS = 4000;

const HIGHLIGHTS = [
  { category: 'loveStory', shootId: 'daryna-oleksii' },
  { category: 'portrait', shootId: 'mariia' },
  { category: 'family', shootId: 'urodyny-varvary' },
];

export default function Home() {
  const { t } = useLanguage();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => {
      setSlide((i) => (i + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const highlights = HIGHLIGHTS.map(({ category, shootId }) => ({
    category,
    shoot: findShoot(category, shootId),
  })).filter((h) => h.shoot);

  return (
    <div className="home">
      <div className="hero">
        {HERO_IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`hero-slide ${i === slide ? 'is-active' : ''}`}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="kicker">{t.home.kicker}</p>
          <h1 className="headline-italic">{t.home.headline}</h1>
        </div>
      </div>

      <Link to="/portfolio" className="highlights-title container">
        Portfolio
      </Link>

      <div className="highlights container">
        {highlights.map(({ category, shoot }) => (
          <Link to={`/portfolio?category=${category}&shoot=${shoot.id}`} className="highlight-tile" key={shoot.id}>
            <span className="highlight-imgbox">
              {shoot.photos[0]?.src && <img src={shoot.photos[0].src} alt="" loading="lazy" />}
            </span>
            <span className="highlight-label">{shoot.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
