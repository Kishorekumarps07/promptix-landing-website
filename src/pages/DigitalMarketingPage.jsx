import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Target, Search, Share2, PenTool, Magnet, Monitor, Zap, PieChart, ArrowUpRight, Map,
    TrendingUp, Users, Rocket, BarChart3, Lightbulb, LineChart, CheckCircle2, Building2, Store, Briefcase
} from 'lucide-react';
import ServiceModal from '../components/ServiceModal';

const DigitalMarketingPage = () => {
    const [selectedSolution, setSelectedSolution] = useState(null);

    const solutions = [
        {
            icon: Target,
            title: 'Digital Strategy & Brand Positioning',
            description: 'Comprehensive roadmaps to define your brand identity and dominate your market niche.',
            techStack: ['SWOT Analysis', 'Brand Archetypes', 'Market Research', 'Persona Mapping', 'Competitor Analysis'],
            capabilities: ['Market Gap Analysis', 'Brand Voice Development', 'Go-to-Market Strategy', 'Long-term Growth Planning'],
            bestFor: 'Startups & Founders',
            channels: ['Strategy', 'Branding', 'Positioning'],
            businessValue: [
                'Establish a clear, differentiated brand identity that resonates with your target audience',
                'Reduce customer acquisition costs by 30-40% with precise market positioning',
                'Build a scalable growth foundation that supports long-term business expansion'
            ],
            ctaLabel: 'Build Your Strategy'
        },
        {
            icon: Search,
            title: 'SEO & Performance Marketing',
            description: 'Data-driven strategies to boost organic rankings and maximize ROI on paid advertising campaigns.',
            techStack: ['Google Ads', 'SEMrush', 'Ahrefs', 'Google Search Console', 'Meta Ads Manager'],
            capabilities: ['Technical SEO Audits', 'Keyword Research & Strategy', 'PPC Campaign Management', 'Conversion Rate Optimization (CRO)'],
            bestFor: 'SMEs & Online Businesses',
            channels: ['SEO', 'Google Ads', 'PPC', 'SEM'],
            businessValue: [
                'Increase organic traffic by 150-300% within 6-12 months with proven SEO strategies',
                'Achieve 3-5x ROAS on paid campaigns through continuous optimization and A/B testing',
                'Dominate search rankings for high-intent keywords that drive qualified leads'
            ],
            ctaLabel: 'Boost Your Visibility'
        },
        {
            icon: Share2,
            title: 'Social Media Management',
            description: 'Engaging content strategies to build community and foster brand loyalty across key platforms.',
            techStack: ['Buffer', 'Hootsuite', 'Canva', 'Sprout Social', 'Meta Business Suite'],
            capabilities: ['Community Management', 'Content Calendar Planning', 'Viral Content Strategy', 'Influencer Collaboration'],
            bestFor: 'Brands & Growth Teams',
            channels: ['Instagram', 'LinkedIn', 'Twitter', 'Facebook'],
            businessValue: [
                'Build an engaged community of 10K+ followers within 6 months across platforms',
                'Increase brand awareness and reach by 200-400% with consistent, quality content',
                'Drive 25-40% of website traffic from social channels through strategic posting'
            ],
            ctaLabel: 'Grow Your Community'
        },
        {
            icon: PenTool,
            title: 'Content Creation & AI Marketing',
            description: 'High-impact storytelling scaled by Generative AI to produce consistent, quality content.',
            techStack: ['ChatGPT-4', 'Midjourney', 'Jasper', 'Copy.ai', 'Adobe Creative Cloud'],
            capabilities: ['AI-Assisted Copywriting', 'Visual Content Generation', 'Blog & Article Writing', 'Video Scripting & Editing'],
            bestFor: 'Marketing Teams',
            channels: ['Blog', 'Video', 'Email', 'Social'],
            businessValue: [
                'Produce 10x more content without sacrificing quality using AI-powered workflows',
                'Reduce content production costs by 50-70% while maintaining brand consistency',
                'Improve engagement rates by 40-60% with data-driven, personalized content'
            ],
            ctaLabel: 'Scale Your Content'
        },
        {
            icon: Magnet,
            title: 'Lead Generation & Funnels',
            description: 'Optimized sales funnels designed to capture high-quality leads and nurture them into customers.',
            techStack: ['ClickFunnels', 'HubSpot', 'Salesforce', 'LeadPages', 'LinkedIn Sales Nav'],
            capabilities: ['Lead Magnet Creation', 'Email Drip Campaigns', 'Landing Page A/B Testing', 'CRM Integration'],
            bestFor: 'SMEs & Sales Teams',
            channels: ['Email', 'Landing Pages', 'Webinars', 'Lead Magnets'],
            businessValue: [
                'Generate 500+ qualified leads per month with optimized funnel strategies',
                'Increase conversion rates by 35-50% through systematic A/B testing and optimization',
                'Reduce cost per lead by 40-60% with targeted campaigns and automation'
            ],
            ctaLabel: 'Generate More Leads'
        },
        {
            icon: Monitor,
            title: 'Website & Landing Page Optimization',
            description: 'Enhancing user experience and site performance to turn visitors into conversions.',
            techStack: ['Hotjar', 'Google Optimize', 'Figma', 'React', 'WordPress'],
            capabilities: ['UX/UI Audits', 'Speed Optimization', 'Mobile Responsiveness', 'Behavioral Analytics'],
            bestFor: 'Online Businesses',
            channels: ['Website', 'Landing Pages', 'E-commerce'],
            businessValue: [
                'Boost conversion rates by 25-45% with data-driven UX/UI improvements',
                'Reduce bounce rates by 30-50% through speed optimization and better user experience',
                'Increase mobile conversions by 40-70% with responsive, mobile-first design'
            ],
            ctaLabel: 'Optimize Your Site'
        },
        {
            icon: Zap,
            title: 'Marketing Automation Tools',
            description: 'Streamlining repetitive tasks and campaigns with intelligent workflow automation.',
            techStack: ['Zapier', 'Make.com', 'ActiveCampaign', 'Mailchimp', 'HubSpot'],
            capabilities: ['Workflow Design', 'Automated Email Sequences', 'Customer Segmentation', 'Cross-Platform Data Sync'],
            bestFor: 'Growth Teams',
            channels: ['Email', 'CRM', 'Multi-channel'],
            businessValue: [
                'Save 20+ hours per week by automating repetitive marketing tasks and workflows',
                'Increase email open rates by 30-50% with personalized, behavior-triggered campaigns',
                'Improve lead nurturing efficiency by 60-80% with automated multi-touch sequences'
            ],
            ctaLabel: 'Automate Your Marketing'
        },
        {
            icon: PieChart,
            title: 'Analytics, Insights & Reporting',
            description: 'Deep-dive data analysis to measure performance and uncover actionable business insights.',
            techStack: ['Google Analytics 4', 'Looker Studio', 'Tableau', 'Mixpanel', 'Supermetrics'],
            capabilities: ['Custom Dashboard Creation', 'ROI Tracking', 'User Journey Mapping', 'Predictive Analytics'],
            bestFor: 'Decision Makers',
            channels: ['Analytics', 'Reporting', 'BI'],
            businessValue: [
                'Make data-driven decisions with real-time visibility into marketing performance',
                'Identify high-ROI channels and reallocate budget for 40-60% better efficiency',
                'Predict customer behavior and trends with AI-powered analytics and forecasting'
            ],
            ctaLabel: 'Get Better Insights'
        },
        {
            icon: Map,
            title: 'Customer Journey & Experience Optimization',
            description: 'Optimize end-to-end customer journeys using UX insights, data, and AI to improve engagement, retention, and conversion rates.',
            techStack: ['Hotjar', 'Google Analytics 4', 'Mixpanel', 'Salesforce', 'Qualtrics'],
            capabilities: ['Journey Mapping', 'Churn Reduction strategies', 'Personalization at Scale', 'CX Strategy & Consulting'],
            bestFor: 'Brands & CX Teams',
            channels: ['Multi-channel', 'Omnichannel', 'CX'],
            businessValue: [
                'Reduce customer churn by 25-40% with personalized journey optimization',
                'Increase customer lifetime value by 50-80% through improved retention strategies',
                'Boost customer satisfaction scores by 30-50% with seamless, omnichannel experiences'
            ],
            ctaLabel: 'Enhance Customer Experience'
        }
    ];

    const whoThisIsFor = [
        {
            icon: Rocket,
            title: 'Startups & Founders',
            description: 'Launch and scale your brand with lean, high-impact marketing strategies'
        },
        {
            icon: Building2,
            title: 'SMEs',
            description: 'Grow your market share with data-driven campaigns and automation'
        },
        {
            icon: Users,
            title: 'Growth & Marketing Teams',
            description: 'Amplify your efforts with AI-powered tools and expert guidance'
        },
        {
            icon: Store,
            title: 'Brands & Online Businesses',
            description: 'Drive sales and build loyalty with optimized digital experiences'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 pt-20">
            {/* Enhanced Hero Section */}
            <section className="relative py-24 px-4 overflow-hidden bg-navy-950/50">
                <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Digital Marketing That <span className="text-orange-500">Drives Real Growth</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
                            Data-driven strategies, creative storytelling, and AI-powered automation to elevate your brand,
                            acquire customers, and maximize ROI.
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
                                    <TrendingUp className="w-6 h-6 text-orange-500" />
                                </div>
                                <p className="text-white font-semibold">3-5x ROI on Campaigns</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                            >
                                <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                    <Zap className="w-6 h-6 text-orange-500" />
                                </div>
                                <p className="text-white font-semibold">AI-Powered Automation</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                            >
                                <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                    <BarChart3 className="w-6 h-6 text-orange-500" />
                                </div>
                                <p className="text-white font-semibold">Real-Time Analytics</p>
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

                {/* Group 1: Strategy & Brand Growth */}
                <div className="mb-20">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-3">Strategy & Brand Growth</h2>
                        <p className="text-gray-400 max-w-3xl">
                            Build a strong foundation with strategic positioning, brand identity, and market differentiation.
                        </p>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[solutions[0]].map((solution, index) => {
                            const Icon = solution.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    onClick={() => setSelectedSolution(solution)}
                                    className="group relative p-8 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20 cursor-pointer h-full flex flex-col"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setSelectedSolution(solution);
                                        }
                                    }}
                                >
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 text-orange-500">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                    <div className="w-14 h-14 rounded-xl bg-navy-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-white/5 shrink-0">
                                        <Icon className="w-7 h-7 text-orange-500" />
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                                            {solution.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed text-sm">
                                            {solution.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Group 2: Acquisition & Performance */}
                <div className="mb-20">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-3">Acquisition & Performance</h2>
                        <p className="text-gray-400 max-w-3xl">
                            Drive qualified traffic and generate high-quality leads with data-driven acquisition strategies.
                        </p>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[solutions[1], solutions[4], solutions[5]].map((solution, index) => {
                            const Icon = solution.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    onClick={() => setSelectedSolution(solution)}
                                    className="group relative p-8 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20 cursor-pointer h-full flex flex-col"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setSelectedSolution(solution);
                                        }
                                    }}
                                >
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 text-orange-500">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                    <div className="w-14 h-14 rounded-xl bg-navy-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-white/5 shrink-0">
                                        <Icon className="w-7 h-7 text-orange-500" />
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                                            {solution.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed text-sm">
                                            {solution.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Group 3: Engagement & Experience */}
                <div className="mb-20">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-3">Engagement & Experience</h2>
                        <p className="text-gray-400 max-w-3xl">
                            Build lasting relationships with compelling content and optimized customer experiences.
                        </p>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[solutions[2], solutions[3], solutions[8]].map((solution, index) => {
                            const Icon = solution.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    onClick={() => setSelectedSolution(solution)}
                                    className="group relative p-8 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20 cursor-pointer h-full flex flex-col"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setSelectedSolution(solution);
                                        }
                                    }}
                                >
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 text-orange-500">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                    <div className="w-14 h-14 rounded-xl bg-navy-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-white/5 shrink-0">
                                        <Icon className="w-7 h-7 text-orange-500" />
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                                            {solution.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed text-sm">
                                            {solution.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Group 4: Automation & Intelligence */}
                <div>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-3">Automation & Intelligence</h2>
                        <p className="text-gray-400 max-w-3xl">
                            Scale efficiently with marketing automation and data-driven insights that inform smarter decisions.
                        </p>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[solutions[6], solutions[7]].map((solution, index) => {
                            const Icon = solution.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    onClick={() => setSelectedSolution(solution)}
                                    className="group relative p-8 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20 cursor-pointer h-full flex flex-col"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setSelectedSolution(solution);
                                        }
                                    }}
                                >
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 text-orange-500">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                    <div className="w-14 h-14 rounded-xl bg-navy-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-white/5 shrink-0">
                                        <Icon className="w-7 h-7 text-orange-500" />
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                                            {solution.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed text-sm">
                                            {solution.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Who This Is For Section */}
            <section className="max-w-7xl mx-auto px-4 py-20 bg-navy-900/30">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Who This Is <span className="text-orange-500">For</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Our digital marketing solutions are designed for businesses at every stage of growth.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {whoThisIsFor.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl bg-gradient-to-br from-navy-900/80 to-navy-800/50 border border-white/10 hover:border-orange-500/30 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
                                    <Icon className="w-6 h-6 text-orange-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* How We Drive Growth Section */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            How We Drive <span className="text-orange-500">Growth</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            A proven, data-driven process to maximize your marketing ROI and accelerate business growth.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {/* Step 1: Analyze */}
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
                            Analyze
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Audit current performance and identify opportunities
                        </p>
                    </motion.div>

                    {/* Step 2: Strategize */}
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
                            Strategize
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Develop data-driven campaigns and content plans
                        </p>
                    </motion.div>

                    {/* Step 3: Execute */}
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
                            <Rocket className="w-6 h-6 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                            Execute
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Launch campaigns across channels with precision
                        </p>
                    </motion.div>

                    {/* Step 4: Optimize */}
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
                            <LineChart className="w-6 h-6 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                            Optimize
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Test, measure, and refine for maximum performance
                        </p>
                    </motion.div>

                    {/* Step 5: Scale */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="relative p-6 rounded-2xl bg-gradient-to-br from-navy-900/80 to-navy-800/50 border border-white/10 hover:border-orange-500/30 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 group"
                    >
                        <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/30">
                            5
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
                            <TrendingUp className="w-6 h-6 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                            Scale
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Expand successful strategies for exponential growth
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
        </div>
    );
};

export default DigitalMarketingPage;
