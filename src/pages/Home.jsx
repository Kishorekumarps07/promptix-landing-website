import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Zap, BarChart2, Users, Calendar, MapPin } from 'lucide-react';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import Features from '../components/Features';
import About from '../components/About';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Backend now enables CORS for localhost and prod, so we use direct URL everywhere
                const response = await fetch('https://promptixcrm.vercel.app/api/events');
                if (response.ok) {
                    const data = await response.json();

                    // Transform and take top 2
                    const transformedEvents = (data.events || []).slice(0, 2).map(event => ({
                        id: event._id,
                        title: event.title,
                        description: event.description,
                        date: new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        }),
                        type: event.type || 'Event',
                        seats: 'Limited Seats',
                        icon: (event.type === 'Webinar') ? BarChart2 : Zap, // Dynamic icon
                        textClass: (event.type === 'Webinar') ? 'text-purple-400' : 'text-blue-400',
                        bgClass: (event.type === 'Webinar') ? 'bg-purple-500/10' : 'bg-blue-500/10',
                        hoverClass: (event.type === 'Webinar') ? 'group-hover:text-purple-400' : 'group-hover:text-blue-400',
                    }));
                    setEvents(transformedEvents);
                }
            } catch (err) {
                console.error('Error fetching home events:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            <SEO
                title="Home"
                description="PromptiX delivers cutting-edge AI solutions, digital marketing, and transformative learning programs for businesses and students."
                keywords="AI solutions, digital marketing, business automation, student programs, AI training, PromptiX"
                url="/"
            />
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
                            href="/events"
                            className="flex items-center gap-2 text-white font-semibold hover:text-orange-400 transition-colors group"
                        >
                            View All Events
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {loading ? (
                            <div className="col-span-full flex justify-center py-10">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                            </div>
                        ) : events.length > 0 ? (
                            events.map(event => {
                                const Icon = event.icon;
                                return (
                                    <div key={event.id} className="bg-navy-900/50 border border-white/10 rounded-2xl p-8 hover:border-orange-500/30 transition-all group">
                                        <div className="flex items-start justify-between mb-8">
                                            <div className={`p-3 ${event.bgClass} rounded-xl`}>
                                                <Icon className={`w-8 h-8 ${event.textClass}`} />
                                            </div>
                                            <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                                                {event.type}
                                            </span>
                                        </div>
                                        <div className="mb-6">
                                            <h3 className={`text-2xl font-bold text-white mb-3 ${event.hoverClass} transition-colors`}>
                                                {event.title}
                                            </h3>
                                            <p className="text-gray-400 line-clamp-2">
                                                {event.description}
                                            </p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6 border-t border-white/5">
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <Calendar className="w-4 h-4 text-orange-500" />
                                                <span>{event.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <Users className="w-4 h-4 text-orange-500" />
                                                <span>{event.seats}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center py-8 bg-white/5 rounded-2xl border border-white/10">
                                <p className="text-gray-400">No upcoming events scheduled at the moment.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Features />
        </>
    );
};

export default Home;
