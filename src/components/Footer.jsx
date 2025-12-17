import React, { useState } from 'react';
import Logo from './Logo';
import { Twitter, Linkedin, Github, Mail, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
    const [openSection, setOpenSection] = useState(null);

    const footerLinks = {
        Company: [
            { name: 'Blog', href: '/#blog' },
            { name: 'Join Team', href: '/company/join-team' },
        ],
        Legal: [
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
            { name: 'Cookie Settings', href: '#' },
        ],
    };

    const socialLinks = [
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Mail, href: '#', label: 'Email' },
    ];

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <footer className="bg-navy-950 text-white">
            <div className="max-w-7xl mx-auto px-6 py-8 lg:py-16">
                {/* Top section */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 lg:mb-12">
                    {/* Logo and description */}
                    <div className="lg:col-span-2">
                        <div className="mb-4 lg:mb-6">
                            <Logo className="text-white scale-90 lg:scale-100 origin-left" />
                        </div>
                        <p className="text-gray-400 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base line-clamp-2 lg:line-clamp-none">
                            Empowering businesses and students with AI-driven solutions,
                            cutting-edge technology, and transformative learning experiences.
                        </p>
                        {/* Social links */}
                        <div className="flex items-center gap-3 lg:gap-4">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="w-10 h-10 rounded-lg bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-colors duration-300"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Desktop Links columns */}
                    <div className="hidden lg:contents">
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                                <h3 className="font-semibold text-white mb-4">{category}</h3>
                                <ul className="space-y-3">
                                    {links.map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Accordion Links */}
                    <div className="lg:hidden space-y-2">
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category} className="border-b border-white/10">
                                <button
                                    onClick={() => toggleSection(category)}
                                    className="w-full flex items-center justify-between py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded"
                                    aria-expanded={openSection === category}
                                >
                                    <h3 className="font-semibold text-white">{category}</h3>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openSection === category ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openSection === category && (
                                        <motion.ul
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden space-y-2 pb-3"
                                        >
                                            {links.map((link) => (
                                                <li key={link.name}>
                                                    <a
                                                        href={link.href}
                                                        className="block py-2 text-gray-400 hover:text-orange-500 transition-colors duration-300"
                                                    >
                                                        {link.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile CTA */}
                <div className="lg:hidden mb-8">
                    <a
                        href="/contact"
                        className="block w-full py-3 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-center transition-all transform active:scale-95"
                    >
                        Get in Touch
                    </a>
                </div>

                {/* Bottom section */}
                <div className="pt-6 lg:pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-xs lg:text-sm text-center md:text-left">
                            © {new Date().getFullYear()} PromptiX. All rights reserved.
                        </p>
                        <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
                            <a href="#" className="hover:text-orange-500 transition-colors duration-300">
                                Privacy Policy
                            </a>
                            <a href="#" className="hover:text-orange-500 transition-colors duration-300">
                                Terms of Service
                            </a>
                            <a href="#" className="hover:text-orange-500 transition-colors duration-300">
                                Cookie Settings
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
