import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Rocket } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Parallax transforms
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const y3 = useTransform(scrollY, [0, 500], [0, 100]);
    const rotate1 = useTransform(scrollY, [0, 500], [0, 45]);
    const rotate2 = useTransform(scrollY, [0, 500], [0, -30]);

    // Geometric shapes inspired by logo with parallax
    const FloatingShape = ({ delay = 0, style, children, className = '' }) => (
        <motion.div
            style={style}
            animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
            }}
            transition={{
                duration: 6,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            className={className}
        >
            {children}
        </motion.div>
    );

    // Count-up animation hook
    const useCountUp = (end, duration = 1500) => {
        const [count, setCount] = useState(0);
        const [hasAnimated, setHasAnimated] = useState(false);

        useEffect(() => {
            if (hasAnimated) return;
            setHasAnimated(true);

            let startTime;
            const startValue = 0;

            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);

                // Ease-out cubic easing
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentCount = startValue + (end - startValue) * easeOut;

                setCount(currentCount);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }, [end, duration, hasAnimated]);

        return Math.floor(count);
    };

    // Stat item component with animation
    const StatItem = ({ value, label, targetNumber, displayValue, suffix = '' }) => {
        const count = targetNumber ? useCountUp(targetNumber) : null;
        const formattedValue = displayValue || (count !== null ? `${count}${suffix}${value.includes('+') ? '+' : ''}` : value);

        return (
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
                className="text-center px-4"
            >
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                    {formattedValue}
                </div>
                <div className="text-sm md:text-base text-gray-300 font-medium">{label}</div>
            </motion.div>
        );
    };

    // Staggered Text Reveal
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05 + 0.2, // Stagger effect
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9],
            },
        }),
    };

    const title1 = "A Tech & Digital Marketing";
    const title2 = "Company";

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950 pt-20 pb-14 md:pb-16 lg:pb-24">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                    poster="/video-poster.jpg"
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                >
                    <source src="/hero-background.webm" type="video/webm" />
                    <source src="/hero-background.mp4" type="video/mp4" />
                    {/* Fallback to gradient background if video fails */}
                </video>

                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-navy-950/65 via-navy-950/55 to-navy-950/75"></div>
            </div>

            {/* Abstract geometric background with Parallax */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
                <FloatingShape delay={0} style={{ y: y1, rotate: rotate1 }} className="absolute top-20 right-20 opacity-20">
                    <div className="w-64 h-64 rounded-full border-4 border-white/20 backdrop-blur-sm shadow-glass-white" />
                </FloatingShape>
                <FloatingShape delay={1} style={{ y: y2, rotate: rotate2 }} className="absolute bottom-20 left-20 opacity-20">
                    <div className="w-48 h-48 rounded-full border-4 border-orange-500/30 backdrop-blur-sm shadow-glass-orange" />
                </FloatingShape>
                <FloatingShape delay={2} style={{ y: y3 }} className="absolute top-1/2 left-1/4 opacity-10">
                    <div className="w-32 h-32 rotate-45 border-4 border-white/10 backdrop-blur-sm" />
                </FloatingShape>
            </div>

            <div className="section-container relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 bg-orange-500/90 text-white px-4 py-2 rounded-full mb-8 border border-orange-400 shadow-lg shadow-orange-500/20 backdrop-blur-md"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-semibold tracking-wide uppercase">Build Your Brand</span>
                    </motion.div>

                    {/* Main Headline with Staggered Reveal */}
                    <h1 className="heading-xl text-white mb-6 leading-tight">
                        <div className="overflow-hidden">
                            {title1.split(" ").map((word, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="inline-block mr-[0.25em]"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </div>
                        <div className="overflow-hidden mt-2">
                            <motion.span
                                custom={title1.split(" ").length}
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                                className="inline-block text-orange-400 drop-shadow-lg"
                            >
                                {title2}
                            </motion.span>
                        </div>
                    </h1>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-xl md:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed"
                    >
                        We're PromptiX — a Tech Solutions and Digital Marketing company shaping ideas into impact.
                        From AI-powered products to growth marketing, we build and promote innovative solutions.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex items-center justify-center mb-16"
                    >
                        <MagneticButton strength={0.4}>
                            <button
                                onClick={() => {
                                    const servicesSection = document.getElementById('services');
                                    if (servicesSection) {
                                        servicesSection.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                    }
                                }}
                                className="btn-primary flex items-center gap-2 group relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Rocket className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                    Explore
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                        </MagneticButton>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 max-w-4xl mx-auto mt-8 relative"
                    >
                        {/* Connecting line for desktop */}
                        <div className="hidden sm:block absolute top-1/2 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10" />

                        <StatItem value="100+" label="Enterprise Clients" targetNumber={100} />
                        <StatItem value="<100ms" label="Avg Response Time" displayValue="<100ms" />
                        <StatItem value="99.9%" label="Platform Uptime" targetNumber={99.9} suffix="%" />
                    </motion.div>
                </div>
            </div>

            {/* Bottom gradient fade to white */}
            <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 lg:h-40 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-[2]" />
        </section>
    );
};

export default Hero;
