import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Brain, Code, Layout, Megaphone, Bot, Briefcase, Building2, Ticket, CheckCircle, GraduationCap, ArrowRight, Zap, Target, Users, Home, ChevronRight,
    Package, Presentation, Mic2, Handshake, Rocket, Trophy, FileText,
    Cloud, ShieldCheck, PenTool, BarChart
} from 'lucide-react';
import DomainModal from '../components/DomainModal';
import SEO from '../components/SEO';

const CollegeStudentsPage = () => {
    const [selectedDomain, setSelectedDomain] = useState(null);

    const internshipDomains = [
        {
            category: 'Artificial Intelligence & Data',
            icon: Brain,
            items: ['Generative AI', 'Machine Learning', 'Data Science', 'Computer Vision/NLP', 'AI Ethics'],
            about: 'Master the future of tech. Work on real-world AI models and data pipelines.',
            color: 'text-purple-400',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20'
        },
        {
            category: 'Software & Full-Stack',
            icon: Code,
            items: ['React & Next.js', 'Node.js & Express', 'MERN Stack', 'Python & Django', 'Java & Spring Boot'],
            about: 'Build scalable web applications from scratch. Master frontend and backend.',
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20'
        },
        {
            category: 'Cloud, DevOps & Automation',
            icon: Cloud,
            items: ['AWS & Azure Cloud', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Intelligent Automation', 'Terraform'],
            about: 'Deploy, scale, and automate modern infrastructure.',
            color: 'text-cyan-400',
            bg: 'bg-cyan-500/10',
            border: 'border-cyan-500/20'
        },
        {
            category: 'UI / UX & Product Design',
            icon: Layout,
            items: ['User Research', 'Wireframing', 'Figma Prototyping', 'Design Systems', 'Usability Testing'],
            about: 'Design intuitive digital experiences that users love.',
            color: 'text-pink-400',
            bg: 'bg-pink-500/10',
            border: 'border-pink-500/20'
        },
        {
            category: 'Digital Marketing & Growth',
            icon: Megaphone,
            items: ['SEO & SEM', 'Social Media Strategy', 'Content Marketing', 'Growth Hacking', 'Email Automation'],
            about: 'Drive growth and engagement through data-driven marketing strategies.',
            color: 'text-orange-400',
            bg: 'bg-orange-500/10',
            border: 'border-orange-500/20'
        },
        {
            category: 'Business, Analytics & Product',
            icon: BarChart,
            items: ['Product Management', 'Business Analysis', 'Data Visualization', 'Market Research', 'Agile Methodologies'],
            about: 'Bridge the gap between technology and business strategy.',
            color: 'text-yellow-400',
            bg: 'bg-yellow-500/10',
            border: 'border-yellow-500/20'
        },
        {
            category: 'Quality, Security & Assurance',
            icon: ShieldCheck,
            items: ['Manual Testing', 'Automation (Selenium)', 'Cybersecurity Basics', 'Performance Testing', 'API Testing'],
            about: 'Ensure software reliability, security, and performance.',
            color: 'text-red-400',
            bg: 'bg-red-500/10',
            border: 'border-red-500/20'
        },
        {
            category: 'Content & Communication',
            icon: PenTool,
            items: ['Technical Writing', 'Copywriting', 'Business Communication', 'Video Production', 'Brand Storytelling'],
            about: 'Craft compelling narratives and clear technical documentation.',
            color: 'text-indigo-400',
            bg: 'bg-indigo-500/10',
            border: 'border-indigo-500/20'
        },
        {
            category: 'AI Automation Workflow',
            icon: Bot,
            items: ['AutoGPT', 'LangChain', 'n8n', 'CrewAI', 'Zapier'],
            about: 'Build intelligent agents and automate complex workflows.',
            color: 'text-green-400',
            bg: 'bg-green-500/10',
            border: 'border-green-500/20'
        }
    ];

    const outcomes = [
        { icon: Briefcase, title: 'Real-World Projects', desc: 'Work on live industry problem statements, not just dummy apps.' },
        { icon: CheckCircle, title: 'Portfolio Building', desc: 'Create a GitHub/Behance portfolio that gets you hired.' },
        { icon: Building2, title: 'Industry Exposure', desc: 'Interact with mentors and experts from top tech companies.' },
        { icon: GraduationCap, title: 'Certification', desc: 'Earn a verified certificate to boost your resume and LinkedIn.' }
    ];

    return (
        <main className="bg-navy-950 pt-24 min-h-screen">
            <SEO
                title="College Internships & Training"
                description="Industry-ready internships, real-world projects, and career skill development for college students. Start your journey today."
                keywords="college internships, industrial training, project-based learning, software development internship, AI internship"
                url="/students/colleges"
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
                            <span className="ml-1 text-sm font-medium text-orange-500 md:ml-2">College Students & Colleges</span>
                        </div>
                    </li>
                </ol>
            </nav>

            {/* Hero Section */}
            <section className="relative py-16 md:py-24 px-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            <span className="text-sm font-medium text-gray-300">Launch Your Career</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Industry-Ready Programs for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">College Students</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                            Bridge the gap between theory and practice with our intensive internships, live projects, and career-focused learning paths.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="/contact" className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg hover:shadow-blue-600/20 transform hover:-translate-y-0.5">
                                Apply for Internship
                            </a>
                            <a href="/contact" className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition-all border border-white/10">
                                Partner With Us
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Internship Domains */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Internship Domains</h2>
                    <p className="text-gray-400">Choose your path and master the skills that matter.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {internshipDomains.map((domain, index) => {
                        const Icon = domain.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedDomain(domain)}
                                className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_15px_40px_-15px_rgba(59,130,246,0.2)] cursor-pointer group relative overflow-hidden`}
                            >
                                <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
                                    <Icon className="w-24 h-24" />
                                </div>
                                <div className={`w-12 h-12 rounded-xl ${domain.bg} flex items-center justify-center mb-4 border ${domain.border}`}>
                                    <Icon className={`w-6 h-6 ${domain.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{domain.category}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{domain.about}</p>
                                <div className="flex flex-wrap gap-2">
                                    {domain.items.slice(0, 3).map((item, i) => (
                                        <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-16 bg-navy-900/50">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-3xl bg-gradient-to-br from-navy-800 to-navy-900 border border-white/10 p-8 md:p-12 relative overflow-hidden shadow-2xl text-center transition-shadow hover:shadow-[0_20px_50px_-10px_rgba(249,115,22,0.3)]"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-b-lg shadow-lg">
                            LIMITED TIME STUDENT OFFER
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-2">Unlock Your Potential</h2>
                        <p className="text-gray-400 mb-8">Get full access to our internship program, mentorship, and career support.</p>

                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className="text-2xl text-gray-500 line-through decoration-red-500/50 decoration-2">₹2999</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-bold text-white">₹1999</span>
                                <span className="text-gray-400">/ program</span>
                            </div>
                        </div>

                        <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
                            <li className="flex items-center gap-3 text-gray-300">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                <span>Complete Project-Based Learning</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                <span>Industry-Recognized Certification</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                <span>Placement Assistance & Resume Review</span>
                            </li>
                        </ul>

                        <a href="/contact" className="inline-flex items-center gap-2 px-12 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg transition-all shadow-xl hover:shadow-orange-500/20">
                            Enroll Now <ArrowRight className="w-5 h-5" />
                        </a>
                        <p className="mt-4 text-xs text-gray-500">*Offer valid for a limited period only.</p>
                    </motion.div>
                </div>
            </section>

            {/* Career Outcomes */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Career Outcomes</h2>
                    <p className="text-gray-400">Why thousands of students choose PromptiX.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {outcomes.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all duration-300 ease-out hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.2)]"
                            >
                                <div className="w-14 h-14 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                                    <Icon className="w-7 h-7 text-blue-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* College Collaborations Section */}
            <section className="relative py-20 border-t border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-[#0B1120] pointer-events-none" />

                {/* Soft Divider Glow */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.4)]" />

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">College Collaborations</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Empowering institutions with industry-aligned programs and resources.</p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {[
                            { icon: Package, title: 'Project Delivery for Students', desc: 'End-to-end support for final year projects and capstones.' },
                            { icon: Presentation, title: 'Project-Based Classes', desc: 'Curriculum integrated with practical, build-centric learning.' },
                            { icon: Code, title: 'Hands-on Workshops', desc: 'Intensive sessions on latest AI tools and development stacks.' },
                            { icon: Mic2, title: 'Industry-Level Guest Lectures', desc: 'Expert insights on career paths and tech trends.' },
                            { icon: Handshake, title: 'Academic Collaborations', desc: 'Strategic partnerships for curriculum design and labs.' },
                            { icon: Rocket, title: 'Workshops & Bootcamps', desc: 'Interactive sessions on AI, coding, and robotics.' },
                            { icon: Trophy, title: 'Hackathons', desc: 'Exciting coding competitions to foster creativity.' },
                            { icon: FileText, title: 'Curriculum Consulting', desc: 'Helping institutions integrate modern technology into their syllabus.' }
                        ].map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
                                    }}
                                    className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.15)] group"
                                >
                                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors shrink-0">
                                        <Icon className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                                        <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-center"
                    >
                        <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-0.5">
                            Partner With PromptiX <ArrowRight className="w-5 h-5" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Domain Modal */}
            <DomainModal
                isOpen={!!selectedDomain}
                onClose={() => setSelectedDomain(null)}
                domain={selectedDomain}
            />

        </main>
    );
};

export default CollegeStudentsPage;
