import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { 
    LayoutGrid, Rocket, Globe, Users, Ticket, Utensils, 
    GraduationCap, LayoutDashboard, Search, Eye, ArrowRight, 
    Monitor, Cpu, Shield, Zap, Layers, Code, Bot, MousePointer2
} from 'lucide-react';
import SEO from '../components/SEO';
import LivePreviewModal from '../components/LivePreviewModal';

const projects = [
    {
        id: 1,
        title: 'PromptiX CRM',
        category: 'Products',
        description: 'A revolutionary enterprise-grade CRM that leverages AI to transform raw customer data into actionable growth strategies.',
        link: 'https://promptixcrm-two.vercel.app/',
        icon: LayoutDashboard,
        tags: ['React', 'Node.js', 'AI'],
        color: 'from-blue-600/20 to-indigo-600/20',
        stats: '40% Efficiency Boost',
        featured: true
    },
    {
        id: 2,
        title: 'Lead Collector',
        category: 'Products',
        description: 'Next-gen lead generation engine that automates the entire funnel from discovery to qualification.',
        link: 'https://leadcollector.vercel.app/',
        icon: Users,
        tags: ['Automation', 'Marketing'],
        color: 'from-amber-600/20 to-orange-600/20',
        stats: '2.5x Conversion Rate'
    },
    {
        id: 3,
        title: 'Outscrapper',
        category: 'Products',
        description: 'High-speed distributed web scraping infrastructure providing deep market insights at global scale.',
        link: 'https://outscrapper.vercel.app/',
        icon: Globe,
        tags: ['Big Data', 'Scraping'],
        color: 'from-emerald-600/20 to-teal-600/20',
        stats: '10M+ Records/Day'
    },
    {
        id: 4,
        title: 'Ticket System',
        category: 'Products',
        description: 'Intelligent support ecosystem with automated triage and sentiment-aware response routing.',
        link: 'https://ticketsystem-wheat.vercel.app/',
        icon: Ticket,
        tags: ['Support', 'UX'],
        color: 'from-violet-600/20 to-fuchsia-600/20',
        stats: '99% CSAT Score'
    },
    {
        id: 5,
        title: 'VIP Catering',
        category: 'Clients',
        description: 'A luxury hospitality platform connecting elite clientele with world-class culinary experiences.',
        link: 'https://www.vipcateringchennai.in/',
        icon: Utensils,
        tags: ['Hospitality', 'UX'],
        color: 'from-rose-600/20 to-pink-600/20',
        stats: 'Premium Experience'
    },
    {
        id: 6,
        title: 'Mr. Coach',
        category: 'Clients',
        description: 'Global mentorship dynamic marketplace designed for direct scale and high-impact career growth.',
        link: 'https://www.mrcoach.in/',
        icon: GraduationCap,
        tags: ['Education', 'SaaS'],
        color: 'from-sky-600/20 to-blue-600/20',
        stats: 'Global Reach'
    }
];

const TiltCard = ({ project, idx, isLarge, setPreviewProject, isMobile }) => {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

    const handleMouseMove = (e) => {
        if (!cardRef.current || isMobile) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const Icon = project.icon;

    return (
        <motion.div
            ref={cardRef}
            layout
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={!isMobile ? { 
                rotateX, rotateY, 
                perspective: 1000,
                transformStyle: "preserve-3d"
            } : {}}
            className={`group relative flex flex-col bg-[#1e293b]/20 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden transition-all duration-700 hover:bg-[#1e293b]/40 hover:border-white/20 ${isLarge ? 'lg:col-span-7 p-8 md:p-10 lg:p-14' : 'lg:col-span-5 p-6 md:p-8 lg:p-10'}`}
        >
            {/* Ambient Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0`} />
            
            {/* 3D Content Wrapper */}
            <div style={!isMobile ? { transform: "translateZ(50px)" } : {}} className="relative z-10 h-full flex flex-col">
                <div className={`flex flex-col h-full ${isLarge ? 'lg:flex-row gap-8 lg:gap-12' : ''}`}>
                    <div className="flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-8 md:mb-10">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[1.5rem] bg-white text-navy-950 flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                <Icon className="w-7 h-7 md:w-8 md:h-8" />
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-orange-500 mb-1">
                                    {project.category}
                                </span>
                                <div className="h-[2px] w-8 bg-orange-500 rounded-full" />
                            </div>
                        </div>

                        <h3 className={`font-bold text-white mb-4 md:mb-6 tracking-tight group-hover:text-orange-400 transition-colors duration-300 ${isLarge ? 'text-2xl md:text-4xl lg:text-5xl' : 'text-2xl md:text-3xl'}`}>
                            {project.title}
                        </h3>
                        
                        <p className="text-gray-400 font-light leading-relaxed mb-8 md:mb-10 flex-grow text-base md:text-lg">
                            {project.description}
                        </p>

                        {/* Interactive Footer */}
                        <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-auto">
                            <button
                                onClick={() => setPreviewProject(project)}
                                className="flex-1 md:flex-none inline-flex items-center justify-center gap-3 py-3.5 md:py-4 px-6 md:px-10 rounded-2xl bg-white text-navy-950 font-black hover:bg-orange-500 hover:text-white transition-all duration-500 shadow-2xl active:scale-95 text-sm"
                            >
                                <Monitor className="w-4 h-4" />
                                <span>Live Demo</span>
                            </button>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group-hover:rotate-[-45deg]"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Secondary Visuals for Large/Bento items */}
                    {isLarge && (
                        <div className="hidden lg:flex flex-col justify-center items-end gap-4 min-w-[180px]">
                            {project.tags.map(tag => (
                                <motion.div 
                                    key={tag} 
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="px-6 py-2 rounded-full border border-white/10 text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
                                >
                                    {tag}
                                </motion.div>
                            ))}
                            <div className="mt-8 pt-8 border-t border-white/5 w-full text-right">
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Performance</p>
                                <p className="text-xl font-bold text-orange-500">{project.stats}</p>
                            </div>
                        </div>
                    )}
                    
                    {/* Mobile Stats/Tags (Visible only on mobile for large cards) */}
                    {isLarge && (
                        <div className="flex lg:hidden items-center justify-between mt-8 pt-8 border-t border-white/5">
                            <div className="flex gap-2">
                                {project.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="text-[9px] uppercase font-bold tracking-widest text-white/40 border border-white/10 px-3 py-1 rounded-full">{tag}</span>
                                ))}
                            </div>
                            <p className="text-sm font-bold text-orange-500">{project.stats}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Inner Reflection Effect */}
            {!isMobile && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            )}
        </motion.div>
    );
};

const ShowcasePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [previewProject, setPreviewProject] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const categories = ['All', 'Products', 'Clients'];

    const filteredProjects = projects.filter(project => {
        const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <main className="min-h-screen mesh-gradient-bg relative selection:bg-orange-500/40 overflow-x-hidden">
            <SEO 
                title="Products and Services"
                description="Cutting-edge AI products and elite digital solutions by PromptiX."
                keywords="ultra-modern portfolio, AI products, bespoke software, PromptiX showcase"
                url="/showcase"
            />

            {/* Global Noise Overlay */}
            <div className="noise-overlay" />

            {/* Dynamic Mesh Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[20%] left-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/10 blur-[100px] md:blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[20%] right-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-orange-600/10 blur-[100px] md:blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 pt-28 md:pt-32 pb-40">
                {/* Immersive Hero Header */}
                <div className="mb-20 md:mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "circOut" }}
                    >
                        <div className="inline-flex items-center gap-3 md:gap-4 bg-white/5 border border-white/10 rounded-full px-5 md:px-6 py-2 mb-8 md:mb-10 backdrop-blur-md">
                            <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-orange-500 animate-ping" />
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/70">Design Focused Ecosystem</span>
                        </div>
                        
                        <h1 className="text-4xl sm:text-5xl md:text-8xl lg:text-[100px] font-bold leading-[1.1] md:leading-[0.9] tracking-tighter mb-8 md:mb-12">
                            <span className="block text-white">Innovation</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-white/40">
                                Redefined.
                            </span>
                        </h1>
                        
                        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
                            <p className="text-lg md:text-2xl text-gray-400 max-w-2xl leading-relaxed font-light italic">
                                Transcending standard development with a fusion of AI precision and futuristic design aesthetics.
                            </p>
                            
                            <div className="h-14 md:h-20 w-[1px] bg-white/10 hidden md:block" />
                            
                            <div className="flex flex-wrap gap-2 md:gap-4">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-6 md:px-10 py-3 md:py-4 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 border ${
                                            selectedCategory === cat 
                                            ? 'bg-white text-navy-950 border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]' 
                                            : 'text-white/40 border-white/10 hover:border-white/30 hover:text-white'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Search Interface */}
                <div className="mb-12 md:mb-20 max-w-3xl">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group h-16 md:h-20"
                    >
                        <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl md:rounded-[2rem] transition-all duration-500 group-focus-within:border-orange-500 group-focus-within:bg-white/10" />
                        <div className="absolute inset-y-0 left-6 md:left-8 flex items-center">
                            <Search className="w-5 h-5 md:w-6 md:h-6 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Type to filter..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="absolute inset-0 bg-transparent border-none focus:ring-0 pl-16 md:pl-20 pr-6 md:pr-8 text-base md:text-xl text-white placeholder-gray-700"
                        />
                    </motion.div>
                </div>

                {/* Ultra-Modern Bento Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, idx) => (
                            <TiltCard 
                                key={project.id}
                                project={project}
                                idx={idx}
                                isLarge={project.featured || (idx === 3)}
                                setPreviewProject={setPreviewProject}
                                isMobile={isMobile}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Premium Empty State */}
                {filteredProjects.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-32 md:py-40 text-center px-4"
                    >
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8 md:mb-10 border border-white/5 animate-pulse">
                            <Cpu className="w-8 h-8 md:w-10 md:h-10 text-gray-700" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">No Data in this Coordinate</h3>
                        <p className="text-gray-500 text-base md:text-lg font-light max-w-md mx-auto">Try refining your filter to discover other parts of our innovation ecosystem.</p>
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
