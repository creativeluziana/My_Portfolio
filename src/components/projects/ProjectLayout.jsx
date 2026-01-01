import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const ProjectLayout = ({ title, subtitle = 'Case study', coverImage, children, showHero = true, fullWidth = false, showBack = true, contentPadding = 'py-12', contentGap = 'space-y-16' }) => {
  const navigate = useNavigate();
  const { scrollY } = useScroll({ layoutEffect: false });
  const y = useTransform(scrollY, [0, 600], [0, -80]);
  const blur = useTransform(scrollY, [0, 600], ['0px', '8px']);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.85]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back pill - desktop */}
      {showBack && (
        <div className="hidden md:block fixed top-6 left-6 z-50">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-colors"
          >
            ← Back to Projects
          </button>
        </div>
      )}

      {/* Hero */}
      {showHero && (
        <div className="relative overflow-hidden">
          {/* Ambient gradient shapes */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-fuchsia-500/30 blur-3xl" />
            <div className="absolute -bottom-24 -right-20 w-[28rem] h-[28rem] rounded-full bg-purple-600/30 blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto px-6 pt-20 pb-10 relative z-10">
            <p className="text-sm uppercase tracking-widest text-white/70">{subtitle}</p>
            <h1
              className="text-4xl md:text-6xl font-semibold mt-2 inline-block"
              style={{
                background: 'linear-gradient(90deg, #FFFFFF 0%, #D770D7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {title}
            </h1>

            {coverImage && (
              <motion.div style={{ y, filter: blur, opacity }} className="mt-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img src={coverImage} alt={title} className="w-full h-auto" />
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Back pill - mobile */}
      {showBack && (
        <div className="md:hidden px-6 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-block px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-colors"
          >
            ← Back to Projects
          </button>
        </div>
      )}

      {/* Content */}
      <div className={`${fullWidth ? 'w-full px-0' : 'max-w-4xl mx-auto px-6'} ${contentPadding} ${contentGap}`}>
        {children}
      </div>
    </div>
  );
};

export default ProjectLayout;



