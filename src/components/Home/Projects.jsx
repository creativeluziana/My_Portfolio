"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useInView,
} from "framer-motion";
import BaysideSportsImg from "../../assets/Projects/Bayside_Sports.png";

function Image({ id, image, title, isLast }) {
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const textRef = useRef(null);
    const [imgHeight, setImgHeight] = useState(0);
    const [textHeight, setTextHeight] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const isInView = useInView(containerRef, {
        threshold: 0.3,
    });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Smooth parallax for image
    const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 20]);

    useLayoutEffect(() => {
        if (imgRef.current) setImgHeight(imgRef.current.offsetHeight);
        if (textRef.current) setTextHeight(textRef.current.offsetHeight);
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

    // Stop y movement earlier so it doesn't overlap footer
    const y = useTransform(
        scrollYProgress,
        [0, 0.9], // stops before bottom
        [0, Math.max(0, imgHeight - textHeight)]
    );

    // Opacity fade out near the bottom
    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

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
            <div style={{ position: "relative" }}>
                <motion.img
                    ref={imgRef}
                    src={image}
                    alt={`${title} Project`}
                    initial={{ opacity: 0, y: 150, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    style={{ y: parallaxY }}
                    className="w-full h-auto will-change-transform"
                />
                <motion.h2
                    ref={textRef}
                    style={{
                        y,
                        opacity,
                        background:
                            "linear-gradient(90deg, #FFFFFF 0%, #D770D7 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                        willChange: "transform",
                        transition: "transform 0.4s ease-out",
                    }}
                    className="text-6xl lg:text-8xl font-medium absolute left-0 translate-x-0 drop-shadow-lg overlay-title whitespace-nowrap z-0 pointer-events-none"
                >
                    {displayedText}
                    {isTyping && displayedText.length < title.length && (
                        <span className="animate-pulse">|</span>
                    )}
                </motion.h2>
            </div>
        </section>
    );
}

const Projects = () => {
    const projects = [
        { id: 1, image: BaysideSportsImg, title: "Bayside Sports" },
        { id: 2, image: BaysideSportsImg, title: "Fluxurous Tech" },
        { id: 3, image: BaysideSportsImg, title: "Pixel Portfolio" },
        { id: 4, image: BaysideSportsImg, title: "Artisan Avenue" },
    ];

    return (
        <div id="example" className="bg-black relative mb-0">
            {/* Vertical Lines Background Pattern */}
            <div className="absolute inset-0 opacity-40">
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
            <div className="text-center py-20 relative z-10">
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

            <div className="flex flex-col gap-8">
              {projects.map((project, idx) => (
                <Image
                  key={project.id}
                  id={project.id}
                  image={project.image}
                  title={project.title}
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
                width: 90%;
                max-width: 350px;
            }
            .img-container img {
                width: 100%;
                height: auto;
            }
        }
        .overlay-title {
            top: 0;
            left: -150px;
            text-align: left;
            pointer-events: none;
        }
        @media (max-width: 500px) {
            .img-container > div {
                width: 350px;
            }
            .img-container img {
                width: 350px;
            }
        }
    `}</style>
    );
}

export default Projects;