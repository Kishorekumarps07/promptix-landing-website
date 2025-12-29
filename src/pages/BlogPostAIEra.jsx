import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPostAIEra = () => {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-navy-950 pt-20">
                {/* Sticky Back Button */}
                <div className="fixed top-24 left-4 z-50 hidden lg:block">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 backdrop-blur-xl border border-orange-500/20 text-orange-500 hover:bg-orange-500/20 hover:border-orange-500/30 transition-all duration-300 shadow-lg hover:shadow-orange-500/20 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <span className="text-sm font-medium">Back to Blog</span>
                    </Link>
                </div>

                {/* Hero Section */}
                <section className="relative py-16 md:py-24 px-4 overflow-hidden">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Back Button */}
                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 mb-8 transition-colors group"
                            >
                                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                <span>Back to Blogs</span>
                            </Link>

                            {/* Category Badge */}
                            <div className="mb-6">
                                <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold">
                                    Tech
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                How AI Is Redefining the Future
                            </h1>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-8">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>December 19, 2024</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>5 min read</span>
                                </div>
                            </div>

                            {/* Featured Image */}
                            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12">
                                <img
                                    src="/images/blog/ai-future.jpg"
                                    alt="Futuristic AI interfacing with human intelligence - PromptiX Blog"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent opacity-60" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="max-w-4xl mx-auto px-4 pb-16 md:pb-24">
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="prose prose-lg prose-invert max-w-none"
                    >
                        {/* Introduction */}
                        <div className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-xl p-6 mb-8">
                            <p className="text-lg text-gray-300 leading-relaxed m-0">
                                Artificial Intelligence is transforming industries, careers, and businesses at an unprecedented pace. What once seemed like science fiction is now reshaping how we work, learn, and innovate.
                            </p>
                        </div>

                        {/* Section 1: Rapid Growth of AI */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-gradient-to-b from-orange-500 to-purple-500 rounded-full"></span>
                                The Rapid Growth of AI
                            </h2>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p>
                                    Over the past few years, AI has evolved from a niche technology to a mainstream tool used by millions worldwide. From ChatGPT and other language models to advanced image generation and automation tools, AI is becoming more accessible and powerful every day.
                                </p>
                                <p>
                                    The speed of AI adoption is staggering. What took decades to develop is now being improved upon in months. Companies across all sectors—from healthcare to finance, education to entertainment—are integrating AI to streamline operations, enhance customer experiences, and drive innovation.
                                </p>
                                <p>
                                    This rapid growth isn't just about technology; it's about a fundamental shift in how we approach problem-solving and productivity. AI is no longer just for tech giants—it's for everyone.
                                </p>
                            </div>
                        </div>

                        {/* Section 2: Impact on Businesses */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-gradient-to-b from-orange-500 to-purple-500 rounded-full"></span>
                                How AI Impacts Businesses
                            </h2>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p>
                                    For businesses, AI is a game-changer. It enables automation of repetitive tasks, freeing up human talent for more strategic and creative work. Customer service chatbots, predictive analytics, and intelligent marketing tools are just a few examples of how AI is transforming business operations.
                                </p>
                                <p>
                                    Small and medium-sized businesses, in particular, are benefiting from AI's democratization. Tools that were once expensive and complex are now affordable and user-friendly, allowing businesses of all sizes to compete on a level playing field.
                                </p>
                                <div className="bg-navy-900/50 border border-white/10 rounded-xl p-6 my-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Key Business Benefits:</h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 mt-1">•</span>
                                            <span><strong>Increased Efficiency:</strong> Automate routine tasks and focus on high-value activities</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 mt-1">•</span>
                                            <span><strong>Better Decision Making:</strong> Data-driven insights for smarter business strategies</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 mt-1">•</span>
                                            <span><strong>Enhanced Customer Experience:</strong> Personalized interactions and 24/7 support</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 mt-1">•</span>
                                            <span><strong>Cost Reduction:</strong> Lower operational costs through intelligent automation</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Impact on Careers */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-gradient-to-b from-orange-500 to-purple-500 rounded-full"></span>
                                AI's Impact on Careers
                            </h2>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p>
                                    The rise of AI is reshaping the job market. While some fear job displacement, the reality is more nuanced. AI is creating new roles and opportunities while transforming existing ones. The key is adaptation and continuous learning.
                                </p>
                                <p>
                                    Professionals who embrace AI as a tool to enhance their capabilities are finding themselves more productive and valuable. From content creators using AI writing assistants to developers leveraging AI-powered coding tools, the integration of AI into daily work is becoming the norm.
                                </p>
                                <p>
                                    The future belongs to those who can work alongside AI, using it to amplify their skills rather than compete against it. This means developing a hybrid skill set—combining domain expertise with AI literacy.
                                </p>
                            </div>
                        </div>

                        {/* Section 4: Why AI Skills Matter */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-gradient-to-b from-orange-500 to-purple-500 rounded-full"></span>
                                Why AI Skills Are Essential for the Future
                            </h2>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p>
                                    Understanding AI isn't just for data scientists and engineers anymore. Basic AI literacy is becoming as fundamental as computer literacy was in the 1990s. Here's why:
                                </p>
                                <div className="bg-navy-900/50 border border-white/10 rounded-xl p-6 my-6">
                                    <ul className="space-y-4 text-gray-300">
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 font-bold mt-1">1.</span>
                                            <div>
                                                <strong className="text-white">Competitive Advantage:</strong> Professionals with AI skills stand out in the job market and command higher salaries.
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 font-bold mt-1">2.</span>
                                            <div>
                                                <strong className="text-white">Future-Proofing:</strong> As AI becomes more prevalent, those who understand it will be better positioned for emerging opportunities.
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 font-bold mt-1">3.</span>
                                            <div>
                                                <strong className="text-white">Problem-Solving:</strong> AI tools enable faster, more creative solutions to complex challenges.
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 font-bold mt-1">4.</span>
                                            <div>
                                                <strong className="text-white">Innovation:</strong> Understanding AI opens doors to creating new products, services, and business models.
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Section 5: How to Adapt */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-gradient-to-b from-orange-500 to-purple-500 rounded-full"></span>
                                How Companies and Students Should Adapt
                            </h2>
                            <div className="space-y-6 text-gray-300 leading-relaxed">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-3">For Companies:</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 mt-1">→</span>
                                            <span><strong>Invest in Training:</strong> Upskill your workforce with AI literacy programs</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 mt-1">→</span>
                                            <span><strong>Start Small:</strong> Begin with pilot projects to understand AI's potential in your context</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 mt-1">→</span>
                                            <span><strong>Foster Innovation:</strong> Create a culture that encourages experimentation with AI tools</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 mt-1">→</span>
                                            <span><strong>Partner with Experts:</strong> Work with AI solution providers to implement best practices</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-white mb-3">For Students and Professionals:</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 mt-1">→</span>
                                            <span><strong>Learn the Basics:</strong> Understand fundamental AI concepts and tools</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 mt-1">→</span>
                                            <span><strong>Hands-On Practice:</strong> Experiment with AI tools in your field of interest</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 mt-1">→</span>
                                            <span><strong>Stay Updated:</strong> Follow AI trends and developments in your industry</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 mt-1">→</span>
                                            <span><strong>Build Projects:</strong> Apply AI to solve real-world problems and build your portfolio</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Conclusion */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-gradient-to-b from-orange-500 to-purple-500 rounded-full"></span>
                                The Path Forward
                            </h2>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p>
                                    The AI era is here, and its growth shows no signs of slowing down. The question isn't whether AI will impact your business or career—it's how quickly you can adapt to leverage its potential.
                                </p>
                                <p>
                                    Success in this new era requires a mindset shift: viewing AI not as a threat but as a powerful tool that can amplify human creativity, productivity, and innovation. Those who embrace this change early will be best positioned to thrive in the AI-driven future.
                                </p>
                                <p>
                                    The time to start your AI journey is now. Whether you're a business leader looking to transform operations or a student preparing for tomorrow's job market, developing AI skills and understanding is no longer optional—it's essential.
                                </p>
                            </div>
                        </div>

                        {/* PromptiX Mention */}
                        <div className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-xl p-8 mt-12">
                            <p className="text-gray-300 leading-relaxed mb-4">
                                At <strong className="text-white">PromptiX</strong>, we're committed to supporting businesses and students in their AI-driven growth journey. Through our comprehensive solutions and training programs, we help organizations and individuals harness the power of AI to achieve their goals.
                            </p>
                            <p className="text-gray-400 text-sm">
                                Ready to embrace the AI era? Let's grow together.
                            </p>
                        </div>
                    </motion.article>

                    {/* Share/Back Section */}
                    <div className="mt-16 pt-8 border-t border-white/10">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            <span>Back to all blogs</span>
                        </Link>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default BlogPostAIEra;
