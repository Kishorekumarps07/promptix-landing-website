import React, { useState } from 'react';
import Logo from './Logo';
import { Linkedin, Github, Instagram, Facebook, ChevronDown, MapPin, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT } from '../constants/contact';

const Footer = () => {
    const [openSection, setOpenSection] = useState(null);

    const footerLinks = {
        Company: [
            { name: 'Our Team', href: '/company/team' },
            { name: 'Blog', href: '/blog' },
        ],
    };

    const socialLinks = [
        { icon: Instagram, href: CONTACT.social.instagram || '#', label: 'Instagram' },
        { icon: Linkedin, href: CONTACT.social.linkedin || '#', label: 'LinkedIn' },
        { icon: Facebook, href: CONTACT.social.facebook || '#', label: 'Facebook' },
        { icon: Github, href: CONTACT.social.github || '#', label: 'GitHub' },
    ];

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <footer className="bg-navy-950 text-white">
            <div className="max-w-7xl mx-auto px-6 py-14 md:py-16 lg:py-24">
                {/* Top section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-8 lg:mb-12">
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
                                        className="w-12 h-12 rounded-lg bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-colors duration-300"
                                    >
                                        <Icon className="w-6 h-6" />
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

                {/* Office Address Section */}
                <div className="py-8 border-t border-white/10">
                    <div className="flex flex-col items-center justify-center gap-6">

                        {/* Address */}
                        <div className="flex flex-col items-center text-center gap-2 max-w-2xl">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-orange-500 mb-2">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <h4 className="text-white font-medium">Head Office</h4>
                            <p className="text-gray-400 leading-relaxed">
                                {CONTACT.address.lines.map((line, i) => (
                                    <span key={i} className="block">{line}</span>
                                ))}
                            </p>
                        </div>

                        {/* Contact Channels */}
                        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-2">
                            {/* Phone */}
                            <a href={`tel:${CONTACT.phone.raw}`} className="flex items-center gap-3 text-gray-300 hover:text-white group transition-colors">
                                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-orange-500/10 text-orange-500 transition-colors">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <span>{CONTACT.phone.display}</span>
                            </a>

                            {/* Email */}
                            <a href={`mailto:${CONTACT.email.address}`} className="flex items-center gap-3 text-gray-300 hover:text-white group transition-colors">
                                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-orange-500/10 text-orange-500 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <span>{CONTACT.email.address}</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="pt-6 lg:pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-xs lg:text-sm text-center md:text-left">
                            © {new Date().getFullYear()} PromptiX. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
                            <a href="/privacy-policy" className="hover:text-orange-500 transition-colors duration-300">
                                Privacy Policy
                            </a>
                            <a href="/terms-of-service" className="hover:text-orange-500 transition-colors duration-300">
                                Terms & Conditions
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
