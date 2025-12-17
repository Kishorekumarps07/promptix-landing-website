import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, Target, TrendingUp } from 'lucide-react';
import TeamMemberModal from '../components/TeamMemberModal';

const TeamPage = () => {
    const [selectedMember, setSelectedMember] = useState(null);

    // Team members data - easily updatable
    const teamMembers = [
        {
            role: 'Founder & CEO',
            focus: 'AI strategy, business vision, and driving innovation across all solutions',
            highlights: ['AI Strategy', 'Product Vision', 'Business Growth'],
            bio: 'Leading PromptiX with a vision to democratize AI and cutting-edge technology for businesses of all sizes. With over a decade of experience in artificial intelligence and digital transformation, focused on building scalable systems that empower teams and drive sustainable growth.',
            skills: ['AI Strategy', 'Business Development', 'Product Management', 'Team Leadership', 'Digital Transformation'],
            tools: ['ChatGPT', 'Claude', 'Gemini', 'Strategic Planning Tools', 'Analytics Platforms'],
            linkedin: null // Placeholder for LinkedIn URL
        },
        {
            role: 'Full Stack Developer',
            focus: 'Building scalable web applications with modern frameworks and cloud infrastructure',
            highlights: ['React', 'Node.js', 'Cloud Architecture'],
            bio: 'Architecting and building robust, scalable applications that power businesses. Expertise spanning frontend frameworks, backend systems, cloud infrastructure, and DevOps practices ensures every solution is built for performance, security, and growth.',
            skills: ['React', 'Node.js', 'TypeScript', 'Cloud Architecture', 'DevOps', 'System Design'],
            tools: ['React', 'Next.js', 'Node.js', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'Git'],
            linkedin: null
        },
        {
            role: 'Senior Graphic Designer',
            focus: 'Creating stunning visual identities and user interfaces that captivate audiences',
            highlights: ['Brand Design', 'UI/UX', 'Visual Identity'],
            bio: 'Crafting visual experiences that are both beautiful and functional. Specializing in brand identity, user interface design, and creative direction. Every design tells a story and creates an emotional connection with the audience.',
            skills: ['Brand Design', 'UI/UX Design', 'Visual Identity', 'Typography', 'Color Theory', 'Design Systems'],
            tools: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe After Effects', 'Sketch', 'InVision'],
            linkedin: null
        },
        {
            role: 'Graphic Designer',
            focus: 'Designing engaging marketing materials and social media content that converts',
            highlights: ['Marketing Design', 'Social Media', 'Content Creation'],
            bio: 'Bringing ideas to life through compelling visual content. Focused on creating marketing materials, social media graphics, and digital assets that drive engagement and conversions. Passionate about staying ahead of design trends and delivering work that stands out.',
            skills: ['Marketing Design', 'Social Media Graphics', 'Content Creation', 'Motion Graphics', 'Illustration'],
            tools: ['Canva', 'Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Adobe Premiere Pro', 'Procreate'],
            linkedin: null
        }
    ];

    // Team values
    const teamValues = [
        {
            icon: Users,
            title: 'Collaboration',
            description: 'We work together seamlessly, combining our diverse skills to deliver exceptional results.'
        },
        {
            icon: Lightbulb,
            title: 'AI-First Mindset',
            description: 'We leverage AI and automation to work smarter, faster, and more efficiently.'
        },
        {
            icon: Target,
            title: 'Quality-Driven',
            description: 'We never compromise on quality, ensuring every deliverable exceeds expectations.'
        },
        {
            icon: TrendingUp,
            title: 'Continuous Learning',
            description: 'We stay ahead of the curve, constantly learning and adapting to new technologies.'
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
            {/* Hero Section */}
            <section className="relative py-24 px-4 overflow-hidden bg-navy-950/50">
                <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Meet the Team Behind <span className="text-orange-500">PromptiX</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            A small, focused team of experts leveraging AI and modern technology to deliver
                            exceptional solutions. Quality over quantity, innovation over convention.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Team Grid Section */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            onClick={() => setSelectedMember(member)}
                            className="group relative p-6 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer flex flex-col h-full"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    setSelectedMember(member);
                                }
                            }}
                        >
                            {/* Role Badge */}
                            <div className="mb-4">
                                <div className="inline-block px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3">
                                    <span className="text-xs font-semibold text-orange-400">
                                        {member.role.split(' ')[0]}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                                    {member.role}
                                </h3>
                            </div>

                            {/* Focus Description */}
                            <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                                {member.focus}
                            </p>

                            {/* Skill Highlights */}
                            <div className="space-y-2 pt-4 border-t border-white/5">
                                {member.highlights.map((highlight, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-orange-500 group-hover:shadow-[0_0_6px_rgba(249,115,22,0.6)] transition-shadow" />
                                        <span className="text-xs text-gray-300">{highlight}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Click Hint */}
                            <div className="mt-4 pt-3 border-t border-white/5 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-xs text-orange-400 font-medium">Click to view details →</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Team Values Section */}
            <section className="max-w-7xl mx-auto px-4 py-20 bg-navy-900/30">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Our <span className="text-orange-500">Values</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            The principles that guide our work and define how we deliver exceptional results.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamValues.map((value, index) => {
                        const Icon = value.icon;
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
                                    {value.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Team Member Modal */}
            <TeamMemberModal
                isOpen={!!selectedMember}
                onClose={() => setSelectedMember(null)}
                member={selectedMember}
            />
        </div>
    );
};

export default TeamPage;
