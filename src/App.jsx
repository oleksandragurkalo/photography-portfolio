import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import Home from './pages/Home/Home.jsx';
import Portfolio from './pages/Portfolio/Portfolio.jsx';
import About from './pages/About/About.jsx';
import Packages from './pages/Packages/Packages.jsx';
import Contact from './pages/Contact/Contact.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
