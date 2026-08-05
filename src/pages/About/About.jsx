import { useLanguage } from '../../i18n/LanguageContext.jsx';
import aboutPhoto from '../../assets/images/about.jpg';
import './About.css';

export default function About() {
  const { t } = useLanguage();
  const { about } = t;

  return (
    <div className="about container">
      <div className="about-photo">
        <img src={aboutPhoto} alt={about.name} />
      </div>

      <div className="about-content">
        <p className="kicker">{about.kicker}</p>
        <h2 className="about-name">{about.name}</h2>

        {about.paragraphs.map((p) => (
          <p className="about-p" key={p}>
            {p}
          </p>
        ))}

        <div className="about-facts">
          <div className="about-fact">
            <p className="about-fact-label">{about.facts.basedInLabel}</p>
            <p className="about-fact-value">{about.facts.basedInValue}</p>
          </div>
          <div className="about-fact">
            <p className="about-fact-label">{about.facts.availableForLabel}</p>
            <p className="about-fact-value">{about.facts.availableForValue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
