import React from 'react';
import { motion } from 'framer-motion';
import {
    Brain, Code, Lightbulb, Rocket, Users, Calendar, Puzzle, Sparkles, Target, Layers, ChevronRight, Home
} from 'lucide-react';
import SEO from '../components/SEO';

const SchoolStudentsPage = () => {

    const programs = [
        {
            icon: Code,
            title: 'Coding Fundamentals',
            description: 'Start with the basics of logic and syntax. Build simple games and interactive stories.',
            color: 'text-blue-400'
        },
        {
            icon: Brain,
            title: 'AI Basics',
            description: 'Understand how computers learn. training simple models and exploring AI ethics.',
            color: 'text-purple-400'
        },
        {
            icon: Puzzle,
            title: 'Logical Thinking',
            description: 'Develop critical problem-solving skills through computational thinking puzzles.',
            color: 'text-green-400'
        },
        {
            icon: Lightbulb,
            title: 'Creativity & Innovation',
            description: 'Turn ideas into reality. Design thinking workshops to spark the inventor within.',
            color: 'text-orange-400'
        }
    ];

    const workshops = [
        {
            title: 'One-Day Workshops',
            desc: 'Intensive, fun-filled sessions deep-diving into a specific topic like "Build Your First App" or "Introduction to Robots".',
            icon: Calendar
        },
        {
            title: 'Semester Programs',
            desc: 'Long-term engagement courses integrated into the school term, covering a comprehensive tech curriculum.',
            icon: Layers
        },
        {
            title: 'Custom School Collaborations',
            desc: 'Tailored programs designed to fit specific school requirements, board curriculums, and student age groups.',
            icon: Users
        }
    ];

    const skills = [
        { icon: Target, name: 'Problem Solving' },
        { icon: Brain, name: 'Computational Thinking' },
        { icon: Sparkles, name: 'Technology Awareness' },
        { icon: Users, name: 'Team Collaboration' }
    ];

    return (
        <main className="bg-navy-950 pt-24 min-h-screen">
            <SEO
                title="School Students & Workshops"
                description="Empowering school students with coding, AI, and logical thinking. Explore our workshops and school partnership programs."
                keywords="coding for kids, AI workshops, school programs, robotics, logical thinking"
                url="/students/schools"
            />

            {/* Breadcrumbs */}
            <nav className="max-w-7xl mx-auto px-4 mb-4" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <a href="/" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            <Home className="w-4 h-4 mr-2" />
                            Home
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <ChevronRight className="w-5 h-5 text-gray-500" />
                            <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2">Students & Institutions</span>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <ChevronRight className="w-5 h-5 text-gray-500" />
                            <span className="ml-1 text-sm font-medium text-orange-500 md:ml-2">School Students & Schools</span>
                        </div>
                    </li>
                </ol>
            </nav>

            {/* Hero Section */}
            <section className="relative py-16 md:py-24 px-4 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/5 blur-[120px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            <span className="text-sm font-medium text-gray-300">Future-Ready Learning</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Empowering School Students <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">for the Future</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                            Early exposure to technology, creativity, and problem-solving to build the innovators of tomorrow.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="/contact" className="px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-0.5">
                                Request School Workshop
                            </a>
                            <a href="/contact" className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition-all border border-white/10">
                                Talk to Our Team
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Programs Section */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Programs for School Students</h2>
                    <p className="text-gray-400">Curated learning paths to ignite curiosity.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {programs.map((program, index) => {
                        const Icon = program.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.15)] hover:bg-navy-900 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Icon className={`w-6 h-6 ${program.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{program.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{program.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Workshops Section */}
            <section className="bg-navy-900/50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Workshops for Schools</h2>
                        <p className="text-gray-400">Flexible engagement models to suit academic calendars.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {workshops.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-8 rounded-2xl bg-navy-950 border border-white/10 hover:border-orange-500/50 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.2)] text-center group"
                                >
                                    <div className="w-16 h-16 mx-auto rounded-full bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
                                        <Icon className="w-8 h-8 text-orange-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-gray-400">{item.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Skills Grid */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Skills Covered</h2>
                    <p className="text-gray-400">Beyond just coding – holistic development.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {skills.map((skill, index) => {
                        const Icon = skill.icon;
                        return (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] transition-shadow duration-300"
                            >
                                <Icon className="w-10 h-10 text-orange-400 mb-3" />
                                <h3 className="text-white font-medium">{skill.name}</h3>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Partner CTA */}
            <section className="max-w-5xl mx-auto px-4 py-16">
                <div className="rounded-3xl bg-gradient-to-r from-orange-600 to-orange-500 p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-pattern opacity-10"></div>
                    <Rocket className="w-24 h-24 text-white/20 absolute -top-4 -left-4 rotate-12" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Partner With PromptiX</h2>
                        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                            Bring world-class tech education to your school. We provide the curriculum, instructors, and resources to set up a thriving innovation ecosystem.
                        </p>
                        <a href="/contact" className="inline-block px-10 py-4 rounded-xl bg-white text-orange-600 font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
                            Partner With Us
                        </a>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default SchoolStudentsPage;
