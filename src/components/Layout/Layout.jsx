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

  return (
    <div className="site-shell">
      <Nav />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
