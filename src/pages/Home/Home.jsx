import { useLanguage } from '../../i18n/LanguageContext.jsx';
import goldenHour from '../../assets/images/golden-hour-love-story-04.jpg';
import windowLight from '../../assets/images/portrait-window-light-02.jpg';
import quietMoments from '../../assets/images/golden-hour-love-story-03.jpg';
import './Home.css';

const images = [goldenHour, windowLight, quietMoments];

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="home">
      <div className="page-head">
        <p className="kicker">{t.home.kicker}</p>
        <h1 className="headline-italic">{t.home.headline}</h1>
      </div>

      <div className="featured container">
        {t.home.featured.map((item, i) => (
          <figure className="featured-item" key={item.caption}>
            <div className="featured-imgbox">
              <img src={images[i]} alt={item.caption} loading={i === 0 ? 'eager' : 'lazy'} />
            </div>
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
