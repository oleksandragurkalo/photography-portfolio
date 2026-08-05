import { Outlet, useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import Nav from '../Nav/Nav.jsx';
import Footer from '../Footer/Footer.jsx';
import BackToTop from '../BackToTop/BackToTop.jsx';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.jsx';

function PageError() {
  const { t } = useLanguage();
  return (
    <div className="page-error container">
      <p className="headline-italic">{t.common.pageError.title}</p>
      <p className="page-error-body">{t.common.pageError.body}</p>
      <Link to="/" className="page-error-cta">
        {t.common.pageError.cta}
      </Link>
    </div>
  );
}

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return undefined;

    const root = document.documentElement;
    const syncViewportVars = () => {
      root.style.setProperty('--vv-top', `${vv.offsetTop}px`);
      root.style.setProperty('--vv-height', `${vv.height}px`);
    };

    syncViewportVars();
    vv.addEventListener('resize', syncViewportVars);
    vv.addEventListener('scroll', syncViewportVars);
    return () => {
      vv.removeEventListener('resize', syncViewportVars);
      vv.removeEventListener('scroll', syncViewportVars);
    };
  }, []);

  useEffect(() => {
    if (/Telegram/i.test(navigator.userAgent)) {
      document.documentElement.classList.add('is-inapp-chrome');
    }
  }, []);

  return (
    <div className="site-shell">
      <div className="inapp-chrome-mask" aria-hidden="true" />
      <Nav />
      <main className="site-main">
        <ErrorBoundary key={location.pathname} fallback={<PageError />}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
