import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Award, Clock, MapPin, Briefcase, TrendingUp, IndianRupee, Users, CheckCircle } from 'lucide-react';

const DomainModal = ({ isOpen, onClose, domain }) => {
    const modalRef = useRef(null);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!domain) return null;

    const Icon = domain.icon;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm cursor-pointer"
                        aria-hidden="true"
                    />

                    {/* Modal Content */}
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full sm:max-w-3xl h-[85vh] sm:h-auto sm:max-h-[90vh] bg-navy-900 border-t sm:border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col cursor-default"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="domain-modal-title"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-start gap-4 bg-navy-800/50 backdrop-blur-md sticky top-0 z-10">
                            <div className="w-12 h-12 rounded-lg bg-navy-800 border border-white/10 flex items-center justify-center shrink-0 shadow-lg shadow-black/20">
                                <Icon className="w-6 h-6 text-orange-500" />
                            </div>
                            <div className="flex-1 pr-8">
                                <h2 id="domain-modal-title" className="text-xl sm:text-2xl font-bold text-white mb-1">
                                    {domain.category}
                                </h2>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {domain.shortDescription}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8 bg-navy-900/50">
                            {/* About the Domain */}
                            <div>
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                    <BookOpen className="w-5 h-5 text-orange-500" />
                                    About This Domain
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {domain.about}
                                </p>
                            </div>

                            {/* Pricing Section */}
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-purple-500/10 border border-orange-500/20">
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                    <IndianRupee className="w-5 h-5 text-orange-500" />
                                    Internship Pricing
                                </h3>
                                <div className="space-y-4">
                                    {/* Price Display */}
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold text-white">₹9,999</span>
                                        <span className="text-gray-400 text-sm">per student</span>
                                    </div>

                                    {/* Duration & Mode */}
                                    <div className="flex flex-wrap gap-3">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10">
                                            <Clock className="w-4 h-4 text-orange-500" />
                                            <span className="text-sm text-gray-300">8 Weeks Duration</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10">
                                            <MapPin className="w-4 h-4 text-orange-500" />
                                            <span className="text-sm text-gray-300">Online / Offline</span>
                                        </div>
                                    </div>

                                    {/* Includes */}
                                    <div className="mt-4">
                                        <p className="text-sm font-semibold text-white mb-3">Includes:</p>
                                        <div className="space-y-2">
                                            {[
                                                'Industry-focused training',
                                                'Real-world project',
                                                'Internship certificate',
                                                'Mentor guidance',
                                                'Career support'
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                                                    <span className="text-sm text-gray-300">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Optional Note */}
                                    <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-white/10">
                                        EMI options and student discounts available
                                    </p>
                                </div>
                            </div>

                            {/* What You'll Learn */}
                            <div>
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                    <Award className="w-5 h-5 text-orange-500" />
                                    What You'll Learn
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {domain.learnings && domain.learnings.map((learning, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0 group-hover:shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-shadow" />
                                            <span className="text-sm text-gray-300 leading-snug">{learning}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tools & Technologies */}
                            <div>
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                    <Briefcase className="w-5 h-5 text-orange-500" />
                                    Tools & Technologies
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {domain.items && domain.items.map((tech, i) => (
                                        <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 shadow-sm hover:border-orange-500/30 transition-colors">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Internship Format */}
                            <div>
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                    <Clock className="w-5 h-5 text-orange-500" />
                                    Internship Format
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <MapPin className="w-5 h-5 text-orange-500 mb-2" />
                                        <p className="text-sm font-semibold text-white">Mode</p>
                                        <p className="text-sm text-gray-400">Online & Offline</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <Clock className="w-5 h-5 text-orange-500 mb-2" />
                                        <p className="text-sm font-semibold text-white">Duration</p>
                                        <p className="text-sm text-gray-400">4-12 weeks</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <Briefcase className="w-5 h-5 text-orange-500 mb-2" />
                                        <p className="text-sm font-semibold text-white">Learning</p>
                                        <p className="text-sm text-gray-400">Project-based</p>
                                    </div>
                                </div>
                            </div>

                            {/* Outcomes */}
                            <div>
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                    <TrendingUp className="w-5 h-5 text-orange-500" />
                                    What You'll Gain
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        'Industry-recognized completion certificate',
                                        'Hands-on experience with real-world projects',
                                        'Portfolio-ready work samples',
                                        'Career guidance and freelancing tips',
                                        '1-on-1 mentorship from industry experts'
                                    ].map((outcome, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            <span className="text-sm text-gray-300">{outcome}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer CTA */}
                        <div className="p-6 border-t border-white/10 bg-navy-800/50 backdrop-blur-md">
                            <a
                                href={`/apply?domain=${encodeURIComponent(domain.category)}`}
                                className="w-full px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20"
                            >
                                Apply Now
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default DomainModal;
