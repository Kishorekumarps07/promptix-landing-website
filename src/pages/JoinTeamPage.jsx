import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, Lightbulb, TrendingUp, Award, ChevronDown,
    CheckCircle2, ArrowRight, Briefcase, Rocket, Globe, Zap
} from 'lucide-react';

const JoinTeamPage = () => {
    const [expandedRole, setExpandedRole] = useState(null);

    // Why Work With Us benefits
    const benefits = [
        {
            icon: Briefcase,
            title: 'Real Projects',
            description: 'Work on actual client projects and see your contributions make a real impact in the market.'
        },
        {
            icon: Lightbulb,
            title: 'AI-First Mindset',
            description: 'Learn to leverage cutting-edge AI tools and automation to work smarter and faster.'
        },
        {
            icon: Users,
            title: 'Mentorship & Growth',
            description: 'Get hands-on guidance from experienced professionals who are invested in your success.'
        },
        {
            icon: TrendingUp,
            title: 'Career-Oriented Learning',
            description: 'Build a portfolio of real work and develop skills that employers actively seek.'
        }
    ];

    // Open roles data
    const openRoles = [
        {
            title: 'AI & Data Intern',
            type: 'Internship',
            duration: '3-6 months',
            description: 'Work on AI model development, data analysis, and machine learning projects using cutting-edge tools.',
            responsibilities: [
                'Assist in developing and fine-tuning AI models',
                'Perform data analysis and create insights dashboards',
                'Work with NLP, computer vision, or predictive analytics',
                'Learn to use ChatGPT, Claude, and other AI tools effectively'
            ],
            requirements: [
                'Basic understanding of Python and data structures',
                'Familiarity with machine learning concepts',
                'Strong analytical and problem-solving skills',
                'Eagerness to learn and experiment with AI tools'
            ],
            skills: ['Python', 'Machine Learning', 'Data Analysis', 'AI Tools']
        },
        {
            title: 'Full Stack Development Intern',
            type: 'Internship',
            duration: '3-6 months',
            description: 'Build modern web applications using React, Node.js, and cloud technologies for real clients.',
            responsibilities: [
                'Develop frontend interfaces using React and modern frameworks',
                'Build backend APIs with Node.js and Express',
                'Work with databases (MongoDB, PostgreSQL)',
                'Deploy applications to cloud platforms (AWS, Vercel)'
            ],
            requirements: [
                'Solid foundation in JavaScript/TypeScript',
                'Basic knowledge of React and Node.js',
                'Understanding of HTML, CSS, and responsive design',
                'Passion for building clean, functional applications'
            ],
            skills: ['React', 'Node.js', 'JavaScript', 'Cloud Deployment']
        },
        {
            title: 'UI/UX & Graphic Design Intern',
            type: 'Internship',
            duration: '3-6 months',
            description: 'Create stunning visual designs, user interfaces, and brand identities for diverse clients.',
            responsibilities: [
                'Design user interfaces for web and mobile applications',
                'Create marketing materials and social media graphics',
                'Develop brand identities and visual systems',
                'Conduct user research and usability testing'
            ],
            requirements: [
                'Proficiency in Figma, Adobe Illustrator, or Photoshop',
                'Strong understanding of design principles',
                'Portfolio showcasing design work (academic or personal)',
                'Attention to detail and creative thinking'
            ],
            skills: ['Figma', 'UI/UX Design', 'Adobe Creative Suite', 'Branding']
        },
        {
            title: 'Digital Marketing Intern',
            type: 'Internship',
            duration: '3-6 months',
            description: 'Execute data-driven marketing campaigns across SEO, social media, and paid advertising.',
            responsibilities: [
                'Manage social media accounts and create engaging content',
                'Assist with SEO optimization and content marketing',
                'Run and optimize paid advertising campaigns',
                'Analyze marketing metrics and prepare reports'
            ],
            requirements: [
                'Understanding of digital marketing fundamentals',
                'Strong writing and communication skills',
                'Familiarity with social media platforms',
                'Analytical mindset and willingness to learn tools'
            ],
            skills: ['SEO', 'Social Media', 'Content Marketing', 'Analytics']
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <div className="min-h-screen bg-navy-950 pt-20">
            {/* Hero Section */}
            <section className="relative py-14 md:py-16 lg:py-24 px-4 overflow-hidden bg-navy-950/50">
                <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Join the <span className="text-orange-500">PromptiX</span> Team
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                            Work on real projects, learn cutting-edge AI tools, and grow your career
                            with mentorship from experienced professionals.
                        </p>

                        {/* Badge Indicators */}
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm"
                            >
                                <span className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                                    <Rocket className="w-4 h-4" />
                                    Internships Available
                                </span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm"
                            >
                                <span className="text-sm font-semibold text-purple-400 flex items-center gap-2">
                                    <Zap className="w-4 h-4" />
                                    AI-First Culture
                                </span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm"
                            >
                                <span className="text-sm font-semibold text-blue-400 flex items-center gap-2">
                                    <Globe className="w-4 h-4" />
                                    Online & Offline
                                </span>
                            </motion.div>
                        </div>

                        {/* Primary CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20"
                            >
                                <span>Apply Now</span>
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Why Work With Us Section */}
            <section className="max-w-7xl mx-auto px-4 py-14 md:py-16 lg:py-24">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Why Work <span className="text-orange-500">With Us</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            We're not just offering internships—we're investing in your future.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="p-6 rounded-2xl bg-gradient-to-br from-navy-900/80 to-navy-800/50 border border-white/10 hover:border-orange-500/30 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
                                    <Icon className="w-6 h-6 text-orange-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {benefit.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </section>

            {/* Open Roles Section */}
            <section className="max-w-5xl mx-auto px-4 py-14 md:py-16 lg:py-24 bg-navy-900/30">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Open <span className="text-orange-500">Roles</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Explore our current internship opportunities and find the perfect fit for your skills.
                        </p>
                    </motion.div>
                </div>

                <div className="space-y-4">
                    {openRoles.map((role, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md overflow-hidden hover:border-orange-500/30 transition-all"
                        >
                            {/* Role Header */}
                            <button
                                onClick={() => setExpandedRole(expandedRole === index ? null : index)}
                                className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-white">
                                            {role.title}
                                        </h3>
                                        <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400">
                                            {role.type}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-2">{role.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {role.skills.map((skill, i) => (
                                            <span key={i} className="text-xs text-gray-500">
                                                {skill}{i < role.skills.length - 1 ? ' •' : ''}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <ChevronDown
                                    className={`w-6 h-6 text-orange-500 transition-transform duration-300 ml-4 shrink-0 ${expandedRole === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {/* Expanded Content */}
                            <AnimatePresence>
                                {expandedRole === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pt-2 border-t border-white/10 space-y-6">
                                            {/* Duration */}
                                            <div>
                                                <p className="text-sm text-gray-400">
                                                    <span className="font-semibold text-white">Duration:</span> {role.duration}
                                                </p>
                                            </div>

                                            {/* Responsibilities */}
                                            <div>
                                                <h4 className="text-white font-semibold mb-3">What You'll Do</h4>
                                                <ul className="space-y-2">
                                                    {role.responsibilities.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                                                            <span className="text-sm text-gray-300">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Requirements */}
                                            <div>
                                                <h4 className="text-white font-semibold mb-3">What We're Looking For</h4>
                                                <ul className="space-y-2">
                                                    {role.requirements.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-2" />
                                                            <span className="text-sm text-gray-300">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Apply Button */}
                                            <div className="pt-4">
                                                <a
                                                    href="/contact"
                                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20"
                                                >
                                                    <span>Apply for this Role</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* How to Apply Section */}
            <section className="max-w-5xl mx-auto px-4 py-14 md:py-16 lg:py-24">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            How to <span className="text-orange-500">Apply</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Our application process is simple and straightforward. We value your time.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            step: '01',
                            title: 'Submit Application',
                            description: 'Fill out the contact form with your details, resume, and portfolio (if applicable).'
                        },
                        {
                            step: '02',
                            title: 'Initial Review',
                            description: 'Our team will review your application within 3-5 business days and reach out if there\'s a fit.'
                        },
                        {
                            step: '03',
                            title: 'Interview & Onboard',
                            description: 'Have a casual conversation with the team, and if all goes well, start your journey with us!'
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/20">
                                <span className="text-2xl font-bold text-orange-500">{item.step}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm text-center"
                >
                    <p className="text-blue-300 text-sm">
                        <strong>Note:</strong> We review all applications carefully. Even if you don't hear back immediately,
                        it doesn't mean we're not interested. We'll keep your application on file for future opportunities.
                    </p>
                </motion.div>
            </section>

            {/* Final CTA Section */}
            <section className="max-w-4xl mx-auto px-4 py-14 md:py-16 lg:py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-12 rounded-2xl bg-gradient-to-br from-orange-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm"
                >
                    <Award className="w-16 h-16 text-orange-500 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        Join a team that values innovation, learning, and real-world impact.
                        Your next career milestone starts here.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20"
                    >
                        <span>Apply Now</span>
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </motion.div>
            </section>
        </div>
    );
};

export default JoinTeamPage;
