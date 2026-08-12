import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { findShoot } from '../../data/portfolioImages.js';
import cheekKiss900 from '../../assets/images/family/cheek-kiss-900.webp';
import cheekKiss1920 from '../../assets/images/family/cheek-kiss-1920.webp';
import varvara03_900 from '../../assets/images/family/varvara-03-900.webp';
import varvara03_1920 from '../../assets/images/family/varvara-03-1920.webp';
import varvara07_900 from '../../assets/images/family/varvara-07-900.webp';
import varvara07_1920 from '../../assets/images/family/varvara-07-1920.webp';
import darynaOleksii900 from '../../assets/images/love-story/daryna-oleksii-01-900.webp';
import darynaOleksii1920 from '../../assets/images/love-story/daryna-oleksii-01-1920.webp';
import terracotta900 from '../../assets/images/portrait/terracotta-wall-900.webp';
import terracotta1920 from '../../assets/images/portrait/terracotta-wall-1920.webp';
import storytime900 from '../../assets/images/family/storytime-900.webp';
import storytime1920 from '../../assets/images/family/storytime-1920.webp';
import './Home.css';

const HERO_IMAGES = [
  { src: cheekKiss1920, srcSet: `${cheekKiss900} 900w, ${cheekKiss1920} 1920w` },
  { src: varvara03_1920, srcSet: `${varvara03_900} 900w, ${varvara03_1920} 1920w` },
  { src: varvara07_1920, srcSet: `${varvara07_900} 900w, ${varvara07_1920} 1920w` },
];
const SLIDE_INTERVAL_MS = 4000;

// Dedicated compressed thumbnails for the small highlight tiles, kept separate
// from the full-resolution source photos still used in the Portfolio gallery.
const HIGHLIGHTS = [
  {
    category: 'loveStory',
    shootId: 'daryna-oleksii',
    thumb: { src: darynaOleksii1920, srcSet: `${darynaOleksii900} 900w, ${darynaOleksii1920} 1920w` },
  },
  {
    category: 'portrait',
    shootId: 'mariia',
    thumb: { src: terracotta1920, srcSet: `${terracotta900} 900w, ${terracotta1920} 1920w` },
  },
  {
    category: 'family',
    shootId: 'urodyny-varvary',
    thumb: { src: storytime1920, srcSet: `${storytime900} 900w, ${storytime1920} 1920w` },
  },
];

export default function Home() {
  const { t } = useLanguage();
  const [slide, setSlide] = useState(0);
  // Only the active slide's image is fetched up front; later slides are
  // revealed (and only then downloaded) so they don't compete with the LCP
  // image and fonts for bandwidth during initial page load.
  const [revealed, setRevealed] = useState(() => new Set([0]));

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => {
      setSlide((i) => {
        const next = (i + 1) % HERO_IMAGES.length;
        setRevealed((prev) => (prev.has(next) ? prev : new Set(prev).add(next)));
        return next;
      });
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const highlights = HIGHLIGHTS.map(({ category, shootId, thumb }) => ({
    category,
    thumb,
    shoot: findShoot(category, shootId),
  })).filter((h) => h.shoot);

  return (
    <div className="home">
      <div className="hero">
        {HERO_IMAGES.map(
          (img, i) =>
            revealed.has(i) && (
              <img
                key={img.src}
                src={img.src}
                srcSet={img.srcSet}
                sizes="100vw"
                alt=""
                className={`hero-slide ${i === slide ? 'is-active' : ''}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
              />
            ),
        )}
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
        {highlights.map(({ category, shoot, thumb }) => (
          <Link to={`/portfolio?category=${category}&shoot=${shoot.id}`} className="highlight-tile" key={shoot.id}>
            <span className="highlight-imgbox">
              {thumb && (
                <img src={thumb.src} srcSet={thumb.srcSet} sizes="(max-width: 860px) 100vw, 33vw" alt="" loading="lazy" />
              )}
            </span>
            <span className="highlight-label">{shoot.name}</span>
          </Link>
        ))}
      </div>

      <div className="testimonials-head container">
        <p className="kicker">{t.home.testimonials.kicker}</p>
        <h2 className="headline-italic">{t.home.testimonials.headline}</h2>
      </div>

      <div className="testimonials-track">
        <div className="testimonials-scroller">
          {t.home.testimonials.quotes.map((quote) => (
            <blockquote className="testimonial-note" key={quote.text}>
              <span className="testimonial-tape" aria-hidden="true" />
              <p className="testimonial-text">{quote.text}</p>
              {quote.author && <footer className="testimonial-author">{quote.author}</footer>}
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  );
}
