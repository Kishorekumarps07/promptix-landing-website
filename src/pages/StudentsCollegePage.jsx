import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    GraduationCap, BookOpen, Users, Brain, Code, Cloud, PenTool, BarChart, Shield, MessageSquare, Briefcase, Award, Zap, Building2, Layout, Megaphone, Sparkles, Mic, Video, Search, Bot, Wrench, Cpu, Palette
} from 'lucide-react';
import DomainModal from '../components/DomainModal';
import AIToolModal from '../components/AIToolModal';

const StudentsCollegePage = () => {
    const [selectedDomain, setSelectedDomain] = useState(null);
    const [selectedAITool, setSelectedAITool] = useState(null);

    const programs = [
        {
            icon: Briefcase,
            title: 'Internships',
            description: 'Gain real-world experience working on live projects with industry experts. Mentorship, portfolio building, and job-ready skills.',
            color: 'text-blue-400'
        },
        {
            icon: Users,
            title: 'Workshops',
            description: 'Intensive, hands-on sessions covering the latest technologies and tools. Learn by doing in a collaborative environment.',
            color: 'text-orange-400'
        },
        {
            icon: BookOpen,
            title: 'Learning Programs',
            description: 'Comprehensive courses designed to bridge the gap between academic theory and industry demands.',
            color: 'text-green-400'
        }
    ];

    const domains = [
        {
            category: 'Artificial Intelligence & Data',
            icon: Brain,
            items: ['Generative AI', 'Machine Learning', 'Data Science', 'Computer Vision/NLP', 'AI Ethics'],
            shortDescription: 'Build intelligent systems that learn and adapt',
            about: 'Dive into the world of AI and data science. Learn to build intelligent systems, train machine learning models, and work with cutting-edge generative AI technologies. Perfect for students passionate about solving complex problems with data-driven solutions.',
            learnings: ['Build and train ML models', 'Work with ChatGPT & LLMs', 'Data preprocessing & analysis', 'Neural networks fundamentals', 'AI ethics & responsible AI', 'Real-world AI applications']
        },
        {
            category: 'Software & Full-Stack',
            icon: Code,
            items: ['React & Next.js', 'Node.js & Express', 'MERN Stack', 'Python & Django', 'Java & Spring Boot'],
            shortDescription: 'Master end-to-end web application development',
            about: 'Become a versatile full-stack developer. Learn to build complete web applications from frontend to backend, work with modern frameworks, and deploy scalable solutions. Gain hands-on experience with industry-standard tech stacks.',
            learnings: ['Frontend development with React', 'Backend APIs with Node.js', 'Database design & management', 'Authentication & security', 'RESTful API development', 'Deployment & hosting']
        },
        {
            category: 'Cloud, DevOps & Automation',
            icon: Cloud,
            items: ['AWS & Azure Cloud', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Intelligent Automation', 'Terraform'],
            shortDescription: 'Deploy and manage scalable cloud infrastructure',
            about: 'Master cloud computing and DevOps practices. Learn to deploy applications on AWS and Azure, containerize with Docker, orchestrate with Kubernetes, and automate workflows. Essential skills for modern software delivery.',
            learnings: ['Cloud platform fundamentals', 'Container orchestration', 'CI/CD pipeline setup', 'Infrastructure as Code', 'Monitoring & logging', 'Cost optimization strategies']
        },
        {
            category: 'UI / UX & Product Design',
            icon: Layout,
            items: ['User Research', 'Wireframing', 'Figma Prototyping', 'Design Systems', 'Usability Testing'],
            shortDescription: 'Create beautiful, user-centered digital experiences',
            about: 'Learn to design intuitive and engaging user experiences. Master user research, wireframing, prototyping in Figma, and usability testing. Build a strong portfolio of design work that solves real user problems.',
            learnings: ['User research methods', 'Wireframing & prototyping', 'Design thinking process', 'Figma mastery', 'Usability testing', 'Design system creation']
        },
        {
            category: 'Digital Marketing & Growth',
            icon: Megaphone,
            items: ['SEO & SEM', 'Social Media Strategy', 'Content Marketing', 'Growth Hacking', 'Email Automation'],
            shortDescription: 'Drive business growth through digital channels',
            about: 'Master digital marketing strategies that drive real business results. Learn SEO, paid advertising, social media marketing, content strategy, and growth hacking techniques. Perfect for aspiring marketers and entrepreneurs.',
            learnings: ['SEO optimization techniques', 'Google Ads & Meta Ads', 'Social media strategy', 'Content marketing', 'Analytics & reporting', 'Growth hacking tactics']
        },
        {
            category: 'Business, Analytics & Product',
            icon: BarChart,
            items: ['Product Management', 'Business Analysis', 'Data Visualization', 'Market Research', 'Agile Methodologies'],
            shortDescription: 'Lead products from concept to market success',
            about: 'Learn to manage products and analyze business data. Understand product lifecycle, conduct market research, create data visualizations, and work with agile methodologies. Ideal for future product managers and business analysts.',
            learnings: ['Product roadmap planning', 'User story creation', 'Data analysis & visualization', 'Market research methods', 'Agile & Scrum practices', 'Stakeholder management']
        },
        {
            category: 'Quality, Security & Assurance',
            icon: Shield,
            items: ['Manual Testing', 'Automation (Selenium)', 'Cybersecurity Basics', 'Performance Testing', 'API Testing'],
            shortDescription: 'Ensure software quality and security',
            about: 'Become a quality assurance expert. Learn manual and automated testing, cybersecurity fundamentals, and performance testing. Ensure software reliability and security in production environments.',
            learnings: ['Test case design', 'Selenium automation', 'Security testing basics', 'API testing with Postman', 'Performance benchmarking', 'Bug tracking & reporting']
        },
        {
            category: 'Content & Communication',
            icon: MessageSquare,
            items: ['Technical Writing', 'Copywriting', 'Business Communication', 'Video Production', 'Brand Storytelling'],
            shortDescription: 'Craft compelling content that engages audiences',
            about: 'Master the art of communication and content creation. Learn technical writing, copywriting, video production, and brand storytelling. Perfect for aspiring content creators, writers, and communication specialists.',
            learnings: ['Technical documentation', 'Persuasive copywriting', 'Video editing & production', 'Brand voice development', 'Content strategy', 'Storytelling techniques']
        }
    ];

    const benefits = [
        { icon: Award, title: 'Industry Recognized Certificates' },
        { icon: Zap, title: 'Live Project Experience' },
        { icon: Users, title: '1-on-1 Mentorship' },
        { icon: Building2, title: 'Placement Assistance' }
    ];

    const aiToolCategories = [
        {
            icon: Brain,
            title: 'Core LLMs & Generative AI',
            description: 'Master the most powerful language models and generative AI platforms',
            tools: ['ChatGPT', 'Claude', 'Gemini', 'GPT-4', 'Llama', 'Mistral', 'Perplexity', 'Anthropic API'],
            learnings: ['Prompt engineering fundamentals', 'Fine-tuning LLMs', 'Building AI chatbots', 'Context window optimization', 'Multi-modal AI applications', 'Ethical AI usage']
        },
        {
            icon: Code,
            title: 'Prompt Engineering & Coding AI',
            description: 'Learn to write better code faster with AI-powered development tools',
            tools: ['GitHub Copilot', 'Cursor AI', 'Tabnine', 'Codeium', 'Amazon CodeWhisperer', 'Replit AI', 'Sourcegraph Cody'],
            learnings: ['AI-assisted code completion', 'Debugging with AI', 'Code review automation', 'Documentation generation', 'Test case creation', 'Refactoring strategies']
        },
        {
            icon: Mic,
            title: 'Speech, Voice & Audio AI',
            description: 'Create, transcribe, and manipulate audio using cutting-edge AI',
            tools: ['ElevenLabs', 'Whisper AI', 'Descript', 'Murf.ai', 'Play.ht', 'Resemble AI', 'Speechify'],
            learnings: ['Voice cloning techniques', 'Speech-to-text transcription', 'Text-to-speech synthesis', 'Audio editing with AI', 'Podcast production', 'Multilingual voice generation']
        },
        {
            icon: Video,
            title: 'AI Video Creation & Visual Generation',
            description: 'Generate stunning visuals and videos with AI-powered tools',
            tools: ['Midjourney', 'DALL-E', 'Stable Diffusion', 'Runway ML', 'Synthesia', 'D-ID', 'Pika Labs', 'Leonardo AI'],
            learnings: ['Image generation from text', 'Video synthesis and editing', 'AI avatar creation', 'Style transfer techniques', 'Upscaling and enhancement', 'Animation with AI']
        },
        {
            icon: Search,
            title: 'AI Research & Knowledge Discovery',
            description: 'Accelerate research and learning with intelligent search and summarization',
            tools: ['Perplexity AI', 'Elicit', 'Consensus', 'Semantic Scholar', 'ChatPDF', 'Notion AI', 'Mem.ai'],
            learnings: ['AI-powered research methods', 'Document summarization', 'Knowledge graph creation', 'Citation management', 'Literature review automation', 'Fact-checking with AI']
        },
        {
            icon: Bot,
            title: 'AI Agents, Automation & Workflows',
            description: 'Build intelligent agents and automate complex workflows',
            tools: ['AutoGPT', 'LangChain', 'CrewAI', 'Zapier AI', 'Make.com', 'n8n', 'Relevance AI'],
            learnings: ['Building autonomous AI agents', 'Workflow automation', 'Multi-agent systems', 'Task orchestration', 'API integration', 'Process optimization']
        },
        {
            icon: Wrench,
            title: 'AI-Powered Development & Vibe Coding',
            description: 'Experience the future of development with AI-first coding platforms',
            tools: ['v0.dev', 'Bolt.new', 'Lovable', 'Replit Agent', 'Vercel AI SDK', 'Windsurf', 'Cursor Composer'],
            learnings: ['Natural language to code', 'Rapid prototyping', 'AI-driven debugging', 'Component generation', 'Full-stack development with AI', 'Deployment automation']
        },
        {
            icon: Cpu,
            title: 'AI APIs & Model Platforms',
            description: 'Integrate powerful AI capabilities into your applications',
            tools: ['OpenAI API', 'Anthropic API', 'Hugging Face', 'Replicate', 'Together AI', 'Groq', 'Cohere'],
            learnings: ['API integration basics', 'Model selection strategies', 'Cost optimization', 'Rate limiting and scaling', 'Custom model deployment', 'Performance monitoring']
        },
        {
            icon: Palette,
            title: 'AI for Design, Productivity & Content',
            description: 'Supercharge creativity and productivity with AI-powered tools',
            tools: ['Canva AI', 'Adobe Firefly', 'Figma AI', 'Notion AI', 'Jasper', 'Copy.ai', 'Grammarly', 'Gamma'],
            learnings: ['AI-assisted design', 'Content generation', 'Writing enhancement', 'Presentation creation', 'Brand asset generation', 'Marketing copy optimization']
        }
    ];

    return (
        <div className="bg-navy-950 pt-20">

            {/* Hero Section */}
            <section className="relative py-12 md:py-16 px-4">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-sm font-medium text-gray-300">Online & Offline Programs</span>
                        </div>
                        <h1 className="heading-xl text-white mb-6">
                            Students & <span className="text-orange-500">College Programs</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                            Bridge the gap between campus and corporate. We offer industry-focused internships,
                            hands-on workshops, and transformative learning experiences.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="/contact" className="btn-primary w-full sm:w-auto">Apply Now</a>
                            <a href="/contact" className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition-all border border-white/10 w-full sm:w-auto text-center">Partner With Us</a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Program Types */}
            <section className="max-w-7xl mx-auto px-4 py-10 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {programs.map((program, index) => {
                        const Icon = program.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl group"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-navy-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner`}>
                                    <Icon className={`w-7 h-7 ${program.color}`} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{program.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{program.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Internship Domains */}
            <section className="max-w-7xl mx-auto px-4 py-10 md:py-12">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Internship Domains</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Diverse opportunities designed to match your passion and build your career foundation.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {domains.map((domain, index) => {
                        const Icon = domain.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setSelectedDomain(domain)}
                                className="p-6 rounded-2xl bg-navy-900/50 border border-white/10 hover:border-white/20 hover:bg-navy-800/80 transition-all group cursor-pointer"
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        setSelectedDomain(domain);
                                    }
                                }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <Icon className="w-6 h-6 text-orange-500" />
                                    <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors">{domain.category}</h3>
                                </div>
                                <ul className="space-y-2">
                                    {domain.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                                            <span className="w-1 h-1 rounded-full bg-orange-500/50"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* AI Tools Section */}
            <section className="max-w-7xl mx-auto px-4 py-10 md:py-12">
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-white/10 mb-4 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-medium text-gray-300">Future-Ready Skills</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Industry-Grade <span className="text-orange-500">AI Tools</span> for Students
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Master the AI tools that top companies use. Get hands-on experience with cutting-edge technologies that will set you apart in the job market.
                        </p>
                    </motion.div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {aiToolCategories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setSelectedAITool(category)}
                                className="p-6 rounded-2xl bg-gradient-to-br from-navy-900/80 to-navy-800/50 border border-white/10 hover:border-orange-500/30 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 group cursor-pointer"
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        setSelectedAITool(category);
                                    }
                                }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
                                    <Icon className="w-6 h-6 text-orange-500" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                    {category.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {category.description}
                                </p>
                                <div className="mt-4 flex items-center gap-2 text-sm text-orange-500 font-medium">
                                    <span>Explore Tools</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Benefits & CTA */}
            <section className="max-w-7xl mx-auto px-4 py-10 md:py-12 pb-16">
                <div className="rounded-3xl bg-gradient-to-r from-navy-900 to-navy-800 border border-white/10 p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">Why Choose PromptiX?</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {benefits.map((benefit, i) => {
                                    const Icon = benefit.icon;
                                    return (
                                        <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                            <Icon className="w-5 h-5 text-orange-500" />
                                            <span className="text-white font-medium">{benefit.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="text-center lg:text-right">
                            <h3 className="text-2xl font-bold text-white mb-4">Ready to kickstart your career?</h3>
                            <p className="text-gray-400 mb-8 max-w-md ml-auto">
                                Whether you're a student looking for experience or a college seeking industry partnership, we have the perfect program for you.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-end">
                                <a href="/contact" className="btn-primary">Apply for Internship</a>
                                <a href="/contact" className="px-6 py-3 rounded-lg bg-white text-navy-900 font-bold hover:bg-gray-200 transition-colors text-center">Contact for Colleges</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Domain Modal */}
            <DomainModal
                isOpen={!!selectedDomain}
                onClose={() => setSelectedDomain(null)}
                domain={selectedDomain}
            />

            {/* AI Tool Modal */}
            <AIToolModal
                isOpen={!!selectedAITool}
                onClose={() => setSelectedAITool(null)}
                category={selectedAITool}
            />

        </div>
    );
};

export default StudentsCollegePage;
