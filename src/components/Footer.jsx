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
        Services: [
            { name: 'Business Solutions', href: '/business-solutions' },
            { name: 'Digital Marketing', href: '/digital-marketing' },
            { name: 'School Students', href: '/students/schools' },
            { name: 'College Students', href: '/students/colleges' },
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Logo and description */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="transform transition-transform hover:scale-105 origin-left">
                            <Logo size="large" className="text-white drop-shadow-[0_0_15px_rgba(249,115,22,0.2)]" />
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm lg:text-base max-w-md">
                            PromptiX is at the forefront of the AI revolution, empowering businesses with
                            intelligent automation and bridging the gap for students through
                            industry-aligned internship programs.
                        </p>
                        {/* Social links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        aria-label={social.label}
                                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 shadow-lg hover:shadow-orange-500/20"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category} className="hidden md:block">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-6 font-display">
                                {category}
                            </h3>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-400 hover:text-white flex items-center gap-2 group transition-all duration-300"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500/0 group-hover:bg-orange-500 transition-all duration-300" />
                                            <span className="group-hover:translate-x-1 transition-transform duration-300 font-medium">
                                                {link.name}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Mobile Accordion Links */}
                    <div className="md:hidden space-y-4">
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category} className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                                <button
                                    onClick={() => toggleSection(category)}
                                    className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                                >
                                    <h3 className="font-bold text-white uppercase tracking-wider text-xs">{category}</h3>
                                    <ChevronDown
                                        className={`w-4 h-4 text-orange-500 transition-transform duration-500 ${openSection === category ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openSection === category && (
                                        <motion.ul
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-4 pb-4 space-y-3"
                                        >
                                            {links.map((link) => (
                                                <li key={link.name}>
                                                    <a
                                                        href={link.href}
                                                        className="text-gray-400 hover:text-orange-500 block text-sm transition-colors"
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
