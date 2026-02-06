import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, Target, TrendingUp, User } from 'lucide-react';
import TeamMemberModal from '../components/TeamMemberModal';
import SEO from '../components/SEO';

const TeamPage = () => {
    const [selectedMember, setSelectedMember] = useState(null);

    // Team members data - easily updatable
    const teamMembers = [
        {
            name: 'MD Jaffer',
            role: 'Founder & CEO',
            image: '/images/team/md-jaffer.png',
            focus: 'Driving business strategy, partnerships, and long-term growth vision for PromptiX.',
            highlights: ['Business Strategy', 'Growth Planning', 'Partnerships'],
            bio: 'Driving business strategy, partnerships, and long-term growth vision for PromptiX. Dedicated to building lasting value through strategic alliances and sustainable business practices.',
            skills: ['Business Strategy', 'Growth Planning', 'Partnerships', 'Strategic Management'],
            tools: ['Business Analytics', 'Strategic Planning', 'Partnership Development'],
            linkedin: null
        },

        {
            name: 'Kishore Kumar P S',
            role: 'Full Stack Developer',
            badge: 'Developer',
            image: '/images/team/kishore-kumar.png',
            focus: 'Building scalable web applications with modern frameworks and cloud infrastructure',
            highlights: [
                'Frontend (HTML, CSS, JavaScript, React)',
                'Backend (Node.js)',
                'APIs (RESTful, GPTs)'
            ],
            bio: 'Architecting and building robust, scalable applications that power businesses. Expertise spanning frontend frameworks, backend systems, cloud infrastructure, and DevOps practices ensures every solution is built for performance, security, and growth.',
            skills: [
                'Frontend (HTML, CSS, JavaScript, React)',
                'Backend (Node.js)',
                'APIs (RESTful, GPTs)',
                'Google Cloud, Vercel, Render'
            ],
            tools: ['React', 'Next.js', 'Node.js', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'Git'],
            linkedin: null
        },

        {
            name: 'Unknown',
            role: 'Graphics Designer & Digital Marketer',
            image: null,
            focus: 'Designing engaging marketing materials and social media content that converts',
            highlights: ['Marketing Design', 'Social Media', 'Content Creation'],
            bio: 'Bringing ideas to life through compelling visual content. Focused on creating marketing materials, social media graphics, and digital assets that drive engagement and conversions. Passionate about staying ahead of design trends and delivering work that stands out.',
            skills: ['Marketing Design', 'Social Media Graphics', 'Content Creation', 'Motion Graphics', 'Illustration'],
            tools: ['Canva', 'Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Adobe Premiere Pro', 'Procreate'],
            linkedin: null
        },

        {
            name: 'Kamalesh Kumar M S',
            role: 'Full Stack Developer',
            badge: 'Developer',
            image: '/images/team/kamalesh-kumar.png',
            focus: 'Building scalable web applications with modern frameworks and cloud infrastructure',
            highlights: [
                'Frontend Development',
                'Backend Development',
                'Full Stack Solutions'
            ],
            bio: 'Passionate full stack developer dedicated to creating robust and scalable web applications. Expertise in both frontend and backend technologies ensures seamless end-to-end development and delivery of high-quality solutions.',
            skills: [
                'Frontend (HTML, CSS, JavaScript, React)',
                'Backend (Node.js)',
                'Database Management',
                'API Development'
            ],
            tools: ['React', 'Node.js', 'Express', 'MongoDB', 'Git', 'VS Code'],
            linkedin: null
        },

        {
            name: 'Suriya Sekar S',
            role: 'Admin & Backend',
            image: '/images/team/suriya-sekar.jpg',
            focus: 'Managing operations and building robust backend systems to support business growth',
            highlights: ['Operations Management', 'Backend Development', 'System Administration'],
            bio: 'Ensuring operational excellence through efficient administrative management while developing and maintaining backend infrastructure. Expertise in both business operations and technical implementation supports seamless organizational growth.',
            skills: ['Operations Management', 'Backend Development', 'Node.js', 'Database Management', 'System Administration'],
            tools: ['Node.js', 'Express', 'MongoDB', 'Microsoft Office', 'Google Workspace'],
            linkedin: null
        }
    ];

    // Split team into sections
    const leadership = teamMembers.slice(0, 2);
    const regularTeam = teamMembers.slice(2);

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

    // Helper to render card
    const renderMemberCard = (member, index) => (
        <motion.div
            key={index}
            variants={itemVariants}
            onClick={() => setSelectedMember(member)}
            className="group relative p-6 md:p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl hover:from-white/[0.12] hover:to-white/[0.05] hover:border-orange-500/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_-15px_rgba(249,115,22,0.4)] cursor-pointer flex flex-col h-full overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedMember(member);
                }
            }}
        >
            {/* Image (if available) - Centered and larger for impact */}
            {/* Image (if available) or Placeholder - Centered and larger for impact */}
            <div className="flex justify-center mb-8 relative z-10">
                <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-orange-500/30 shadow-[0_0_40px_rgba(249,115,22,0.25)] group-hover:scale-110 group-hover:border-orange-500/60 group-hover:shadow-[0_0_60px_rgba(249,115,22,0.4)] transition-all duration-500 bg-navy-900">

                    {member.image ? (
                        <img
                            src={member.image}
                            alt={`${member.name} - ${member.role} at PromptiX`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/5">
                            <User className="w-16 h-16 text-gray-400 group-hover:text-orange-500 transition-colors duration-300" />
                        </div>
                    )}
                    {/* Overlay shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            </div>

            {/* Role Badge */}
            <div className={`mb-6 ${member.image ? 'text-center' : ''} relative z-10`}>
                <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/10 border border-orange-500/30 mb-4 backdrop-blur-sm">
                    <span className="text-xs font-bold tracking-wide text-orange-400 uppercase">
                        {member.badge || member.role.split(' ')[0]}
                    </span>
                </div>
                <div className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-orange-500 transition-all duration-500">
                    {member.role}
                </div>
                <h3 className="text-lg font-semibold text-gray-300/90">
                    {member.name}
                </h3>
            </div>

            {/* Focus Description */}
            <p className="text-gray-400/90 text-sm leading-relaxed mb-6 flex-grow relative z-10">
                {member.focus}
            </p>

            {/* Skill Highlights */}
            <div className="space-y-3 pt-6 border-t border-white/10 relative z-10">
                {member.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 group-hover:shadow-[0_0_8px_rgba(249,115,22,0.8)] group-hover:scale-125 transition-all duration-300" />
                        <span className="text-sm text-gray-300/80 group-hover:text-gray-200 transition-colors duration-300">{highlight}</span>
                    </div>
                ))}
            </div>

            {/* Click Hint */}
            <div className="mt-4 pt-3 border-t border-white/5 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs text-orange-400 font-medium">Click to view details →</span>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-navy-950 pt-20">
            <SEO
                title="Our Team"
                description="Meet the experts behind PromptiX. A dedicated team of developers, designers, and strategists driving innovation."
                keywords="PromptiX team, leadership, developers, designers, AI experts"
                url="/company/team"
            />
            {/* Hero Section */}
            <section className="relative py-14 md:py-16 lg:py-24 px-4 overflow-hidden bg-navy-950/50">
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
            <section className="max-w-7xl mx-auto px-4 py-14 md:py-16 lg:py-24">

                {/* Leadership Section - Centered Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12 lg:mb-16"
                >
                    {leadership.map((member, index) => renderMemberCard(member, index))}
                </motion.div>

                {/* Regular Team Section - 3 Column Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
                >
                    {regularTeam.map((member, index) => renderMemberCard(member, index + 2))}
                </motion.div>

            </section>

            {/* Team Values Section */}
            <section className="max-w-7xl mx-auto px-4 py-14 md:py-16 lg:py-24 bg-navy-900/30">
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

            {/* Join Team Section */}
            <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-3xl p-8 md:p-12 text-center border border-white/10 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <Users className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-medium text-gray-300">Networking & Collaboration</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Join Our <span className="text-orange-500">Talent Network</span>
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            We are always looking to connect with talented individuals like you. Whether you are a college student, fresher, or experienced job seeker, we'd love to hear from you for future opportunities and collaborations.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="mailto:infopromptix@gmail.com"
                                className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-1"
                            >
                                Submit Your Resume
                            </a>
                            <p className="text-sm text-gray-400 italic mt-2 sm:mt-0">
                                *Note: We are building our database for future requirements. No immediate hiring.
                            </p>
                        </div>
                    </div>
                </motion.div>
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
