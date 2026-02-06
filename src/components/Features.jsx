import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code, TrendingUp } from 'lucide-react';

const TiltCard = ({ children, className }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x);
    const mouseY = useSpring(y);

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        const xPct = mouseXFromCenter / width;
        const yPct = mouseYFromCenter / height;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={className}
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className="h-full"
            >
                {children}
            </div>
            <motion.div
                style={{
                    transform: "translateZ(25px)",
                    opacity: useTransform(mouseX, [-0.5, 0.5], [0, 0.5])
                }}
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-2xl"
            />
        </motion.div>
    );
};

const Features = () => {
    const features = [
        {
            icon: Code,
            title: 'Tech Solutions',
            description:
                'Custom software development, AI-powered products, and intelligent automation solutions designed to streamline operations and drive business growth.',
        },
        {
            icon: TrendingUp,
            title: 'Digital Marketing',
            description:
                'Data-driven marketing strategies that deliver results. From SEO and paid ads to social media and content marketing, we help brands grow and thrive online.',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <section id="services" className="section-container [perspective:1000px] bg-[#121821]">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="heading-lg text-white mb-4">
                        Built for Performance
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        PromptiX delivers tech solutions and digital marketing services
                        that empower businesses to succeed in the digital age.
                    </p>
                </motion.div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="h-full"
                        >
                            <TiltCard
                                className="group relative bg-navy-800/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-orange-500/50 transition-colors duration-300 shadow-lg hover:shadow-glass-gold flex flex-col h-full [perspective:1000px]"
                            >
                                {/* Icon container */}
                                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-navy-950 text-orange-500 border border-white/10 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-md [transform-style:preserve-3d] group-hover:[transform:translateZ(10px)]">
                                    <Icon className="w-8 h-8" />
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-white mb-3 [transform-style:preserve-3d] group-hover:[transform:translateZ(8px)]">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300 leading-relaxed [transform-style:preserve-3d] group-hover:[transform:translateZ(6px)]">
                                    {feature.description}
                                </p>

                                {/* Hover accent */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                            </TiltCard>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
};

export default Features;
