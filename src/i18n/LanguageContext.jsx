import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { translations } from './translations';

const STORAGE_KEY = 'bk-lang';
const LanguageContext = createContext(null);

function getInitialLang() {
  if (typeof window === 'undefined') return 'ua';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'ua' || stored === 'pl') return stored;
  return navigator.language?.toLowerCase().startsWith('pl') ? 'pl' : 'ua';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  const changeLang = useCallback((next) => {
    setLang(next);
    window.localStorage.setItem(STORAGE_KEY, next);
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