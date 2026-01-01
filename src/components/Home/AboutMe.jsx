import React, { useState, useEffect } from 'react';
import LuzianaImg from '../../assets/LuzianaDmello.jpeg';

const AboutMe = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const roles = ['UI/UX Designer', 'Web Developer', 'App Developer', 'Vibe Coder'];
  
  useEffect(() => {
    const currentRole = roles[currentIndex];
    
    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
        return;
      }
      
      setTimeout(() => {
        setCurrentText(currentText.slice(0, -1));
      }, 50);
    } else {
      if (currentText === currentRole) {
        setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
        return;
      }
      
      setTimeout(() => {
        setCurrentText(currentRole.slice(0, currentText.length + 1));
      }, 100);
    }
  }, [currentText, currentIndex, isDeleting, roles]);

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
      <div className="container mx-auto px-4 lg:px-48 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5 lg:gap-4">
          
          {/* Left Side - Image */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <div className="relative">
              {/* Circular Glow Effect */}
              <div className="absolute inset-0 w-[350px] h-[450px] lg:w-[520px] lg:h-[640px] rounded-full bg-white/20 blur-3xl transform scale-110"></div>
              
              {/* Actual Luziana Dmello image */}
              <img 
                src={LuzianaImg} 
                alt="Luziana Dmello" 
                className="relative z-10 w-[320px] h-[400px] lg:w-[480px] lg:h-[600px] object-cover shadow-2xl mb-8 lg:mb-0"
              />
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="flex-1 text-white text-left lg:text-left px-4 lg:px-0">
            <div className="space-y-6">
              {/* Title */}
              <div className="text-left lg:text-left">
                <h1 className="text-5xl lg:text-6xl font-medium mb-4" style={{
                  background: 'linear-gradient(90deg, #FFFFFF 0%, #D770D7 50%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  About Me
                </h1>
                <h2 className="text-3xl lg:text-4xl font-normal text-white">
                  {currentText}
                  <span className="animate-pulse">|</span>
                </h2>
              </div>

              {/* Paragraphs */}
              <div className="space-y-6 text-lg lg:text-xl leading-relaxed lg:leading-relaxed" style={{
                lineHeight: '1.6',
                wordSpacing: '0.05em',
                letterSpacing: '0.01em'
              }}>
                <p className="text-white text-left lg:text-left">
                  Hi, I'm Luziana D'Mello — a designer at heart and a developer by passion, 
                  currently in my final year of BE at FCRIT. I love crafting digital experiences 
                  that not only look great but feel effortless to use.
                </p>
                
                <p className="text-white text-left lg:text-left">
                  Design is my comfort zone — I enjoy working with color, layout, and interaction 
                  to build clean, intuitive interfaces. At the same time, I dive into full-stack 
                  development, bringing those designs to life with HTML, CSS, JavaScript, React, 
                  Tailwind, NextJS and backend tools like Node.js and MongoDB.
                </p>
                
                <p className="text-white text-left lg:text-left">
                  I'm always chasing that sweet spot between beauty and functionality — creating 
                  things that make life just a little smoother.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
