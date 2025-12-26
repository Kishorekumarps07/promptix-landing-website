import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Phone, ArrowRight, GraduationCap, School } from 'lucide-react';
import Logo from './Logo';
import { CONTACT } from '../constants/contact';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileDropdown, setMobileDropdown] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const dropdownRef = useRef(null);
    const timeoutRef = useRef(null);

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
        { name: 'Home', href: '/' },
        {
            name: 'Services and Solutions',
            hasDropdown: true,
            type: 'standard',
            items: [
                { name: 'Business Solutions', href: '/business-solutions' },
                { name: 'Digital Marketing', href: '/digital-marketing' },
            ],
        },
        {
            name: 'Students & Institutions',
            hasDropdown: true,
            type: 'mega',
            items: [
                {
                    title: 'School Students & Schools',
                    subtitle: 'Foundational skills for the future',
                    bullets: ['Coding basics', 'AI awareness', 'Logical thinking', 'School workshops'],
                    cta: 'Explore School Programs →',
                    href: '/students/schools',
                    icon: School
                },
                {
                    title: 'College Students & Colleges',
                    subtitle: 'Industry-ready skills & careers',
                    bullets: ['Internships', 'Real-world projects', 'AI / Full Stack / Marketing', 'College partnerships'],
                    cta: 'Explore College Programs →',
                    href: '/students/colleges',
                    icon: GraduationCap
                }
            ]
        },
        {
            name: 'Company',
            hasDropdown: true,
            type: 'standard',
            items: [
                { name: 'Our Team', href: '/company/team' },
                { name: 'Blog', href: '/blog' },
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

    const megaDropdownVariants = {
        hidden: { opacity: 0, y: 10, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
            },
        },
        exit: {
            opacity: 0,
            y: 10,
            scale: 0.98,
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

    // Lock body scroll when mobile menu is open with position fixed
    useEffect(() => {
        if (isMenuOpen) {
            // Save current scroll position
            const scrollY = window.scrollY;

            // Lock scroll with position fixed
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            // Get the scroll position from body top
            const scrollY = document.body.style.top;

            // Restore scroll
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';

            // Restore scroll position
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

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
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.href || (link.items && link.items.some(item => location.pathname === item.href));

                            return (
                                <div
                                    key={link.name}
                                    className="relative group h-full flex items-center"
                                    onMouseEnter={() => {
                                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                                        link.hasDropdown && handleMouseEnter(link.name);
                                    }}
                                    onMouseLeave={() => {
                                        if (link.hasDropdown) {
                                            timeoutRef.current = setTimeout(() => {
                                                handleMouseLeave();
                                            }, 200);
                                        }
                                    }}
                                >
                                    {link.hasDropdown ? (
                                        <>
                                            <button
                                                className={`flex items-center gap-1 font-medium transition-colors duration-300 drop-shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 rounded px-2 py-1 relative
                                                    ${isActive || openDropdown === link.name ? 'text-orange-400' : 'text-white hover:text-orange-400'}
                                                `}
                                                aria-expanded={openDropdown === link.name}
                                                aria-haspopup="true"
                                                onClick={() => link.hasDropdown && (openDropdown === link.name ? setOpenDropdown(null) : setOpenDropdown(link.name))}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        openDropdown === link.name ? setOpenDropdown(null) : setOpenDropdown(link.name);
                                                    }
                                                }}
                                            >
                                                {link.name}
                                                <ChevronDown
                                                    className={`w-4 h-4 transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`}
                                                />
                                                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                                            </button>

                                            <AnimatePresence>
                                                {openDropdown === link.name && (
                                                    link.type === 'mega' ? (
                                                        <motion.div
                                                            variants={megaDropdownVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[650px] bg-navy-950/98 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/10 p-6 overflow-hidden"
                                                            onMouseEnter={() => {
                                                                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                                                            }}
                                                            onMouseLeave={() => {
                                                                timeoutRef.current = setTimeout(() => {
                                                                    handleMouseLeave();
                                                                }, 200);
                                                            }}
                                                        >
                                                            <div className="grid grid-cols-2 gap-6 relative z-10">
                                                                {link.items.map((item) => {
                                                                    const isItemActive = location.pathname === item.href;
                                                                    return (
                                                                        <div
                                                                            key={item.title}
                                                                            className={`group/card p-6 transition-all duration-300 ease-out hover:-translate-y-2 block cursor-pointer
                                                                                bg-[#0f2a4d]/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl
                                                                                ${isItemActive ? 'ring-1 ring-orange-500/50' : 'hover:border-orange-500/30'}
                                                                            `}
                                                                            onClick={() => {
                                                                                navigate(item.href);
                                                                                setOpenDropdown(null);
                                                                            }}
                                                                        >
                                                                            <div className="flex items-start justify-between mb-4">
                                                                                <div className={`p-3 rounded-xl transition-transform duration-300 group-hover/card:scale-110 
                                                                                    ${isItemActive ? 'bg-orange-500 text-white' : 'bg-orange-500/10 text-orange-400'}`}>
                                                                                    <item.icon className="w-6 h-6" />
                                                                                </div>
                                                                            </div>
                                                                            <h3 className={`text-xl font-bold mb-2 transition-colors ${isItemActive ? 'text-orange-400' : 'text-white group-hover/card:text-orange-400'}`}>
                                                                                {item.title}
                                                                            </h3>
                                                                            <p className="text-white/80 text-sm mb-4">
                                                                                {item.subtitle}
                                                                            </p>
                                                                            <ul className="space-y-2 mb-6">
                                                                                {item.bullets.map((bullet) => (
                                                                                    <li key={bullet} className="flex items-center gap-2 text-sm text-white/80">
                                                                                        <div className={`w-1.5 h-1.5 rounded-full ${isItemActive ? 'bg-orange-400' : 'bg-orange-500'} `} />
                                                                                        {bullet}
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                            <div
                                                                                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 group/btn
                                                                                    ${isItemActive ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-white/5 hover:bg-orange-500 text-white'}
                                                                                `}
                                                                            >
                                                                                <span>{item.cta.replace(' →', '')}</span>
                                                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                            {/* Accents */}
                                                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[80px] rounded-full" />
                                                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 blur-[80px] rounded-full" />
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div
                                                            variants={dropdownVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            className="absolute top-full left-0 mt-3 w-52 bg-navy-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 py-3 overflow-hidden"
                                                            onMouseEnter={() => {
                                                                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                                                            }}
                                                            onMouseLeave={() => {
                                                                timeoutRef.current = setTimeout(() => {
                                                                    handleMouseLeave();
                                                                }, 200);
                                                            }}
                                                        >
                                                            {link.items.map((item, index) => {
                                                                const isSubActive = location.pathname === item.href;
                                                                return (
                                                                    <a
                                                                        key={item.name}
                                                                        href={item.href}
                                                                        className={`group block px-5 py-3 transition-all duration-300 relative overflow-hidden focus-visible:outline-none focus-visible:bg-white/15
                                                                            ${isSubActive ? 'text-orange-400 bg-white/10' : 'text-gray-200 hover:bg-white/10'}
                                                                        `}
                                                                        style={{
                                                                            animationDelay: `${index * 50}ms`
                                                                        }}
                                                                    >
                                                                        <span className={`relative z-10 inline-block transition-transform duration-300 ${isSubActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
                                                                            {item.name}
                                                                        </span>
                                                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                                    </a>
                                                                );
                                                            })}
                                                        </motion.div>
                                                    )
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) : (
                                        <a
                                            href={link.href}
                                            className={`font-medium transition-colors duration-300 drop-shadow-md relative py-1
                                                ${isActive ? 'text-orange-400' : 'text-white hover:text-orange-400'}
                                            `}
                                        >
                                            {link.name}
                                            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                                        </a>
                                    )}
                                </div>
                            );
                        })}

                        {/* Contact Number */}
                        <a
                            href={`tel:${CONTACT.phone.raw}`}
                            className="flex items-center gap-2 text-white hover:text-orange-400 font-medium transition-colors duration-300 drop-shadow-md"
                        >
                            <Phone className="w-4 h-4" />
                            <span>{CONTACT.phone.display}</span>
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
                                className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
                                onClick={() => setIsMenuOpen(false)}
                            />

                            {/* Drawer */}
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                className="lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-navy-950 border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
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
                                                                    {link.type === 'mega' ? (
                                                                        <div className="pt-2 flex flex-col gap-4">
                                                                            {link.items.map((item) => (
                                                                                <div
                                                                                    key={item.title}
                                                                                    className="bg-white/5 rounded-2xl p-5 border border-white/5"
                                                                                >
                                                                                    <div className="flex items-center gap-3 mb-3">
                                                                                        <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                                                                                            <item.icon className="w-5 h-5" />
                                                                                        </div>
                                                                                        <h3 className="font-bold text-white uppercase tracking-wider text-xs">
                                                                                            {item.title}
                                                                                        </h3>
                                                                                    </div>
                                                                                    <p className="text-gray-400 text-xs mb-4">
                                                                                        {item.subtitle}
                                                                                    </p>
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            navigate(item.href);
                                                                                            setIsMenuOpen(false);
                                                                                        }}
                                                                                        className="w-full py-3 px-4 rounded-xl bg-orange-500 text-white font-semibold text-sm flex items-center justify-center gap-2"
                                                                                    >
                                                                                        <span>{item.cta.replace(' →', '')}</span>
                                                                                        <ArrowRight className="w-4 h-4" />
                                                                                    </button>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    ) : (
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
                                                                    )}
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
                                            href={`tel:${CONTACT.phone.raw}`}
                                            className="flex items-center justify-center gap-2 text-gray-300 hover:text-orange-400 font-medium py-3 transition-colors"
                                        >
                                            <Phone className="w-4 h-4" />
                                            <span>{CONTACT.phone.display}</span>
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
