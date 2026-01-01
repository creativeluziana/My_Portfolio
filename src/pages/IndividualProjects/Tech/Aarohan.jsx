import React, { useState, useRef, useEffect } from "react";
import ProjectLayout from "../../../components/projects/ProjectLayout";

// Hero carousel images (Aarohan)
import A1 from "../../../assets/5Aarohan/Aarohan1.png";
import A2 from "../../../assets/5Aarohan/Aarohan2.png";
import A3 from "../../../assets/5Aarohan/Aarohan3.png";
import A4 from "../../../assets/5Aarohan/Aarohan4.png";
import A5 from "../../../assets/5Aarohan/Aarohan5.png";
import A6 from "../../../assets/5Aarohan/Aarohan6.png";
import ApproachImg from "../../../assets/5Aarohan/Approach.png";
import ResultsImg from "../../../assets/Projects/Aarohan.png";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer";

const BaysideSports = () => {
  const navigate = useNavigate();
  // ---------- EDIT THESE ----------
  const images = [
    { src: A1, alt: "Aarohan 1" },
    { src: A2, alt: "Aarohan 2" },
    { src: A3, alt: "Aarohan 3" },
    { src: A4, alt: "Aarohan 4" },
    { src: A5, alt: "Aarohan 5" },
    { src: A6, alt: "Aarohan 6" },
  ];

  const tags = ["Web Design", "Web Development"];
  const visitUrl = "https://bayside-frontend-new-1.vercel.app/"; // Update with live link if available

  const tech = [
    { icon: "/Logos/figma.png", label: "Figma" },
  ];
  // --------------------------------

  // Seamless loop carousel state
  const [position, setPosition] = useState(1); // start at first real slide (after leading clone)
  const [isTransitioning, setIsTransitioning] = useState(true);
  const isSnapping = useRef(false);
  const touchStartX = useRef(null);
  const imagesWithClones = [images[images.length - 1], ...images, images[0]];
  const activeIndex = (position - 1 + images.length) % images.length;
  const goTo = (i) => setPosition(i + 1);
  const next = () => setPosition((p) => p + 1);
  const prev = () => setPosition((p) => p - 1);

  // Preload all carousel images to prevent flashes
  useEffect(() => {
    images.forEach((img) => {
      const preloadImg = new Image();
      preloadImg.src = img.src;
    });
  }, []);

  // Auto-advance every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSnapping.current) {
        next();
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

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
    <ProjectLayout title="Bayside Sports" subtitle="Tech project" showHero={false} showBack={false} fullWidth={true} contentPadding="py-0" contentGap="space-y-0">
      {/* Background vertical lines to match design */}
      <div className="relative isolate rounded-3xl p-4 sm:p-6 md:p-8">
        <div className="absolute inset-0 -z-10 rounded-3xl opacity-40" style={{ backgroundImage: "linear-gradient(90deg, rgba(165,165,165,0.5) 1px, transparent 1px)", backgroundSize: "20px 1px", backgroundPosition: "16px 0" }}></div>

        {/* Back link (optional) */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
          >
            ← Go back to Projects
          </button>
        </div>

        {/* HERO: laptop-style frame + pedestal with carousel */}
        <section className="relative w-full">
          {/* Pedestal */}
          <div className="pointer-events-none absolute -bottom-6 left-1/2 h-24 w-[80%] -translate-x-1/2 rounded-full bg-black/40 blur-2xl" />
          <div
            className="relative overflow-hidden bg-neutral-900 shadow-2xl"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            aria-label="Bayside Sports preview carousel"
          >
            {/* Screen (no border or side gaps) */}
            <div className="relative w-full pt-[56.25%]">
              <div
                className={`absolute inset-0 flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                style={{ transform: `translateX(-${position * 100}%)` }}
                onTransitionEnd={() => {
                  // if we hit clones, snap without animation
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
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover"
                      loading={i === 1 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white hover:bg-black/70 focus:outline-none"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white hover:bg-black/70 focus:outline-none"
              aria-label="Next image"
            >
              ›
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1.5 w-6 rounded-full transition-all ${
                    i === activeIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Title + CTA + tags */}
        <section className="mx-auto mt-10 flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1
            className="text-5xl lg:text-6xl font-medium"
            style={{
              background: 'linear-gradient(90deg, #FFFFFF 0%, #D770D7 50%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Bayside Sports
          </h1>

          <a
            href={visitUrl}
            target="_blank"
            rel="noreferrer"
            className="self-start rounded-full border-2 border-white/50 bg-white/5 backdrop-blur-sm px-7 py-3 text-base font-medium text-white transition hover:border-fuchsia-400"
          >
            Visit Website
          </a>
        </section>

        <section className="mx-auto mt-3 max-w-5xl">
          <div className="flex flex-wrap gap-3">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/25 px-4 py-2 text-sm text-white/90"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="mt-4 max-w-3xl text-xl lg:text-2xl leading-relaxed text-gray-300">
            <strong>Event/initiative website</strong> for a community/college/NGO program.
          </p>
          <ul className="mt-4 list-disc pl-6 text-gray-300 space-y-2 max-w-3xl">
            <li>Hero story, schedule, event lineup, registration, and volunteer sign-ups.</li>
            <li>Sponsor/partner showcase, photo gallery, and updates/news module.</li>
            <li>Admin panel for entries, approvals, and email confirmations.</li>
            <li>Mobile-first, simple and fast.</li>
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="mx-auto mt-8 max-w-5xl">
          <h3 className="text-3xl lg:text-4xl font-normal text-white">Tech Stack</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tech.map((t, i) => (
              <div
                key={`${t.label}-${i}`}
                className="flex items-center gap-4 rounded-xl border-2 border-white/50 bg-white/5 backdrop-blur-sm p-6 transition hover:border-fuchsia-400"
              >
                <div className="flex h-14 w-14 items-center justify-center">
                  <img src={t.icon} alt="" className="h-12 w-12 object-contain" loading="lazy" />
                </div>
                <span className="text-lg lg:text-xl leading-relaxed font-normal text-white" style={{ lineHeight: '1.6', wordSpacing: '0.05em', letterSpacing: '0.01em' }}>{t.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Approach */}
        <section className="mx-auto mt-12 max-w-5xl">
          <h3 className="text-3xl lg:text-4xl font-normal text-white mb-3">Approach</h3>
          <div className="border border-white/10 bg-white/5">
            <img src={ApproachImg} alt="Approach diagram" className="w-full h-auto object-contain" />
          </div>
        </section>

        {/* Results */}
        <section className="mx-auto mt-12 max-w-5xl">
          <h3 className="text-3xl lg:text-4xl font-normal text-white mb-3">Results</h3>
          <div className="border border-white/10 bg-white/5">
            <img src={ResultsImg} alt="Bayside website result" className="w-full h-auto object-contain" />
          </div>
        </section>
      </div>
      {/* Full-width CTA section */}
      <section className="relative bg-black py-16 sm:py-20">
        {/* Vertical lines background */}
        <div className="absolute inset-0 opacity-40">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(90deg, rgba(165, 165, 165, 0.5) 1px, transparent 1px)',
            backgroundSize: '20px 1px',
            backgroundPosition: '16px 0'
          }}></div>
        </div>
        <div className="relative z-10 px-4">
          <div className="mx-auto max-w-5xl text-center rounded-xl border-2 border-white/50 bg-white/5 backdrop-blur-sm p-8 sm:p-12 transition hover:border-fuchsia-400">
            <h3
              className="text-4xl lg:text-6xl font-medium mb-6"
              style={{
                background: 'linear-gradient(90deg, #FFFFFF 0%, #D770D7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Got a project idea in mind?
            </h3>
            <Link
              to="/contact"
              className="inline-block rounded-full border-2 border-white/50 bg-white/5 backdrop-blur-sm px-6 py-2 text-white transition hover:border-fuchsia-400"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </ProjectLayout>
  );
};

export default BaysideSports;

