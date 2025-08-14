import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import BaysideSports from './pages/IndividualProjects/Tech/BaysideSports';
import FluxurousTech from './pages/IndividualProjects/Tech/FluxuriousTech';
import RAE from './pages/IndividualProjects/Tech/RAE';
import Studex from './pages/IndividualProjects/Tech/Studex';
import Experiences from './pages/Experiences';
import Contact from './pages/Contact';
import Painting from './pages/Painting';
import Calligraphy from './pages/Calligraphy';
import Coding from './pages/Coding';
import Knitting from './pages/Knitting';
import Jobsify from './pages/IndividualProjects/Tech/Jobsify';
import FaceTransform from './pages/IndividualProjects/Tech/FaceTransform';
import B4USchools from './pages/IndividualProjects/Tech/B4USchools';
import Aarohan from './pages/IndividualProjects/Tech/Aarohan';

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

function CustomCursor() {
  const cursorRef = useRef(null);
  const requestRef = useRef();
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    const animate = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.6);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.6);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x - 16}px, ${pos.current.y - 16}px, 0)`;
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  useEffect(() => {
    const onOver = (e) => {
      // Limit custom cursor label to elements that explicitly opt-in via data-cursor-label
      const target = e.target.closest('[data-cursor-label]');
      if (target) {
        setHovered(true);
        const custom = target.getAttribute('data-cursor-label');
        setLabel(custom || '');
      } else {
        setHovered(false);
        setLabel('');
      }
    };

    const onOut = () => {
      setHovered(false);
      setLabel('');
    };

    document.addEventListener('mousemove', onOver);
    document.addEventListener('mouseleave', onOut);
    return () => {
      document.removeEventListener('mousemove', onOver);
      document.removeEventListener('mouseleave', onOut);
    };
  }, []);

  return (
    <div ref={cursorRef} className="fixed top-0 left-0 z-[9999] pointer-events-none" style={{ willChange: 'transform' }}>
      <div className={`w-3 h-3 rounded-full transition-transform duration-150 ${hovered ? 'scale-0' : 'scale-100'} bg-white mix-blend-difference`} />
      {hovered && (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <div className="px-4 py-2 rounded-full bg-pink-500 text-white text-sm font-semibold shadow-lg whitespace-nowrap">
            {label || 'View project'}
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="font-poppins">
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/projects/tech/bayside-sports" element={<BaysideSports />} />
          <Route path="/projects/tech/fluxurous-tech" element={<FluxurousTech />} />
          <Route path="/projects/tech/rae" element={<RAE />} />
          <Route path="/projects/tech/studex" element={<Studex />} />
          <Route path="/projects/tech/aarohan" element={<Aarohan />} />
          <Route path="/projects/tech/jobsify" element={<Jobsify />} />
          <Route path="/projects/tech/face-transform" element={<FaceTransform />} />
          <Route path="/projects/tech/b4u-schools" element={<B4USchools />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/painting" element={<Painting />} />
          <Route path="/calligraphy" element={<Calligraphy />} />
          <Route path="/coding" element={<Coding />} />
          <Route path="/knitting" element={<Knitting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
