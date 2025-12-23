import { ArrowRight, CheckCircle2, Zap, BarChart2, Users, Calendar } from 'lucide-react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            {/* Upcoming Events Section */}
            <section className="bg-navy-950 py-16 md:py-24 border-b border-navy-800/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
                                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                                <span className="text-sm font-medium text-orange-500">Upcoming Opportunities</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                                Events & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Webinars</span>
                            </h2>
                            <p className="text-gray-400 text-lg max-w-2xl">
                                Join our expert-led sessions to level up your skills. From hands-on workshops to insightful webinars, we have something for everyone.
                            </p>
                        </div>
                        <a
                            href="/students-college"
                            className="flex items-center gap-2 text-white font-semibold hover:text-orange-400 transition-colors group"
                        >
                            View All Events
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Event Card 1 */}
                        <div className="bg-navy-900/50 border border-white/10 rounded-2xl p-8 hover:border-orange-500/30 transition-all group">
                            <div className="flex items-start justify-between mb-8">
                                <div className="p-3 bg-blue-500/10 rounded-xl">
                                    <Zap className="w-8 h-8 text-blue-400" />
                                </div>
                                <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                                    Workshop
                                </span>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                    Generative AI Masterclass
                                </h3>
                                <p className="text-gray-400">
                                    Deep dive into building LLM applications. Learn prompt engineering, RAG pipelines, and deploying agents.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6 border-t border-white/5">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Calendar className="w-4 h-4 text-orange-500" />
                                    <span>Jan 15, 2026</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Users className="w-4 h-4 text-orange-500" />
                                    <span>Limited Seats</span>
                                </div>
                            </div>
                        </div>

                        {/* Event Card 2 */}
                        <div className="bg-navy-900/50 border border-white/10 rounded-2xl p-8 hover:border-orange-500/30 transition-all group">
                            <div className="flex items-start justify-between mb-8">
                                <div className="p-3 bg-purple-500/10 rounded-xl">
                                    <BarChart2 className="w-8 h-8 text-purple-400" />
                                </div>
                                <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                                    Webinar
                                </span>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                                    Future of Tech Careers
                                </h3>
                                <p className="text-gray-400">
                                    Navigating the job market in the AI era. Insights from industry leaders on skills that matter in 2026.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6 border-t border-white/5">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Calendar className="w-4 h-4 text-orange-500" />
                                    <span>Jan 22, 2026</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                                    <span>Open for All</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Features />
        </>
    );
};

export default Home;
