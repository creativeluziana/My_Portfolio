import React from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { wrap } from '@motionone/utils';

const technologies = [
  // Row 1
  { name: 'NEXT JS', logo: '/Logos/js.png', color: 'bg-transparent', originalIcon: '/Logos/js.png' },
  { name: 'REACT', logo: '/Logos/react.png', color: 'bg-transparent', originalIcon: '/Logos/react.png' },
  { name: 'PYTHON', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'JAVA', logo: '/Logos/java.png', color: 'bg-transparent', originalIcon: '/Logos/java.png' },
  { name: 'VITE', logo: '/Logos/js.png', color: 'bg-transparent', originalIcon: '/Logos/js.png' },
  { name: 'REACT', logo: '/Logos/react.png', color: 'bg-transparent', originalIcon: '/Logos/react.png' },
  { name: 'PYTHON', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  // Row 2
  { name: 'JAVA', logo: '/Logos/java.png', color: 'bg-transparent', originalIcon: '/Logos/java.png' },
  { name: 'NEXT JS', logo: '/Logos/js.png', color: 'bg-transparent', originalIcon: '/Logos/js.png' },
  { name: 'REACT', logo: '/Logos/react.png', color: 'bg-transparent', originalIcon: '/Logos/react.png' },
  { name: 'PYTHON', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'JAVA', logo: '/Logos/java.png', color: 'bg-transparent', originalIcon: '/Logos/java.png' },
  { name: 'VITE', logo: '/Logos/js.png', color: 'bg-transparent', originalIcon: '/Logos/js.png' },
  // Row 3
  { name: 'REACT', logo: '/Logos/react.png', color: 'bg-transparent', originalIcon: '/Logos/react.png' },
  { name: 'PYTHON', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: 'bg-transparent', originalIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'JAVA', logo: '/Logos/java.png', color: 'bg-transparent', originalIcon: '/Logos/java.png' },
  { name: 'NEXT JS', logo: '/Logos/js.png', color: 'bg-transparent', originalIcon: '/Logos/js.png' },
  { name: 'REACT', logo: '/Logos/react.png', color: 'bg-transparent', originalIcon: '/Logos/react.png' },
  { name: 'VITE', logo: '/Logos/js.png', color: 'bg-transparent', originalIcon: '/Logos/js.png' }
];

const row1 = technologies.slice(0, 7);
const row2 = technologies.slice(7, 13);
const row3 = technologies.slice(13, 19);

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
                alt="Figma Logo"
                className="w-12 h-12 object-contain"
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
