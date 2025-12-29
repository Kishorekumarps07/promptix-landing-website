import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Layers, Brain, MessageSquare, BarChart, Settings, Cloud, Wrench, Bot, ArrowUpRight, Zap, TrendingUp, Shield, Search, Lightbulb, Hammer, Rocket } from 'lucide-react';
import ServiceModal from '../components/ServiceModal';

import SEO from '../components/SEO';

const BusinessSolutionsPage = () => {
    const [selectedSolution, setSelectedSolution] = useState(null);

    const solutions = [
        {
            icon: Code,
            title: 'Custom Web & App Development',
            description: 'Scalable, high-performance web and mobile applications tailored to your specific business requirements and workflows.',
            techStack: ['React', 'Node.js', 'Flutter', 'TypeScript', 'AWS'],
            capabilities: ['Scalable Microservices Architecture', 'Progressive Web App (PWA) Support', 'High-Performance UI/UX', 'Real-time WebSocket Features'],
            bestFor: 'Startups & SMEs',
            businessValue: [
                'Launch your digital product faster with modern frameworks and proven architecture patterns',
                'Scale seamlessly as your user base grows without rebuilding from scratch',
                'Reduce maintenance costs with clean, well-documented code and automated testing'
            ],
            ctaLabel: 'Discuss Your App Idea'
        },
        {
            icon: Layers,
            title: 'Full Stack Development',
            description: 'End-to-end development expertise covering frontend interfaces, robust backend systems, and secure API integrations.',
            techStack: ['Next.js', 'Django', 'PostgreSQL', 'GraphQL', 'Docker'],
            capabilities: ['End-to-End Encryption', 'Secure RESTful API Design', 'Database Optimization', 'Automated CI/CD Integration'],
            bestFor: 'SMEs & Enterprises',
            businessValue: [
                'Get a complete solution from a single team, eliminating coordination overhead',
                'Ensure data security and compliance with enterprise-grade encryption and authentication',
                'Accelerate time-to-market with integrated frontend, backend, and database development'
            ],
            ctaLabel: 'Get a Solution Proposal'
        },
        {
            icon: Brain,
            title: 'AI, ML & GenAI Solutions',
            description: 'Leverage the power of artificial intelligence with custom models, machine learning pipelines, and generative AI applications.',
            techStack: ['PyTorch', 'TensorFlow', 'OpenAI API', 'Hugging Face', 'Python'],
            capabilities: ['Custom Model Training & Fine-tuning', 'Predictive Analytics Models', 'Advanced NLP Processing', 'Computer Vision Solutions'],
            bestFor: 'Enterprises & Innovation Teams',
            businessValue: [
                'Unlock insights from your data with predictive analytics and intelligent automation',
                'Differentiate your products with cutting-edge AI capabilities that competitors lack',
                'Reduce operational costs by automating complex decision-making processes'
            ],
            ctaLabel: 'Talk to an AI Expert'
        },
        {
            icon: MessageSquare,
            title: 'Chatbot & Voice Assistance',
            description: 'AI-powered chatbots and voice assistants for customer engagement, support, and automation.',
            techStack: ['Vapi.ai', 'ElevenLabs', 'Twilio', 'OpenAI Whisper', 'WebSocket'],
            capabilities: ['< 500ms Response Latency', 'Multi-lingual Support (50+ Languages)', 'Context-Aware Conversations', 'Seamless Human Handoff'],
            bestFor: 'Customer-Facing Teams',
            businessValue: [
                'Provide 24/7 customer support without increasing headcount or operational costs',
                'Improve customer satisfaction with instant, accurate responses in multiple languages',
                'Free up your team to focus on complex issues while AI handles routine inquiries'
            ],
            ctaLabel: 'Explore Chatbot Solutions'
        },
        {
            icon: Wrench,
            title: 'AI Tools',
            description: 'Custom-built AI tools that improve productivity, intelligence, and operational efficiency.',
            techStack: ['LangChain', 'Pinecone', 'Streamlit', 'FastAPI', 'Redis'],
            capabilities: ['RAG (Retrieval-Augmented Generation)', 'Vector Search Implementation', 'Rapid Tool Prototyping', 'Enterprise-Grade Security'],
            bestFor: 'Internal Teams & Operations',
            businessValue: [
                'Boost team productivity with AI-powered tools tailored to your specific workflows',
                'Make better decisions faster by querying your company knowledge base instantly',
                'Reduce training time for new employees with intelligent documentation assistants'
            ],
            ctaLabel: 'Build Custom AI Tools'
        },
        {
            icon: Bot,
            title: 'AI Agents (Make, Zapier, n8n)',
            description: 'Automation-focused AI agents built using Make, Zapier, and n8n to connect systems and optimize workflows.',
            techStack: ['Make.com', 'Zapier', 'n8n', 'OpenAI Assistants', 'Webhooks'],
            capabilities: ['Complex Multi-step Automation', 'Cross-Platform API Integration', 'Intelligent Error Handling', 'Operational Cost Efficiency'],
            bestFor: 'Operations & Automation Teams',
            businessValue: [
                'Eliminate repetitive tasks and free up 20+ hours per week per employee',
                'Connect disparate systems seamlessly without expensive custom integrations',
                'Reduce human error and ensure consistent execution of business processes'
            ],
            ctaLabel: 'Automate Your Workflows'
        },
        {
            icon: BarChart,
            title: 'Data Analytics & BI',
            description: 'Transform raw data into actionable insights with advanced analytics dashboards and business intelligence reporting tools.',
            techStack: ['Tableau', 'PowerBI', 'Pandas', 'Snowflake', 'Apache Spark'],
            capabilities: ['Real-time Data Dashboards', 'Enterprise Data Warehousing', 'AI-Driven Trend Forecasting', 'Automated Business Reporting'],
            bestFor: 'Decision Makers & Analysts',
            businessValue: [
                'Make data-driven decisions with real-time visibility into key business metrics',
                'Identify trends and opportunities before competitors with AI-powered forecasting',
                'Eliminate manual reporting and save 15+ hours per week on data preparation'
            ],
            ctaLabel: 'Transform Your Data'
        },
        {
            icon: Settings,
            title: 'Automation & Workflow',
            description: 'Streamline operations with intelligent robotic process automation (RPA) and custom workflow optimization strategies.',
            techStack: ['UiPath', 'Selenium', 'Python', 'Bash Scripts', 'Cron'],
            capabilities: ['50% average Time Savings', 'Human Error Reduction', '24/7 Automated Operations', 'Legacy System Integration'],
            bestFor: 'Operations & IT Teams',
            businessValue: [
                'Cut operational costs by 40-60% through intelligent process automation',
                'Improve accuracy and compliance by eliminating manual data entry errors',
                'Scale operations without proportionally increasing headcount'
            ],
            ctaLabel: 'Optimize Your Operations'
        },
        {
            icon: Cloud,
            title: 'Cloud & Deployment',
            description: 'Secure cloud infrastructure setup, DevOps implementation, and scalable deployment support for your applications.',
            techStack: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Terraform'],
            capabilities: ['99.99% Uptime SLA Architectures', 'Auto-scaling Infrastructure', 'SOC2 Compliance Standards', 'Disaster Recovery Planning'],
            bestFor: 'Enterprises & Scale-ups',
            businessValue: [
                'Ensure business continuity with enterprise-grade infrastructure and disaster recovery',
                'Reduce infrastructure costs by 30-50% with optimized cloud resource management',
                'Scale globally without performance degradation or security compromises'
            ],
            ctaLabel: 'Discuss Cloud Strategy'
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <main className="min-h-screen bg-navy-950 pt-20">
            {/* Page Hero */}
            <section className="relative py-14 md:py-16 lg:py-24 px-4 overflow-hidden bg-navy-950/50">
                <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
                    <SEO
                        title="Business Solutions"
                        description="Scalable AI-driven business solutions including custom software development, cloud infrastructure, and intelligent automation."
                        keywords="custom software, AI solutions, cloud deployment, business automation, RPA, web development"
                        url="/business-solutions"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Business Solutions That <span className="text-orange-500">Scale With Your Growth</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
                            Enterprise-grade technology solutions powered by AI. We build scalable systems that drive efficiency,
                            accelerate innovation, and transform your business operations.
                        </p>

                        {/* Trust Signals */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                            >
                                <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                    <Zap className="w-6 h-6 text-orange-500" />
                                </div>
                                <p className="text-white font-semibold">Faster Execution & Delivery</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                            >
                                <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-orange-500" />
                                </div>
                                <p className="text-white font-semibold">Data-Driven Decision Making</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                            >
                                <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-orange-500" />
                                </div>
                                <p className="text-white font-semibold">Secure & Scalable Systems</p>
                            </motion.div>
                        </div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <a href="/contact" className="btn-primary w-full sm:w-auto">
                                Get in Touch
                            </a>
                            <button
                                onClick={() => {
                                    document.querySelector('#solutions-grid')?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }}
                                className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition-all border border-white/10 w-full sm:w-auto"
                            >
                                Explore Solutions
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Solutions Grid - Grouped by Business Goals */}
            <section id="solutions-grid" className="max-w-7xl mx-auto px-4 pb-32">

                {/* Group 1: Build & Digital Transformation */}
                <div className="mb-20">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-3">Build & Digital Transformation</h2>
                        <p className="text-gray-400 max-w-3xl">
                            Create powerful digital experiences with custom development, full-stack expertise, and scalable cloud infrastructure.
                        </p>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[solutions[0], solutions[1], solutions[8]].map((solution, index) => {
                            const Icon = solution.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    onClick={() => setSelectedSolution(solution)}
                                    className="group relative p-8 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20 cursor-pointer"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setSelectedSolution(solution);
                                        }
                                    }}
                                >
                                    {/* Hover View Action */}
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 text-orange-500">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>

                                    {/* Icon */}
                                    <div className="w-14 h-14 rounded-xl bg-navy-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-white/5">
                                        <Icon className="w-7 h-7 text-orange-500" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                                        {solution.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        {solution.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Group 2: Intelligence & AI Enablement */}
                <div className="mb-20">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-3">Intelligence & AI Enablement</h2>
                        <p className="text-gray-400 max-w-3xl">
                            Harness the power of artificial intelligence with custom AI solutions, intelligent tools, and automated agents.
                        </p>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[solutions[2], solutions[4], solutions[5], solutions[3]].map((solution, index) => {
                            const Icon = solution.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    onClick={() => setSelectedSolution(solution)}
                                    className="group relative p-8 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20 cursor-pointer"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setSelectedSolution(solution);
                                        }
                                    }}
                                >
                                    {/* Hover View Action */}
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 text-orange-500">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>

                                    {/* Icon */}
                                    <div className="w-14 h-14 rounded-xl bg-navy-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-white/5">
                                        <Icon className="w-7 h-7 text-orange-500" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                                        {solution.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        {solution.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Group 3: Automation & Data Insights */}
                <div>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-3">Automation & Data Insights</h2>
                        <p className="text-gray-400 max-w-3xl">
                            Optimize operations and make data-driven decisions with intelligent automation and advanced analytics.
                        </p>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[solutions[7], solutions[6]].map((solution, index) => {
                            const Icon = solution.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    onClick={() => setSelectedSolution(solution)}
                                    className="group relative p-8 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20 cursor-pointer"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setSelectedSolution(solution);
                                        }
                                    }}
                                >
                                    {/* Hover View Action */}
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 text-orange-500">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>

                                    {/* Icon */}
                                    <div className="w-14 h-14 rounded-xl bg-navy-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-white/5">
                                        <Icon className="w-7 h-7 text-orange-500" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                                        {solution.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        {solution.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* How We Work Section */}
            <section className="max-w-7xl mx-auto px-4 py-14 md:py-16 lg:py-24">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            How We <span className="text-orange-500">Work</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            A structured, value-driven approach to deliver solutions that align with your business goals.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Step 1: Understand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative p-6 rounded-2xl bg-gradient-to-br from-navy-900/80 to-navy-800/50 border border-white/10 hover:border-orange-500/30 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 group"
                    >
                        <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/30">
                            1
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
                            <Search className="w-6 h-6 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                            Understand
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Understand business goals, challenges, and current systems
                        </p>
                    </motion.div>

                    {/* Step 2: Design */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative p-6 rounded-2xl bg-gradient-to-br from-navy-900/80 to-navy-800/50 border border-white/10 hover:border-orange-500/30 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 group"
                    >
                        <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/30">
                            2
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
                            <Lightbulb className="w-6 h-6 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                            Design
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Design solution architecture, workflows, and roadmap
                        </p>
                    </motion.div>

                    {/* Step 3: Build */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="relative p-6 rounded-2xl bg-gradient-to-br from-navy-900/80 to-navy-800/50 border border-white/10 hover:border-orange-500/30 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 group"
                    >
                        <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/30">
                            3
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
                            <Hammer className="w-6 h-6 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                            Build
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Develop, integrate, and test scalable solutions
                        </p>
                    </motion.div>

                    {/* Step 4: Optimize & Scale */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="relative p-6 rounded-2xl bg-gradient-to-br from-navy-900/80 to-navy-800/50 border border-white/10 hover:border-orange-500/30 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 group"
                    >
                        <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/30">
                            4
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
                            <Rocket className="w-6 h-6 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                            Optimize & Scale
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Refine performance and support long-term scalability
                        </p>
                    </motion.div>
                </div>
            </section>


            {/* Modal */}
            <ServiceModal
                isOpen={!!selectedSolution}
                onClose={() => setSelectedSolution(null)}
                service={selectedSolution}
            />
        </main>
    );
};

export default BusinessSolutionsPage;
