import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Rocket } from 'lucide-react';

const Hero = () => {
    // Geometric shapes inspired by logo
    const FloatingShape = ({ delay = 0, duration = 6, children, className = '' }) => (
        <motion.div
            animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            className={className}
        >
            {children}
        </motion.div>
    );

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white pt-20">
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

            {/* Abstract geometric background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
                <FloatingShape delay={0} className="absolute top-20 right-20 opacity-10">
                    <div className="w-64 h-64 rounded-full border-4 border-white" />
                </FloatingShape>
                <FloatingShape delay={1} duration={8} className="absolute bottom-20 left-20 opacity-10">
                    <div className="w-48 h-48 rounded-full border-4 border-orange-500" />
                </FloatingShape>
                <FloatingShape delay={2} duration={7} className="absolute top-1/2 left-1/4 opacity-5">
                    <div className="w-32 h-32 rotate-45 border-4 border-white" />
                </FloatingShape>
            </div>

            <div className="section-container relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 bg-orange-500/90 text-white px-4 py-2 rounded-full mb-8 border border-orange-400"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-semibold">Build Your Brand</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="heading-xl text-white mb-6"
                    >
                        A Tech, Digital Marketing
                        <br />
                        <span className="text-orange-400">
                            & EdTech Company
                        </span>
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed"
                    >
                        We're PromptiX — a Tech Solutions, Digital Marketing, and EdTech company shaping ideas into impact.
                        From AI-powered products to growth marketing and future-ready learning, we build, promote, and empower.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex items-center justify-center mb-16"
                    >
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
                            className="btn-primary flex items-center gap-2"
                        >
                            <Rocket className="w-5 h-5" />
                            Explore
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
                    >
                        {[
                            { value: '500+', label: 'Enterprise Clients' },
                            { value: '<100ms', label: 'Avg Response Time' },
                            { value: '99.9%', label: 'Platform Uptime' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl font-bold text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-200 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
};

export default Hero;
