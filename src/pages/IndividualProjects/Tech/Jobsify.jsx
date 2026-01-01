import React, { useState, useRef, useEffect } from "react";
import ProjectLayout from "../../../components/projects/ProjectLayout";

// Hero carousel images (Jobsify)
import J1 from "../../../assets/6Jobsify/Jobsify1.png";
import J2 from "../../../assets/6Jobsify/Jobsify2.png";
import J3 from "../../../assets/6Jobsify/Jobsify3.png";
import J4 from "../../../assets/6Jobsify/Jobsify4.png";
import J5 from "../../../assets/6Jobsify/Jobsify5.png";
import ResultsImg from "../../../assets/Projects/Jobsify.png";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer";

const Jobsify = () => {
  const navigate = useNavigate();
  // Slides
  const images = [
    { src: J1, alt: "Jobsify 1" },
    { src: J2, alt: "Jobsify 2" },
    { src: J3, alt: "Jobsify 3" },
    { src: J4, alt: "Jobsify 4" },
    { src: J5, alt: "Jobsify 5" },
    { src: J1, alt: "Jobsify 1 repeat" },
  ];

  const tags = ["Web Design", "Web Development"];
  const visitUrl = "https://bayside-frontend-new-1.vercel.app/";
  const tech = [
    { icon: "/Logos/figma.png", label: "Figma" },
  ];

  // Carousel state (infinite, with clones)
  const [position, setPosition] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const isSnapping = useRef(false);
  const touchStartX = useRef(null);
  const imagesWithClones = [images[images.length - 1], ...images, images[0]];
  const activeIndex = (position - 1 + images.length) % images.length;
  const goTo = (i) => setPosition(i + 1);
  const next = () => setPosition((p) => p + 1);
  const prev = () => setPosition((p) => p - 1);

  // Preload images
  useEffect(() => {
    images.forEach((img) => {
      const preloadImg = new Image();
      preloadImg.src = img.src;
    });
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSnapping.current) next();
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [position]);

  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) (diff < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <ProjectLayout title="Jobsify" subtitle="Tech project" showHero={false} showBack={false} fullWidth={true} contentPadding="py-0" contentGap="space-y-0">
      <div className="relative isolate rounded-3xl p-4 sm:p-6 md:p-8">
        <div className="absolute inset-0 -z-10 rounded-3xl opacity-40" style={{ backgroundImage: "linear-gradient(90deg, rgba(165,165,165,0.5) 1px, transparent 1px)", backgroundSize: "20px 1px", backgroundPosition: "16px 0" }}></div>

        {/* Go back */}
        <div className="mb-4">
          <button onClick={() => navigate(-1)} className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10">← Go back to Projects</button>
        </div>

        {/* Carousel */}
        <section className="relative w-full">
          <div className="pointer-events-none absolute -bottom-6 left-1/2 h-24 w-[80%] -translate-x-1/2 rounded-full bg-black/40 blur-2xl" />
          <div className="relative overflow-hidden bg-neutral-900 shadow-2xl" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} aria-label="Jobsify preview carousel">
            <div className="relative w-full pt-[56.25%]">
              <div
                className={`absolute inset-0 flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                style={{ transform: `translateX(-${position * 100}%)` }}
                onTransitionEnd={() => {
                  if (position === 0) {
                    isSnapping.current = true;
                    setIsTransitioning(false);
                    setPosition(images.length);
                    requestAnimationFrame(() => {
                      setIsTransitioning(true);
                      isSnapping.current = false;
                    });
                  } else if (position === images.length + 1) {
                    isSnapping.current = true;
                    setIsTransitioning(false);
                    setPosition(1);
                    requestAnimationFrame(() => {
                      setIsTransitioning(true);
                      isSnapping.current = false;
                    });
                  }
                }}
              >
                {imagesWithClones.map((img, i) => (
                  <div key={i} className="min-w-full">
                    <img src={img.src} alt={img.alt} className="h-full w-full object-cover" loading={i === 1 ? "eager" : "lazy"} />
                  </div>
                ))}
              </div>
            </div>

            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white hover:bg-black/70 focus:outline-none" aria-label="Previous image">‹</button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white hover:bg-black/70 focus:outline-none" aria-label="Next image">›</button>

            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {images.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} className={`h-1.5 w-6 rounded-full transition-all ${i === activeIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"}`} aria-label={`Go to slide ${i + 1}`} />
              ))}
            </div>
          </div>
        </section>

        {/* Title + CTA + tags */}
        <section className="mx-auto mt-10 flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-5xl lg:text-6xl font-medium" style={{ background: 'linear-gradient(90deg, #FFFFFF 0%, #D770D7 50%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Jobsify</h1>
          <a href={visitUrl} target="_blank" rel="noreferrer" className="self-start rounded-full border-2 border-white/50 bg-white/5 backdrop-blur-sm px-7 py-3 text-base font-medium text-white transition hover:border-fuchsia-400">Visit Website</a>
        </section>

        <section className="mx-auto mt-3 max-w-5xl">
          <div className="flex flex-wrap gap-3">{tags.map((t) => (<span key={t} className="rounded-full border border-white/25 px-4 py-2 text-sm text-white/90">{t}</span>))}</div>
          <p className="mt-4 max-w-3xl text-xl lg:text-2xl leading-relaxed text-gray-300">
            <strong>Mini job board & application tracker.</strong>
          </p>
          <ul className="mt-4 list-disc pl-6 text-gray-300 space-y-2 max-w-3xl">
            <li>Postings with tags/filters, saved jobs, and email alerts.</li>
            <li>Candidate profile + resume upload; basic parsing for quick apply.</li>
            <li>Employer dashboard: post, manage applicants, status updates.</li>
            <li>Optional: webhook to Slack/Email for new applications.</li>
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="mx-auto mt-8 max-w-5xl">
          <h3 className="text-3xl lg:text-4xl font-normal text-white">Tech Stack</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tech.map((t, i) => (
              <div key={`${t.label}-${i}`} className="flex items-center gap-4 rounded-xl border-2 border-white/50 bg-white/5 backdrop-blur-sm p-6 transition hover:border-fuchsia-400">
                <div className="flex h-14 w-14 items-center justify-center"><img src={t.icon} alt="" className="h-12 w-12 object-contain" loading="lazy" /></div>
                <span className="text-lg lg:text-xl leading-relaxed font-normal text-white" style={{ lineHeight: '1.6', wordSpacing: '0.05em', letterSpacing: '0.01em' }}>{t.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Results */}
        <section className="mx-auto mt-12 max-w-5xl">
          <h3 className="text-3xl lg:text-4xl font-normal text-white mb-3">Results</h3>
          <div className="border border-white/10 bg-white/5"><img src={ResultsImg} alt="Results" className="w-full h-auto object-contain" /></div>
        </section>
      </div>

      {/* Full-width CTA */}
      <section className="relative bg-black py-16 sm:py-20">
        <div className="absolute inset-0 opacity-40">
          <div className="h-full w-full" style={{ backgroundImage: 'linear-gradient(90deg, rgba(165, 165, 165, 0.5) 1px, transparent 1px)', backgroundSize: '20px 1px', backgroundPosition: '16px 0' }}></div>
        </div>
        <div className="relative z-10 px-4">
          <div className="mx-auto max-w-5xl text-center rounded-xl border-2 border-white/50 bg-white/5 backdrop-blur-sm p-8 sm:p-12 transition hover:border-fuchsia-400">
            <h3 className="text-4xl lg:text-6xl font-medium mb-6" style={{ background: 'linear-gradient(90deg, #FFFFFF 0%, #D770D7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Got a project idea in mind?</h3>
            <Link to="/contact" className="inline-block rounded-full border-2 border-white/50 bg-white/5 backdrop-blur-sm px-6 py-2 text-white transition hover:border-fuchsia-400">Get in Touch</Link>
          </div>
        </div>
      </section>
      <Footer />
    </ProjectLayout>
  );
};

export default Jobsify;


