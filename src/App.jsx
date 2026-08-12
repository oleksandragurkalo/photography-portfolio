import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import Home from './pages/Home/Home.jsx';
import { Analytics } from "@vercel/analytics/react";

const Portfolio = lazy(() => import('./pages/Portfolio/Portfolio.jsx'));
const About = lazy(() => import('./pages/About/About.jsx'));
const Packages = lazy(() => import('./pages/Packages/Packages.jsx'));
const Contact = lazy(() => import('./pages/Contact/Contact.jsx'));

export default function App() {
  return (
    <>
      <Analytics />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/portfolio"
            element={
              <Suspense fallback={null}>
                <Portfolio />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={null}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/packages"
            element={
              <Suspense fallback={null}>
                <Packages />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={null}>
                <Contact />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
