import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ApplySuccessPage = () => {
    const [searchParams] = useSearchParams();
    const domain = searchParams.get('domain') || 'Internship Program';
    const email = searchParams.get('email') || '';

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-navy-950 pt-20 flex items-center justify-center">
                <div className="max-w-2xl mx-auto px-6 py-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Success Icon */}
                        <div className="mb-8 flex justify-center">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                                    <CheckCircle className="w-12 h-12 text-green-500" />
                                </div>
                                {/* Animated rings */}
                                <div className="absolute inset-0 rounded-full border-2 border-green-500/30 animate-ping" />
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Application Submitted Successfully!
                        </h1>

                        {/* Message */}
                        <p className="text-xl text-gray-300 mb-8">
                            Our team will contact you shortly with next steps.
                        </p>

                        {/* Details Card */}
                        <div className="bg-navy-900 rounded-2xl border border-white/10 p-6 md:p-8 mb-8 text-left">
                            <h2 className="text-lg font-semibold text-white mb-4">Application Details</h2>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-400">Selected Program</p>
                                        <p className="text-white font-medium">{decodeURIComponent(domain)}</p>
                                    </div>
                                </div>
                                {email && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-400">Confirmation Email Sent To</p>
                                            <p className="text-white font-medium">{email}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/"
                                className="px-8 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20"
                            >
                                <Home className="w-5 h-5" />
                                Back to Home
                            </Link>
                            <Link
                                to="/students-college"
                                className="px-8 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold flex items-center justify-center gap-2 transition-all border border-white/10"
                            >
                                <Sparkles className="w-5 h-5" />
                                Explore Programs
                            </Link>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-12 pt-8 border-t border-white/10">
                            <p className="text-sm text-gray-400">
                                Need help? Contact us at{' '}
                                <a href="mailto:infopromptix@gmail.com" className="text-orange-500 hover:text-orange-400 transition-colors">
                                    infopromptix@gmail.com
                                </a>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ApplySuccessPage;
