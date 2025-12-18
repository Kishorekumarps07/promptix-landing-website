import React from 'react';
import { motion } from 'framer-motion';
import { Code, TrendingUp, GraduationCap } from 'lucide-react';

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
        {
            icon: GraduationCap,
            title: 'EdTech & Learning Programs',
            description:
                'Industry-focused internships, hands-on workshops, and AI training programs that bridge the gap between academic learning and real-world skills.',
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
        <section id="services" className="section-container bg-slate-50">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="heading-lg text-navy-950 mb-4">
                        Built for Performance
                    </h2>
                    <p className="text-xl text-navy-600 max-w-2xl mx-auto">
                        PromptiX delivers tech solutions, digital marketing, and EdTech programs
                        that empower businesses and students to succeed in the digital age.
                    </p>
                </motion.div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 flex flex-col"
                        >
                            {/* Icon container */}
                            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-navy-950 text-white group-hover:bg-orange-500 transition-colors duration-300">
                                <Icon className="w-8 h-8" />
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold text-navy-950 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-navy-600 leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Hover accent */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
};

export default Features;
