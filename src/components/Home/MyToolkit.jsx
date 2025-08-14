import React from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { wrap } from '@motionone/utils';

const technologies = [
  // ROW 1
  { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg' },
  { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg' },
  { name: 'FIGMA', logo: '/Logos/figma.png', color: 'bg-transparent', originalIcon: '/Logos/figma.png' },
  { name: 'FRAMER', logo: '/Logos/Framer.png', color: 'bg-transparent', originalIcon: '/Logos/Framer.png' },
  { name: 'WEBFLOW', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webflow/webflow-original.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webflow/webflow-original.svg' },
  { name: 'SPLINE', logo: '/Logos/Spline.png', color: 'bg-transparent', originalIcon: '/Logos/Spline.png' },
  { name: 'CANVA', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
  // ROW 2
  { name: 'JAVASCRIPT', logo: '/Logos/js.png', color: 'bg-transparent', originalIcon: '/Logos/js.png' },
  { name: 'TAILWIND', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'NEXTJS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'REACT', logo: '/Logos/react.png', color: 'bg-transparent', originalIcon: '/Logos/react.png' },
  { name: 'FLUTTER', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'NODE', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'EXPRESS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', forceWhite: true },
  // ROW 3
  { name: 'PYTHON', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'JAVA', logo: '/Logos/java.png', color: 'bg-transparent', originalIcon: '/Logos/java.png' },
  { name: 'MONGO DB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'POSTGRESQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'FLASK', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', forceWhite: true },
  { name: 'TYPESCRIPT', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' }
];

const row1 = technologies.slice(0, 7);
const row2 = technologies.slice(7, 14);
const row3 = technologies.slice(14, 21);

function ParallaxRow({ cards, baseVelocity }) {
  // Detect mobile screen
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  // Use gentler spring settings for mobile
  const springConfig = isMobile
    ? { damping: 80, stiffness: 120 }
    : { damping: 50, stiffness: 400 };
  // Use higher base velocity for mobile to make it faster
  const effectiveBaseVelocity = isMobile ? baseVelocity * 1.5 : baseVelocity;

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, springConfig);
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // The wrap range should be based on the number of cards and their width
  const x = useTransform(baseX, (v) => `${wrap(-40, -80, v)}%`);

  const directionFactor = React.useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * effectiveBaseVelocity * (delta / 1000);
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  // Repeat cards enough times for seamless loop
  const repeated = [...cards, ...cards, ...cards, ...cards];

  return (
    <div className="parallax overflow-hidden w-full">
      <motion.div className="scroller flex gap-6" style={{ x }}>
        {repeated.map((tech, idx) => (
          <div
            key={idx}
            className="toolkit-card flex-shrink-0 bg-white/5 backdrop-blur-sm rounded-xl p-6 text-white transition-all duration-300 border-2 border-white/50 flex items-center space-x-4 min-w-[220px] relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-lg flex items-center justify-center">
              <img
                src={tech.originalIcon}
                alt={tech.name}
                className={`w-12 h-12 object-contain ${tech.forceWhite ? 'invert' : ''}`}
              />
            </div>
            <span
              className="text-lg lg:text-xl leading-relaxed font-normal"
              style={{
                lineHeight: '1.6',
                wordSpacing: '0.05em',
                letterSpacing: '0.01em'
              }}
            >
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const MyToolkit = () => {
  return (
    <section className="min-h-screen bg-black relative">
      {/* Vertical Lines Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(90deg, rgba(165, 165, 165, 0.5) 1px, transparent 1px)',
          backgroundSize: '20px 1px',
          backgroundPosition: '16px 0'
        }}></div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto py-20 relative z-10">
        <div className="text-center">
          {/* Title */}
          <h1
            className="inline-block text-5xl lg:text-6xl font-medium mb-4"
            style={{
              background: 'linear-gradient(90deg, #FFFFFF 0%, #D770D7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            My Toolkit
          </h1>
          {/* Subtitle */}
          <p className="text-white text-lg lg:text-xl mb-12">
            Everything I use to build, create, and ship.
          </p>
          {/* Parallax Card Rows */}
          <div className="space-y-6">
            <ParallaxRow cards={row1} baseVelocity={-2} />
            <ParallaxRow cards={row2} baseVelocity={2} />
            <ParallaxRow cards={row3} baseVelocity={-2} />
          </div>
        </div>
      </div>
      {/* Custom scrollbar styles */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .parallax {
          width: 100%;
          overflow: hidden;
        }
        .toolkit-card {
          position: relative;
          transition: all 0.3s ease;
        }
        .toolkit-card:hover {
          border-color: #D770D7;
        }
      `}</style>
    </section>
  );
};

export default MyToolkit;
