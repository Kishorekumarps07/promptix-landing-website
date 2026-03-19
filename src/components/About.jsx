import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Code, Cloud, Database, TrendingUp, Target, BarChart, Briefcase, Lightbulb } from 'lucide-react';
import MagneticButton from './MagneticButton';

const About = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    const values = [
        'Accelerate growth with scalable technology solutions',
        'Streamline operations through intelligent automation',
        'Make data-driven decisions with powerful analytics',
        'Enhance customer experience across all touchpoints',
    ];

    // Floating icons representing Tech and Marketing
    const floatingIcons = [
        { Icon: Code },
        { Icon: Cloud },
        { Icon: Database },
        { Icon: TrendingUp },
        { Icon: Target },
        { Icon: BarChart },
        { Icon: Briefcase },
        { Icon: Lightbulb },
    ];

    return (
        <section
            id="about"
            className="relative overflow-hidden py-0"
        >
            <div className="section-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="heading-lg text-white mb-6">
                            Why Transforming Your Business
                            <br />
                            <span className="text-orange-500">with Technology Matters</span>
                        </h2>
                        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                            In today's fast-paced digital landscape, technology isn't just an advantage—it's essential.
                            Businesses that embrace digital transformation unlock new opportunities for growth,
                            efficiency, and innovation while staying ahead of the competition.
                        </p>

                        {/* Values list */}
                        <div className="space-y-4">
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex items-start gap-3 group"
                                >
                                    <div className="mt-1 transition-transform group-hover:scale-110 duration-300">
                                        <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                    </div>
                                    <span className="text-gray-200 font-medium group-hover:text-white transition-colors">{value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Floating Icons Grid with Parallax */}
                    <motion.div
                        style={{ y }}
                        className="relative"
                    >
                        {/* Desktop: 3-column grid with centered layout */}
                        <div className="hidden md:grid grid-cols-3 gap-6 p-8 place-items-center">
                            {floatingIcons.map((item, index) => {
                                const { Icon } = item;
                                return (
                                    <MagneticButton key={index} strength={0.2} className="w-full flex justify-center">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.5,
                                                delay: index * 0.1,
                                                type: "spring",
                                                stiffness: 100
                                            }}
                                            whileHover={{
                                                y: -10,
                                                transition: { duration: 0.3 }
                                            }}
                                        >
                                            <div className="w-20 h-20 rounded-2xl bg-navy-800/50 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-glass-gold hover:border-orange-500/50 transition-all duration-300 flex items-center justify-center cursor-default group">
                                                <Icon className="w-9 h-9 text-orange-500 group-hover:text-white transition-colors" />
                                            </div>
                                        </motion.div>
                                    </MagneticButton>
                                );
                            })}
                        </div>

                        {/* Mobile: 4-column grid */}
                        <div className="md:hidden grid grid-cols-4 gap-4 p-6">
                            {floatingIcons.map((item, index) => {
                                const { Icon } = item;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="w-full aspect-square"
                                    >
                                        <div className="w-full h-full rounded-xl bg-navy-800/50 border border-white/10 shadow-md flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-orange-500" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
