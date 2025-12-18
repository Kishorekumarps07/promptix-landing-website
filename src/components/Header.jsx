import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Phone } from 'lucide-react';
import Logo from './Logo';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileDropdown, setMobileDropdown] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        {
            name: 'Services and Solutions',
            hasDropdown: true,
            items: [
                { name: 'Business Solutions', href: '/business-solutions' },
                { name: 'Digital Marketing', href: '/digital-marketing' },
            ],
        },
        { name: 'Students / College', href: '/students-college' },
        {
            name: 'Company',
            hasDropdown: true,
            items: [
                { name: 'Our Team', href: '/company/team' },
                { name: 'Join Team', href: '/company/join-team' },
                { name: 'Blog', href: '/#blog' },
            ],
        },
    ];

    const handleMouseEnter = (linkName) => {
        setOpenDropdown(linkName);
    };

    const handleMouseLeave = () => {
        setOpenDropdown(null);
    };

    const toggleMobileDropdown = (linkName) => {
        setMobileDropdown(mobileDropdown === linkName ? null : linkName);
    };

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1], // Custom ease-out curve
            },
        },
        exit: {
            opacity: 0,
            y: -10,
            scale: 0.95,
            transition: {
                duration: 0.2,
                ease: 'easeIn',
            },
        },
    };

    // Close dropdown and mobile menu on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setOpenDropdown(null);
                setMobileDropdown(null);
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-navy-950/95 backdrop-blur-md shadow-lg py-3 border-b border-navy-800'
                : 'bg-transparent py-5 border-transparent'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4" ref={dropdownRef}>
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div>
                        <a href="/">
                            <Logo />
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative"
                                onMouseEnter={() => link.hasDropdown && handleMouseEnter(link.name)}
                                onMouseLeave={() => link.hasDropdown && handleMouseLeave()}
                            >
                                {link.hasDropdown ? (
                                    <>
                                        <button
                                            className="flex items-center gap-1 text-white hover:text-orange-400 font-medium transition-colors duration-300 drop-shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 rounded px-2 py-1"
                                            aria-expanded={openDropdown === link.name}
                                            aria-haspopup="true"
                                        >
                                            {link.name}
                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </button>

                                        <AnimatePresence>
                                            {openDropdown === link.name && (
                                                <motion.div
                                                    variants={dropdownVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    className="absolute top-full left-0 mt-3 w-52 bg-navy-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 py-3 overflow-hidden"
                                                >
                                                    {link.items.map((item, index) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className="group block px-5 py-3 text-gray-200 hover:bg-white/10 transition-all duration-300 relative overflow-hidden focus-visible:outline-none focus-visible:bg-white/15"
                                                            style={{
                                                                animationDelay: `${index * 50}ms`
                                                            }}
                                                        >
                                                            <span className="relative z-10 inline-block group-hover:translate-x-1 transition-transform duration-300">
                                                                {item.name}
                                                            </span>
                                                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                        </a>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <a
                                        href={link.href}
                                        className="text-white hover:text-orange-400 font-medium transition-colors duration-300 drop-shadow-md"
                                    >
                                        {link.name}
                                    </a>
                                )}
                            </div>
                        ))}

                        {/* Contact Number */}
                        <a
                            href="tel:+919342460105"
                            className="flex items-center gap-2 text-white hover:text-orange-400 font-medium transition-colors duration-300 drop-shadow-md"
                        >
                            <Phone className="w-4 h-4" />
                            <span>+91 9342460105</span>
                        </a>

                        {/* CTA Button */}
                        <a href="/contact" className="btn-primary">Get in Touch</a>
                    </div>

                    {/* Mobile Top Bar - Right Side */}
                    <div className="lg:hidden flex items-center gap-3">
                        {/* Small Get in Touch Pill */}
                        <a
                            href="/contact"
                            className="px-4 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
                        >
                            Contact
                        </a>

                        {/* Hamburger Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded"
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu - Full-Height Slide-in Drawer */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                                onClick={() => setIsMenuOpen(false)}
                            />

                            {/* Drawer */}
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                className="lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-navy-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
                            >
                                <div className="flex flex-col h-full">
                                    {/* Drawer Header */}
                                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                                        <Logo className="text-white scale-90" />
                                        <button
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                                            aria-label="Close menu"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Navigation Links */}
                                    <div className="flex-1 p-6 space-y-2">
                                        {navLinks.map((link) => (
                                            <div key={link.name}>
                                                {link.hasDropdown ? (
                                                    <>
                                                        <button
                                                            onClick={() => toggleMobileDropdown(link.name)}
                                                            className="w-full flex items-center justify-between text-white font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                                                        >
                                                            <span>{link.name}</span>
                                                            <ChevronDown
                                                                className={`w-5 h-5 transition-transform duration-300 ${mobileDropdown === link.name ? 'rotate-180' : ''
                                                                    }`}
                                                            />
                                                        </button>

                                                        <AnimatePresence>
                                                            {mobileDropdown === link.name && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.25 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="pl-4 pt-2 space-y-1">
                                                                        {link.items.map((item) => (
                                                                            <a
                                                                                key={item.name}
                                                                                href={item.href}
                                                                                onClick={() => setIsMenuOpen(false)}
                                                                                className="block text-gray-300 hover:text-orange-400 py-3 px-4 rounded-lg hover:bg-white/5 transition-colors"
                                                                            >
                                                                                {item.name}
                                                                            </a>
                                                                        ))}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </>
                                                ) : (
                                                    <a
                                                        href={link.href}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="block text-white font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                                                    >
                                                        {link.name}
                                                    </a>
                                                )}
                                            </div>
                                        ))}

                                        {/* Divider */}
                                        <div className="py-4">
                                            <div className="border-t border-white/10"></div>
                                        </div>

                                        {/* Get in Touch CTA */}
                                        <a
                                            href="/contact"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block w-full py-3 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-center transition-all transform active:scale-95"
                                        >
                                            Get in Touch
                                        </a>

                                        {/* Phone Number */}
                                        <a
                                            href="tel:+919342460105"
                                            className="flex items-center justify-center gap-2 text-gray-300 hover:text-orange-400 font-medium py-3 transition-colors"
                                        >
                                            <Phone className="w-4 h-4" />
                                            <span>+91 9342460105</span>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
};

export default Header;
