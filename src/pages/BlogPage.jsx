import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const BlogPage = () => {
    // Sample blog posts - easily updatable
    const blogPosts = [
        {
            id: 1,
            category: 'Tech',
            title: 'How AI Is Redefining the Future',
            excerpt: 'Artificial Intelligence is transforming industries, careers, and businesses at an unprecedented pace.',
            thumbnail: '/images/blog/ai-future.jpg',
            slug: 'how-ai-is-redefining-the-future'
        },
        {
            id: 2,
            category: 'Digital Marketing',
            title: 'The Smart Way to Build a Digital Brand',
            excerpt: 'Branding is more than a logo—learn how to build trust and grow your business online.',
            thumbnail: '/images/blog/digital-branding.jpg',
            slug: 'the-smart-way-to-build-a-digital-brand'
        },
        {
            id: 3,
            category: 'EdTech',
            title: 'In-Demand Skill Domains for Students',
            excerpt: 'Choosing the right domain today can define your career tomorrow.',
            thumbnail: '/images/blog/students-skills.jpg',
            slug: 'in-demand-skill-domains-for-students'
        }
    ];



    return (
        <>
            <Header />
            <div className="min-h-screen bg-navy-950 pt-20">
                <SEO
                    title="Insights & Articles"
                    description="Explore the latest insights, trends, and articles on AI, Digital Marketing, and EdTech from the PromptiX team."
                    keywords="tech blog, AI trends, digital marketing tips, edtech insights, PromptiX blog"
                    url="/blog"
                />
                {/* Hero Section */}
                <section className="relative py-20 md:py-28 px-4 overflow-hidden">
                    <div className="max-w-6xl mx-auto relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
                                <BookOpen className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-medium text-orange-500">Blog</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Insights & <span className="text-orange-500">Articles</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                                Tech, Digital Marketing & EdTech perspectives from PromptiX
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
                                className="group bg-navy-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 flex flex-col cursor-pointer"
                            >
                                <a href={`/blog/${post.slug}`} className="flex flex-col h-full">
                                    {/* Thumbnail */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={post.thumbnail}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent opacity-60" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        {/* Category Badge */}
                                        <span className="inline-block w-fit px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold mb-3">
                                            {post.category}
                                        </span>

                                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                                            {post.excerpt}
                                        </p>

                                        {/* Read More Link */}
                                        <div className="inline-flex items-center gap-2 text-orange-500 group-hover:text-orange-400 font-medium text-sm transition-colors">
                                            <span>Read More</span>
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </a>
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
