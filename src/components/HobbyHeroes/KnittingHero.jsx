import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import KnittingBgImg from '../../assets/Knitting_Bg.png';
import KnittingGalImg from '../../assets/Knitting_Galpng.png';

const KnittingHero = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const desktopImgContainerRef = useRef(null);
  const mobileImgContainerRef = useRef(null);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const texts = ['Designer', 'Developer', 'Vibe Coder'];
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseTime = 2000;

  useEffect(() => {
    const currentWord = texts[currentIndex];
    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        return;
      }
      const timeout = setTimeout(() => {
        setCurrentText(currentText.slice(0, -1));
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    } else {
      if (currentText === currentWord) {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => {
        setCurrentText(currentWord.slice(0, currentText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [currentText, currentIndex, isDeleting, texts]);

  // Parallax effect for desktop
  const { scrollYProgress: desktopScrollY } = useScroll({
    target: desktopImgContainerRef,
    offset: ['start end', 'end start']
  });
  const desktopParallaxY = useTransform(desktopScrollY, [0, 1], [0, 30]);
  
  // Parallax effect for mobile (more subtle)
  const { scrollYProgress: mobileScrollY } = useScroll({
    target: mobileImgContainerRef,
    offset: ['start end', 'end start']
  });
  const mobileParallaxY = useTransform(mobileScrollY, [0, 1], [0, 15]);

  return (
    <section 
      className="min-h-screen relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${KnittingBgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-between max-w-7xl relative z-10">
        {/* Mobile Layout - Character at Top */}
        <div ref={mobileImgContainerRef} className="lg:hidden flex-1 flex justify-center items-center mb-8 overflow-hidden relative">
          <motion.img 
            src={KnittingGalImg} 
            alt="Knitting Character" 
            style={{
              height: '50vh',
              width: 'auto',
              maxWidth: 'none',
              objectFit: 'contain',
              y: isMobile ? mobileParallaxY : 0
            }}
            className="object-contain"
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          />
        </div>

        {/* Text Content - Mobile First */}
        <div className="flex-1 text-white z-10 text-center lg:text-left lg:pr-8">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-cursive text-white mb-4 drop-shadow-2xl whitespace-nowrap">
              Luziana Dmello
            </h1>
            <p className="text-2xl md:text-4xl lg:text-6xl text-white mb-8 drop-shadow-lg">
              is a {currentText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
          <div className="w-full flex flex-row items-start justify-start gap-6 lg:gap-12 px-2">
            <div className="relative flex items-end pl-2 lg:flex-row-reverse">
              <div className="flex flex-col justify-end h-20 sm:h-24 md:h-28 lg:h-40 max-[400px]:h-[220px] mr-3 lg:mr-0 lg:ml-3">
                <div className="flex flex-col space-y-1 text-right lg:text-left">
                  <span className="text-white text-xl sm:text-xl md:text-2xl lg:text-3xl drop-shadow-lg">who</span>
                  <span className="text-white text-xl sm:text-xl md:text-2xl lg:text-3xl drop-shadow-lg">likes</span>
                </div>
              </div>
              <div className="w-[3px] lg:w-1 h-20 sm:h-24 md:h-28 lg:h-40 max-[400px]:h-[220px] bg-white drop-shadow-lg"></div>
            </div>
            <div className="flex flex-col space-y-1 text-left ml-2">
              <Link to="/" className="text-white text-2xl sm:text-2xl md:text-2xl lg:text-3xl drop-shadow-lg hover:text-purple-200 transition-colors cursor-pointer">HOME</Link>
              <Link to="/painting" className="text-white text-2xl sm:text-2xl md:text-2xl lg:text-3xl drop-shadow-lg hover:text-purple-200 transition-colors cursor-pointer">PAINTING</Link>
              <Link to="/calligraphy" className="text-white text-2xl sm:text-2xl md:text-2xl lg:text-3xl drop-shadow-lg hover:text-purple-200 transition-colors cursor-pointer">CALLIGRAPHY</Link>
              <Link to="/coding" className="text-white text-2xl sm:text-2xl md:text-2xl lg:text-3xl drop-shadow-lg hover:text-purple-200 transition-colors cursor-pointer">CODING</Link>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Character on Right */}
        <div ref={desktopImgContainerRef} className="hidden lg:flex flex-1 justify-center items-center min-h-screen overflow-hidden relative">
          <motion.img 
            src={KnittingGalImg} 
            alt="Knitting Character" 
            style={{
              height: '80vh',
              width: 'auto',
              maxWidth: 'none',
              objectFit: 'contain',
              y: desktopParallaxY
            }}
            className="object-contain"
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          />
        </div>
      </div>
    </section>
  );
};

export default KnittingHero;
