import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPage = () => {
    // Sample blog posts - easily updatable
    const blogPosts = [
        {
            id: 1,
            category: 'Tech',
            title: 'The Fast Growth of the AI Era',
            excerpt: 'Artificial Intelligence is transforming industries, careers, and businesses at an unprecedented pace.',
            thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=675&fit=crop&q=80',
            slug: 'fast-growth-ai-era'
        },
        {
            id: 2,
            category: 'Digital Marketing',
            title: 'How to Brand Your Business in the Digital World',
            excerpt: 'Branding is more than a logo—learn how to build trust and grow your business online.',
            thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop&q=80',
            slug: 'brand-your-business-digital-world'
        },
        {
            id: 3,
            category: 'EdTech',
            title: 'Best Domains Students Should Focus on for the Future',
            excerpt: 'Choosing the right domain today can define your career tomorrow.',
            thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=675&fit=crop&q=80',
            slug: 'best-domains-for-future'
        }
    ];

    const getCategoryColor = (category) => {
        const colors = {
            'Tech': 'from-blue-500 to-cyan-500',
            'Digital Marketing': 'from-orange-500 to-pink-500',
            'EdTech': 'from-purple-500 to-indigo-500'
        };
        return colors[category] || 'from-orange-500 to-purple-500';
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-navy-950 pt-20">
                {/* Hero Section */}
                <section className="relative py-16 md:py-24 px-4 overflow-hidden bg-navy-950/50">
                    <div className="max-w-6xl mx-auto relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
                                <BookOpen className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-medium text-orange-500">Insights & Articles</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Blogs & <span className="text-orange-500">Insights</span>
                            </h1>
                            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                                Tech · Digital Marketing · EdTech
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Blog Grid Section */}
                <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group bg-navy-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 flex flex-col"
                            >
                                {/* Thumbnail */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={post.thumbnail}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent opacity-60" />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(post.category)} text-white text-xs font-semibold shadow-lg`}>
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                                        {post.excerpt}
                                    </p>

                                    {/* Read More Link */}
                                    <a
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-medium text-sm transition-colors group/link"
                                    >
                                        <span>Read More</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                    </a>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </section>

                {/* Coming Soon Section */}
                <section className="max-w-7xl mx-auto px-4 pb-16 md:pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-2xl p-8 md:p-12 text-center"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            More Insights Coming Soon
                        </h3>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            We're constantly sharing new insights, tips, and industry trends. Stay tuned for more articles on technology, digital marketing, and education.
                        </p>
                    </motion.div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default BlogPage;
