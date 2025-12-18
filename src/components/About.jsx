import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Code, Cloud, Database, TrendingUp, Target, BarChart, GraduationCap, Lightbulb } from 'lucide-react';

const About = () => {
    const values = [
        'Accelerate growth with scalable technology solutions',
        'Streamline operations through intelligent automation',
        'Make data-driven decisions with powerful analytics',
        'Enhance customer experience across all touchpoints',
    ];

    // Floating icons representing Tech, Marketing, and EdTech
    const floatingIcons = [
        { Icon: Code },
        { Icon: Cloud },
        { Icon: Database },
        { Icon: TrendingUp },
        { Icon: Target },
        { Icon: BarChart },
        { Icon: GraduationCap },
        { Icon: Lightbulb },
    ];

    return (
        <motion.section
            id="about"
            className="bg-slate-50"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="section-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="heading-lg text-navy-950 mb-6">
                            Why Transforming Your Business
                            <br />
                            <span className="text-orange-500">with Technology Matters</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
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
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle2 className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-700 font-medium">{value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Floating Icons Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        {/* Desktop: 3-column grid with centered layout */}
                        <div className="hidden md:grid grid-cols-3 gap-6 p-8 place-items-center">
                            {floatingIcons.map((item, index) => {
                                const { Icon } = item;
                                return (
                                    <motion.div
                                        key={index}
                                        animate={{
                                            y: [0, -12, 0],
                                        }}
                                        transition={{
                                            duration: 3 + (index % 3) * 0.5,
                                            delay: index * 0.15,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                        className="w-full flex justify-center"
                                    >
                                        <div className="w-20 h-20 rounded-2xl bg-white backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl hover:scale-110 hover:border-orange-200 transition-all duration-300 flex items-center justify-center">
                                            <Icon className="w-9 h-9 text-orange-500" />
                                        </div>
                                    </motion.div>
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
                                        <div className="w-full h-full rounded-xl bg-white border border-slate-200 shadow-md flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-orange-500" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default About;
