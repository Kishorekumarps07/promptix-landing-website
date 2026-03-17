import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Rocket, Globe, Users, Ticket, Utensils, UserCheck, GraduationCap, LayoutDashboard, Search, Eye, ArrowRight, Monitor } from 'lucide-react';
import SEO from '../components/SEO';
import LivePreviewModal from '../components/LivePreviewModal';

const projects = [
    {
        id: 1,
        title: 'PromptiX CRM',
        category: 'Products',
        description: 'Advanced Customer Relationship Management system for modern enterprises with AI-powered insights.',
        link: 'https://promptixcrm-two.vercel.app/',
        icon: LayoutDashboard,
        tags: ['CRM', 'AI', 'Enterprise'],
        color: 'from-blue-500/20 to-purple-500/20'
    },
    {
        id: 2,
        title: 'Lead Collector',
        category: 'Products',
        description: 'Automated lead generation and management platform designed to streamline sales workflows.',
        link: 'https://leadcollector.vercel.app/',
        icon: Users,
        tags: ['Sales', 'Automation', 'Leads'],
        color: 'from-orange-500/20 to-red-500/20'
    },
    {
        id: 3,
        title: 'Outscrapper',
        category: 'Products',
        description: 'Powerful web data extraction tool for market research and deep competitive analysis.',
        link: 'https://outscrapper.vercel.app/',
        icon: Globe,
        tags: ['Data', 'Scraping', 'Analytics'],
        color: 'from-emerald-500/20 to-teal-500/20'
    },
    {
        id: 4,
        title: 'Ticket System',
        category: 'Products',
        description: 'Efficient support ticket management system with intelligent routing and automated responses.',
        link: 'https://ticketsystem-wheat.vercel.app/',
        icon: Ticket,
        tags: ['Support', 'Tickets', 'Workflow'],
        color: 'from-indigo-500/20 to-blue-500/20'
    },
    {
        id: 5,
        title: 'VIP Catering Chennai',
        category: 'Clients',
        description: 'Premium catering services platform featuring menu management and seamless event booking.',
        link: 'https://www.vipcateringchennai.in/',
        icon: Utensils,
        tags: ['Hospitality', 'Web', 'Ecommerce'],
        color: 'from-yellow-500/20 to-orange-500/20'
    },
    {
        id: 6,
        title: 'Eagle Eye Manpower',
        category: 'Clients',
        description: 'Specialized recruitment and staffing platform connecting top talent with corporate opportunities.',
        link: 'https://eagleeyemanpower.in/',
        icon: UserCheck,
        tags: ['HR', 'Recruitment', 'Portal'],
        color: 'from-blue-600/20 to-cyan-500/20'
    },
    {
        id: 7,
        title: 'Mr. Coach',
        category: 'Clients',
        description: 'Global mentorship and professional coaching platform for personalized career growth.',
        link: 'https://www.mrcoach.in/',
        icon: GraduationCap,
        tags: ['Education', 'Coaching', 'Mentorship'],
        color: 'from-purple-600/20 to-pink-500/20'
    }
];

const ShowcasePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [previewProject, setPreviewProject] = useState(null);

    const categories = ['All', 'Products', 'Clients'];

    const filteredProjects = projects.filter(project => {
        const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <main className="min-h-screen bg-navy-950 pt-24 pb-32">
            <SEO 
                title="Our Showcase"
                description="Explore our portfolio of cutting-edge AI products and successful client projects built by PromptiX."
                keywords="portfolio, showcase, AI products, web development, CRM, automation"
                url="/showcase"
            />

            {/* Background Accents */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden select-none">
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-orange-500 font-semibold tracking-wider uppercase text-sm mb-4 block">Our Portfolio</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Showcasing Excellence <br className="hidden md:block" />
                            In <span className="text-orange-500">Every Solution</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            A curated gallery of our in-house products and bespoke client platforms, 
                            demonstrating our commitment to innovation and technical precision.
                        </p>
                    </motion.div>
                </div>

                {/* Filters and Search Bar */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
                    {/* Category Tabs */}
                    <div className="flex p-1.5 bg-navy-900/50 backdrop-blur-md rounded-2xl border border-white/5">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                    selectedCategory === cat 
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Field */}
                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-orange-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search projects or tools..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-navy-900/50 backdrop-blur-md border border-white/5 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all"
                        />
                    </div>
                </div>

                {/* Projects Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => {
                            const Icon = project.icon;
                            return (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4 }}
                                    className="group relative h-full flex flex-col bg-navy-900/40 backdrop-blur-sm border border-white/5 rounded-[2rem] overflow-hidden hover:border-orange-500/30 transition-all duration-300"
                                >
                                    {/* Project Header/Icon Area */}
                                    <div className={`p-8 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                                        <div className="absolute top-0 right-0 p-6">
                                            <span className="px-3 py-1 rounded-full bg-navy-950/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-tighter">
                                                {project.category}
                                            </span>
                                        </div>
                                        <div className="relative z-10 w-20 h-20 rounded-2xl bg-navy-950/80 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                            <Icon className="w-10 h-10 text-orange-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                            {project.title}
                                        </h3>
                                    </div>

                                    {/* Project Meta and Content */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-gray-400">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => setPreviewProject(project)}
                                                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition-all group/btn shadow-lg shadow-orange-500/10 active:scale-95"
                                            >
                                                <Monitor className="w-4 h-4" />
                                                <span>Live View</span>
                                            </button>
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors active:scale-95"
                                                title="Visit Website"
                                            >
                                                <ArrowRight className="w-5 h-5 -rotate-45" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Hover Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-20 text-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                            <Rocket className="w-10 h-10 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
                        <p className="text-gray-500">Try adjusting your search or category filter</p>
                    </motion.div>
                )}
            </div>

            {/* Live Preview Modal */}
            <LivePreviewModal
                isOpen={!!previewProject}
                onClose={() => setPreviewProject(null)}
                project={previewProject}
            />
        </main>
    );
};

export default ShowcasePage;
