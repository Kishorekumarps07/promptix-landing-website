import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, Activity, ArrowRight, Target, CheckCircle2 } from 'lucide-react';

const ServiceModal = ({ isOpen, onClose, service }) => {
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

    if (!service) return null;

    const Icon = service.icon;

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
                        aria-labelledby="modal-title"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-start gap-4 bg-navy-800/50 backdrop-blur-md sticky top-0 z-10">
                            <div className="w-12 h-12 rounded-lg bg-navy-800 border border-white/10 flex items-center justify-center shrink-0 shadow-lg shadow-black/20">
                                <Icon className="w-6 h-6 text-orange-500" />
                            </div>
                            <div className="flex-1 pr-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-white">
                                        {service.title}
                                    </h2>
                                    {service.bestFor && (
                                        <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-medium text-orange-400">
                                            {service.bestFor}
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">
                                    {service.description}
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
                            {/* Tech Stack */}
                            <div>
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                    <Layers className="w-5 h-5 text-orange-500" />
                                    {service.channels ? 'Tools & Platforms' : 'Technology Stack'}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {service.techStack && service.techStack.map((tech, i) => (
                                        <span key={i} className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-white/10 text-sm text-gray-200 shadow-sm hover:border-orange-500/30 transition-colors">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Channels (for marketing solutions) */}
                            {service.channels && (
                                <div>
                                    <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                        <Activity className="w-5 h-5 text-orange-500" />
                                        Channels & Focus Areas
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {service.channels.map((channel, i) => (
                                            <span key={i} className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-sm text-blue-300 shadow-sm hover:border-blue-500/40 transition-colors">
                                                {channel}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Capabilities */}
                            <div>
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                    <Activity className="w-5 h-5 text-orange-500" />
                                    Key Capabilities
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {service.capabilities && service.capabilities.map((cap, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0 group-hover:shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-shadow" />
                                            <span className="text-sm text-gray-300 leading-snug">{cap}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* How This Helps Your Business */}
                            {service.businessValue && (
                                <div>
                                    <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                        <Target className="w-5 h-5 text-orange-500" />
                                        How This Helps Your Business
                                    </h3>
                                    <div className="space-y-3">
                                        {service.businessValue.map((value, i) => (
                                            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-orange-500/5 to-purple-500/5 border border-white/5">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                                <span className="text-sm text-gray-300 leading-relaxed">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer CTA */}
                        <div className="p-6 border-t border-white/10 bg-navy-800/50 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-center sm:text-left">
                                <h4 className="text-white font-semibold">Ready to transform your business?</h4>
                                <p className="text-sm text-gray-400">Let's discuss your specific requirements.</p>
                            </div>
                            <a href="/contact" className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20 group">
                                <span className="relative">
                                    {service.ctaLabel || 'Discuss Your Use Case'}
                                </span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ServiceModal;
