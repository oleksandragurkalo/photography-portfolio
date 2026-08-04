import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from '../Nav/Nav.jsx';
import Footer from '../Footer/Footer.jsx';
import BackToTop from '../BackToTop/BackToTop.jsx';

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
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
