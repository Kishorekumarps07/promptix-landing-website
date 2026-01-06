import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, ArrowRight, Zap, BarChart2, Filter } from 'lucide-react';
import SEO from '../components/SEO';

const EventsPage = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Backend now enables CORS for localhost and prod, so we use direct URL everywhere
                const response = await fetch('https://promptixcrm.vercel.app/api/events');
                if (!response.ok) {
                    throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();

                // Transform API data to match UI component structure
                const transformedEvents = (data.events || []).map(event => ({
                    id: event._id,
                    title: event.title,
                    description: event.description,
                    date: new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    }),
                    time: new Date(event.date).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                    }) === '12:00 AM' ? 'Time TBA' : new Date(event.date).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                    duration: '2 hours', // Default as it's not in API
                    type: event.type || 'Event',
                    seats: 'Limited Seats', // Default
                    icon: (event.type === 'Webinar') ? BarChart2 : Zap,
                    color: (event.type === 'Webinar') ? 'purple' : 'blue',
                    location: 'Online',
                    registrationLink: '/contact',
                    status: event.status
                }));

                setEvents(transformedEvents);
            } catch (err) {
                console.error('Error fetching events:', err);
                setError('Failed to load events. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const filters = [
        { id: 'all', label: 'All Events' },
        { id: 'Workshop', label: 'Workshops' },
        { id: 'Webinar', label: 'Webinars' }
    ];

    const filteredEvents = activeFilter === 'all'
        ? events
        : events.filter(event => event.type === activeFilter);

    const getColorClasses = (color) => {
        const colors = {
            blue: {
                bg: 'bg-blue-500/10',
                text: 'text-blue-400',
                border: 'border-blue-500/30',
                hover: 'hover:border-blue-500/50'
            },
            purple: {
                bg: 'bg-purple-500/10',
                text: 'text-purple-400',
                border: 'border-purple-500/30',
                hover: 'hover:border-purple-500/50'
            },
            orange: {
                bg: 'bg-orange-500/10',
                text: 'text-orange-400',
                border: 'border-orange-500/30',
                hover: 'hover:border-orange-500/50'
            },
            green: {
                bg: 'bg-green-500/10',
                text: 'text-green-400',
                border: 'border-green-500/30',
                hover: 'hover:border-green-500/50'
            }
        };
        return colors[color] || colors.blue;
    };

    return (
        <main className="bg-navy-950 min-h-screen pt-20">
            <SEO
                title="Events & Webinars"
                description="Join PromptiX expert-led workshops and webinars. From AI masterclasses to digital marketing bootcamps, level up your skills with hands-on learning."
                keywords="tech events, AI workshops, webinars, digital marketing bootcamp, coding workshops, career webinars"
                url="/events"
            />

            {/* Hero Section */}
            <section className="relative py-16 md:py-24 px-4 overflow-hidden border-b border-navy-800/50">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/5 blur-[120px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            <span className="text-sm font-medium text-orange-500">Upcoming Opportunities</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Events & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Webinars</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Join our expert-led sessions to level up your skills. From hands-on workshops to insightful webinars, we have something for everyone.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Tabs */}
            <section className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <Filter className="w-5 h-5 text-gray-400" />
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${activeFilter === filter.id
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Upcoming Events Grid */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-400 text-lg mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event, index) => {
                                const Icon = event.icon;
                                const colorClasses = getColorClasses(event.color);

                                return (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`bg-navy-900/50 border ${colorClasses.border} ${colorClasses.hover} rounded-2xl p-8 transition-all group hover:-translate-y-1`}
                                    >
                                        <div className="flex items-start justify-between mb-6">
                                            <div className={`p-3 ${colorClasses.bg} rounded-xl`}>
                                                <Icon className={`w-8 h-8 ${colorClasses.text}`} />
                                            </div>
                                            <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                                                {event.type}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                                            {event.title}
                                        </h3>
                                        <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
                                            {event.description}
                                        </p>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-3 text-gray-300">
                                                <Calendar className="w-5 h-5 text-orange-400" />
                                                <span>{event.date}</span>
                                            </div>
                                            {event.time !== 'Time TBA' && (
                                                <div className="flex items-center gap-3 text-gray-300">
                                                    <Clock className="w-5 h-5 text-orange-400" />
                                                    <span>{event.time}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-3 text-gray-300">
                                                <MapPin className="w-5 h-5 text-orange-400" />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>

                                        <a
                                            href={event.registrationLink}
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all shadow-lg hover:shadow-orange-500/20 group"
                                        >
                                            Register Now
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center py-16">
                                <p className="text-gray-400 text-lg">No upcoming events found for this category.</p>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <section className="max-w-5xl mx-auto px-4 py-16">
                <div className="rounded-3xl bg-gradient-to-r from-orange-600 to-orange-500 p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-pattern opacity-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Don't See What You're Looking For?
                        </h2>
                        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                            We regularly host custom workshops and corporate training sessions. Get in touch to discuss your specific needs.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block px-10 py-4 rounded-xl bg-white text-orange-600 font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default EventsPage;
