import { useLanguage } from '../../i18n/LanguageContext.jsx';
import weddingGoldenHour01 from '../../assets/images/wedding-golden-hour-01.jpg';
import portraitTerracotta from '../../assets/images/portrait-terracotta-wall.jpg';
import familyStorytime from '../../assets/images/family-storytime.jpg';
import weddingGoldenHour02 from '../../assets/images/wedding-golden-hour-02.jpg';
import portraitWindowLight01 from '../../assets/images/portrait-window-light-01.jpg';
import weddingSunsetEmbrace from '../../assets/images/wedding-sunset-embrace.jpg';
import familyCheekKiss from '../../assets/images/family-cheek-kiss.jpg';
import portraitWindowLight02 from '../../assets/images/portrait-window-light-02.jpg';
import weddingGoldenHour03 from '../../assets/images/wedding-golden-hour-03.jpg';
import goldenHourLoveStory01 from '../../assets/images/golden-hour-love-story-01.jpg';
import goldenHourLoveStory02 from '../../assets/images/golden-hour-love-story-02.jpg';
import goldenHourLoveStory03 from '../../assets/images/golden-hour-love-story-03.jpg';
import goldenHourLoveStory04 from '../../assets/images/golden-hour-love-story-04.jpg';
import goldenHourLoveStory05 from '../../assets/images/golden-hour-love-story-05.jpg';
import goldenHourLoveStory06 from '../../assets/images/golden-hour-love-story-06.jpg';
import goldenHourLoveStory07 from '../../assets/images/golden-hour-love-story-07.jpg';
import goldenHourLoveStory08 from '../../assets/images/golden-hour-love-story-08.jpg';
import goldenHourLoveStory09 from '../../assets/images/golden-hour-love-story-09.jpg';
import goldenHourLoveStory10 from '../../assets/images/golden-hour-love-story-10.jpg';
import './Portfolio.css';

// Deliberately interleaved — the portfolio is one continuous flow, not split by shoot type.
const images = [
  weddingGoldenHour02,
  portraitWindowLight01,
  weddingSunsetEmbrace,
  goldenHourLoveStory06,
  goldenHourLoveStory07,
  familyStorytime,
  goldenHourLoveStory08,
  goldenHourLoveStory09,
  weddingGoldenHour01,
  portraitTerracotta,
  goldenHourLoveStory10,
  familyCheekKiss,
  portraitWindowLight02,
  weddingGoldenHour03,
  goldenHourLoveStory01,
  goldenHourLoveStory02,
  goldenHourLoveStory03,
  goldenHourLoveStory04,
  goldenHourLoveStory05,
];

export default function Portfolio() {
  const { t } = useLanguage();

  return (
    <div className="portfolio">
      <div className="page-head">
        <p className="kicker">{t.portfolio.kicker}</p>
        <h1 className="headline-italic">{t.portfolio.headline}</h1>
      </div>

      <div className="gallery container">
        {images.map((src, i) => (
          <div className="gallery-item" key={src}>
            <img src={src} alt="" loading={i < 3 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>
    </div>
  );
}
