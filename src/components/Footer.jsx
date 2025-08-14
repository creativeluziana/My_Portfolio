import React from 'react';

export default function Footer() {
  return (
    <footer
      className="relative w-full px-6 pt-8 pb-24 text-black"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Vertical lines background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: '#000',
          backgroundImage:
            'repeating-linear-gradient(to right, rgba(255,255,255,0.08) 0 1px, transparent 1px 20px)',
          backgroundSize: '20px 100%',
          backgroundPosition: '0 0'
        }}
      ></div>

      {/* Big name & year */}
      <div className="flex flex-col leading-none text-white">
        <h1 className="text-[9vw] font-bold tracking-tight">LUZIANA DMELLO</h1>
        <div className="flex items-center space-x-2">
          <span className="text-[9vw] font-bold tracking-tight">2025</span>
          {/* Copyright icon in circle */}
          <span className="w-[9vw] h-[9vw] border-4 border-white flex items-center justify-center rounded-full">
            <span className="text-[6vw] font-bold">©</span>
          </span>
        </div>
      </div>

      {/* Social links */}
      <div className="flex flex-wrap gap-8 mt-4 text-sm font-light text-white">
        <a href="luzian.vellen@gmail.com" className="hover:underline">Email</a>
        <a href="https://www.linkedin.com/in/luziana-d-mello-262bb6307/" className="hover:underline">LinkedIn</a>
        <a href="https://github.com/creativeluziana" className="hover:underline">Github</a>
        <a href="https://www.behance.net/luzianadmello" className="hover:underline">Behance</a>
        <a href="https://dribbble.com/luzianadmello" className="hover:underline">Dribble</a>
      </div>
    </footer>
  );
}
