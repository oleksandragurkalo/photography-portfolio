import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../../i18n/translations.js';
import './Contact.css';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

export default function Contact() {
  const { t, lang } = useLanguage();
  const { contact } = t;
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();

    if (!FORMSPREE_ID) {
      // No Formspree form connected yet — see .env.example.
      console.warn('VITE_FORMSPREE_ID is not set; contact form cannot send.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="contact container">
      <div className="contact-info">
        <p className="kicker">{contact.kicker}</p>
        <h2 className="headline-italic contact-headline">{contact.headline}</h2>
        <p className="contact-sub">{contact.sub}</p>

        <div className="contact-facts">
          {/*<div className="contact-fact">*/}
          {/*  <p className="contact-fact-label">{contact.facts.emailLabel}</p>*/}
          {/*  <a className="contact-fact-value" href={`mailto:${CONTACT_EMAIL}`}>*/}
          {/*    {CONTACT_EMAIL}*/}
          {/*  </a>*/}
          {/*</div>*/}
          <div className="contact-fact">
            <p className="contact-fact-label">{contact.facts.locationLabel}</p>
            <p className="contact-fact-value">{contact.facts.locationValue}</p>
          </div>
          <div className="contact-fact">
            <p className="contact-fact-label">{contact.facts.instagramLabel}</p>
            <a className="contact-fact-value" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              {INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <input type="hidden" name="language" value={lang} />

        <div className="form-row">
          <div className="field">
            <label htmlFor="name">{contact.form.nameLabel}</label>
            <input id="name" name="name" type="text" required />
          </div>
          <div className="field">
            <label htmlFor="email">{contact.form.emailLabel}</label>
            <input id="email" name="email" type="email" required />
          </div>
        </div>

        <div className="field">
          <label htmlFor="sessionType">{contact.form.typeLabel}</label>
          <select id="sessionType" name="sessionType" defaultValue={contact.form.typeOptions[0]}>
            {contact.form.typeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="field field-textarea">
          <label htmlFor="vision">{contact.form.visionLabel}</label>
          <textarea id="vision" name="vision" placeholder={contact.form.visionPlaceholder} rows={4} />
        </div>

        <button type="submit" className="send-btn" disabled={status === 'sending'}>
          {status === 'sending' ? contact.form.sending : contact.form.submit}
        </button>

        {status === 'success' && <p className="form-note form-note-success">{contact.form.success}</p>}
        {status === 'error' && <p className="form-note form-note-error">{contact.form.error}</p>}
      </form>
    </div>
  );
}
