import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from '../Nav/Nav.jsx';
import Footer from '../Footer/Footer.jsx';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
