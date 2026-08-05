import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { translations } from './translations';

const STORAGE_KEY = 'bk-lang';
const HTML_LANG = { ua: 'uk', pl: 'pl' };
const LanguageContext = createContext(null);

function getInitialLang() {
  if (typeof window === 'undefined') return 'ua';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'ua' || stored === 'pl') return stored;
  } catch {
    // localStorage can throw (private browsing, in-app browsers) — fall through.
  }
  return navigator.language?.toLowerCase().startsWith('pl') ? 'pl' : 'ua';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
  }, [lang]);

  const changeLang = useCallback((next) => {
    setLang(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Persistence is best-effort — language still switches for this session.
    }
  }, []);

  const value = useMemo(
    () => ({ lang, setLang: changeLang, t: translations[lang] }),
    [lang, changeLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}