import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';

const LivePreviewModal = ({ isOpen, onClose, project }) => {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Also notify Lenis if present
            const scrollContainer = document.querySelector('[data-lenis-prevent]');
            if (scrollContainer) scrollContainer.setAttribute('data-lenis-prevent', 'true');
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-navy-950/90 backdrop-blur-md cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-6xl h-[90vh] bg-navy-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Bar */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-navy-800/50">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="h-4 w-px bg-white/10 mx-2" />
                                <div>
                                    <h3 className="text-white font-semibold truncate max-w-[200px] sm:max-w-md">
                                        {project.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 truncate">
                                        {project.link}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                                    title="Open in new tab"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg bg-orange-500/20 hover:bg-orange-500 text-orange-400 hover:text-white transition-all"
                                    aria-label="Close preview"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Iframe Container */}
                        <div className="flex-1 bg-white relative">
                            <iframe
                                src={project.link}
                                title={project.title}
                                className="w-full h-full border-none"
                                sandbox="allow-same-origin allow-scripts allow-forms"
                                loading="lazy"
                            />
                            
                            {/* Loading State Overlay (Optional - can be improved with state) */}
                            <div className="absolute inset-0 pointer-events-none bg-navy-900/10 flex items-center justify-center">
                                {/* Simple pulse or spinner could go here if needed */}
                            </div>
                        </div>

                        {/* Footer Bar */}
                        <div className="px-6 py-3 border-t border-white/10 bg-navy-800/50 flex items-center justify-between text-[10px] sm:text-xs text-gray-400">
                            <div className="flex items-center gap-4">
                                <span>Interactive Preview Mode</span>
                                <span className="hidden sm:inline">•</span>
                                <span className="hidden sm:inline">Secure Sandbox Active</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Press Esc to close</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LivePreviewModal;
