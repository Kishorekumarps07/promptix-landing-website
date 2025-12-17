import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, BookOpen } from 'lucide-react';

const AIToolModal = ({ isOpen, onClose, category }) => {
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

    if (!category) return null;

    const Icon = category.icon;

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
                        aria-labelledby="ai-tool-modal-title"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-start gap-4 bg-navy-800/50 backdrop-blur-md sticky top-0 z-10">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shrink-0 shadow-lg shadow-black/20">
                                <Icon className="w-6 h-6 text-orange-500" />
                            </div>
                            <div className="flex-1 pr-8">
                                <h2 id="ai-tool-modal-title" className="text-xl sm:text-2xl font-bold text-white mb-1">
                                    {category.title}
                                </h2>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {category.description}
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
                            {/* AI Tools */}
                            <div>
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                    <Sparkles className="w-5 h-5 text-orange-500" />
                                    AI Tools You'll Master
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.tools && category.tools.map((tool, i) => (
                                        <span key={i} className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-white/10 text-sm text-gray-200 shadow-sm hover:border-orange-500/30 transition-colors">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* What You'll Learn */}
                            <div>
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                    <BookOpen className="w-5 h-5 text-orange-500" />
                                    What You'll Learn
                                </h3>
                                <div className="space-y-3">
                                    {category.learnings && category.learnings.map((learning, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0 group-hover:shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-shadow" />
                                            <span className="text-sm text-gray-300 leading-snug">{learning}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer CTA */}
                        <div className="p-6 border-t border-white/10 bg-navy-800/50 backdrop-blur-md">
                            <a href="/contact" className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20">
                                Apply Now
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AIToolModal;
