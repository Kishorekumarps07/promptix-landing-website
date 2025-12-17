import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Linkedin } from 'lucide-react';

const TeamMemberModal = ({ isOpen, onClose, member }) => {
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

    if (!member) return null;

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
                        className="relative w-full sm:max-w-2xl h-[85vh] sm:h-auto sm:max-h-[90vh] bg-navy-900 border-t sm:border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col cursor-default"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 bg-navy-800/50 backdrop-blur-md sticky top-0 z-10">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h2 id="modal-title" className="text-2xl font-bold text-white mb-2">
                                        {member.role}
                                    </h2>
                                    {member.linkedin && (
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors text-sm"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                            <span>Connect on LinkedIn</span>
                                        </a>
                                    )}
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                    aria-label="Close modal"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8 bg-navy-900/50">
                            {/* Bio */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">About</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>

                            {/* Skills */}
                            {member.skills && member.skills.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">Core Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {member.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-white/10 text-sm text-gray-200 shadow-sm hover:border-orange-500/30 transition-colors"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tools & Technologies */}
                            {member.tools && member.tools.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">Tools & Technologies</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {member.tools.map((tool, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 group-hover:shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-shadow" />
                                                <span className="text-sm text-gray-300 leading-snug">{tool}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TeamMemberModal;
