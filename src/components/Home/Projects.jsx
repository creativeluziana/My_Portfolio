"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    motion,
    useScroll,
    useTransform,
    useInView,
} from "framer-motion";
import BaysideSportsImg from "../../assets/Projects/Bayside_Sports.png";
import FluxuriousTechImg from "../../assets/Projects/Fluxurious_Tech.png";
import RAEImg from "../../assets/Projects/RAE.png";
import JobsifyImg from "../../assets/Projects/Jobsify.png";
import FaceTransformImg from "../../assets/Projects/FaceTransform.png";
import B4USchoolsImg from "../../assets/Projects/B4USchools.png";
import AarohanImg from "../../assets/Projects/Aarohan.png";

function Image({ id, image, title, isLast, slug }) {
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const textRef = useRef(null);
    const [imgHeight, setImgHeight] = useState(0);
    const [textHeight, setTextHeight] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const isInView = useInView(containerRef, {
        threshold: 0.25,
        margin: '0px 0px -10% 0px',
    });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
        layoutEffect: false,
    });

    // Smooth parallax for image
    const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 20]);

    // Stop y movement earlier so it doesn't overlap footer
    const y = useTransform(
        scrollYProgress,
        [0, 0.9], // stops before bottom
        [0, Math.max(0, imgHeight - textHeight)]
    );

    // Opacity fade out near the bottom
    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

    useLayoutEffect(() => {
        const recalcHeights = () => {
            if (imgRef.current) setImgHeight(imgRef.current.offsetHeight || 0);
            if (textRef.current) setTextHeight(textRef.current.offsetHeight || 0);
        };
        recalcHeights();
        window.addEventListener('resize', recalcHeights);
        return () => window.removeEventListener('resize', recalcHeights);
    }, []);

    // Typing animation effect
    useEffect(() => {
        if (isInView) {
            setIsTyping(true);
            setDisplayedText("");
            let currentIndex = 0;
            const typeText = () => {
                if (currentIndex <= title.length) {
                    setDisplayedText(title.slice(0, currentIndex));
                    currentIndex++;
                    setTimeout(typeText, 50);
                } else {
                    setIsTyping(false);
                }
            };
            setTimeout(typeText, 200);
        } else {
            setDisplayedText("");
            setIsTyping(false);
        }
    }, [isInView, title]);

    return (
        <section
            className="img-container"
            ref={containerRef}
            style={{
                paddingBottom: isLast ? "0" : "0", // remove extra space between items
                overflow: "hidden", // prevent bleed
                position: "relative", // required for framer-motion scroll measurements
            }}
        >
            <div style={{ position: "relative" }} data-cursor-label="View project" className="z-10">
                <motion.img
                    ref={imgRef}
                    src={image}
                    alt={`${title} Project`}
                    initial={{ opacity: 0, y: 120, scale: 0.96 }}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 120, scale: isInView ? 1 : 0.96 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    style={{ y: parallaxY, position: 'relative', zIndex: 0 }}
                    className="w-full h-auto will-change-transform block"
                    loading="eager"
                    onLoad={() => {
                        if (imgRef.current) setImgHeight(imgRef.current.offsetHeight || 0);
                        if (textRef.current) setTextHeight(textRef.current.offsetHeight || 0);
                    }}
                    onError={(e) => {
                        const img = e.currentTarget;
                        if (!img.dataset.retried) {
                            img.dataset.retried = '1';
                            img.src = image;
                        }
                    }}
                />
                <motion.h2
                    ref={textRef}
                    style={{
                        y: y || 0,
                        opacity: opacity || 1,
                        background:
                            "linear-gradient(90deg, #FFFFFF 0%, #D770D7 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                        willChange: "transform",
                        transition: "transform 0.4s ease-out",
                    }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-medium absolute left-0 translate-x-0 drop-shadow-lg overlay-title whitespace-nowrap z-20 pointer-events-none"
                >
                    {displayedText}
                    {isTyping && displayedText.length < title.length && (
                        <span className="animate-pulse">|</span>
                    )}
                </motion.h2>
                <Link to={`/${slug}`} className="absolute inset-0" aria-label={`Open ${title}`} />
            </div>
        </section>
    );
}

const Projects = () => {
    const projects = [
        // Required order
        { id: 1, image: BaysideSportsImg, title: "Bayside Sports", slug: "projects/tech/bayside-sports" },
        { id: 2, image: FluxuriousTechImg, title: "Fluxurous Tech", slug: "projects/tech/fluxurous-tech" },
        { id: 3, image: BaysideSportsImg, title: "Studex", slug: "projects/tech/studex" },
        { id: 4, image: RAEImg, title: "Research Assistant", slug: "projects/tech/rae" },
        // The rest
        { id: 5, image: AarohanImg, title: "Aarohan", slug: "projects/tech/aarohan" },
        { id: 6, image: JobsifyImg, title: "Jobsify", slug: "projects/tech/jobsify" },
        { id: 7, image: FaceTransformImg, title: "Face Transform", slug: "projects/tech/face-transform" },
        { id: 8, image: B4USchoolsImg, title: "B4U Schools", slug: "projects/tech/b4u-schools" },
    ];

    return (
        <div id="example" className="bg-black relative mb-0">
            {/* Vertical Lines Background Pattern */}
            <div className="absolute inset-0 opacity-40 pointer-events-none -z-10" style={{ position: 'absolute' }}>
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage:
                            "linear-gradient(90deg, rgba(165, 165, 165, 0.5) 1px, transparent 1px)",
                        backgroundSize: "20px 1px",
                        backgroundPosition: "16px 0",
                    }}
                ></div>
            </div>

            {/* Header Section */}
            <div className="text-center py-20 relative z-10" style={{ position: 'relative' }}>
                <h1
                    className="inline-block text-5xl lg:text-6xl font-medium mb-4"
                    style={{
                        background:
                            "linear-gradient(90deg, #FFFFFF 0%, #D770D7 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                    }}
                >
                    My Projects
                </h1>
                <p className="text-white text-lg lg:text-xl">Some Subtitle</p>
            </div>

            <div className="flex flex-col gap-8 relative z-10" style={{ position: 'relative' }}>
              {projects.map((project, idx) => (
                <Image
                  key={project.id}
                  id={project.id}
                  image={project.image}
                  title={project.title}
                  slug={project.slug}
                  isLast={idx === projects.length - 1}
                />
              ))}
            </div>
            <StyleSheet />
        </div>
    );
};

function StyleSheet() {
    return (
        <style>{`
        .img-container {
            display: block;
            position: relative;
            min-height: unset;
            height: auto;
            margin-bottom: 0;
        }
        #example {
            margin-bottom: 0 !important;
        }
        .img-container > div {
            width: 800px;
            height: auto;
            margin: 0 auto;
            position: relative;
        }
        .img-container img {
            width: 800px;
            height: auto;
        }
        @media (max-width: 768px) {
            .img-container > div {
                width: calc(100% - 24px);
                max-width: 360px;
            }
            .img-container img {
                width: 100%;
                height: auto;
            }
            .overlay-title { left: -80px; }
        }
        .overlay-title { top: 0; left: -150px; text-align: left; pointer-events: none; }
        @media (max-width: 375px) {
            .img-container > div { max-width: 340px; }
            .overlay-title { left: 0; }
        }
        @media (max-width: 340px) {
            .img-container > div { max-width: 300px; }
            .overlay-title { left: 0; }
        }
    `}</style>
    );
}

export default Projects;