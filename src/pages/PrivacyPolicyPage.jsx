import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicyPage = () => {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-slate-50 pt-20">
                {/* Hero Section */}
                <section className="bg-navy-950 text-white py-16 md:py-20 lg:py-24">
                    <div className="max-w-4xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-8 h-8 text-orange-500" />
                                <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
                            </div>
                            <p className="text-gray-300 text-lg">
                                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-14 md:py-16 lg:py-24">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">

                            <section>
                                <p className="mb-4">
                                    <strong>PromptiX - A Tech Solution Company</strong> ("PromptiX", "we", "our", "us") respects your privacy.
                                    This Privacy Policy explains how we collect, use, and protect your information when you visit our website or use our services.
                                </p>
                                <p>
                                    By using our website, you agree to this Privacy Policy.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <h2 className="text-xl font-bold text-navy-950">INFORMATION WE COLLECT</h2>
                                </div>
                                <p className="mb-2">We may collect the following information:</p>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                    <li>Name</li>
                                    <li>Email address</li>
                                    <li>Phone number</li>
                                    <li>Educational or professional details</li>
                                    <li>Information shared through forms, registrations, or inquiries</li>
                                </ul>
                                <p className="mt-4 text-orange-600 font-medium bg-orange-50 p-3 rounded-lg border border-orange-100 inline-block">
                                    We do not collect or store any payment or banking information.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">THIRD-PARTY SERVICES</h2>
                                <p className="text-gray-700">
                                    PromptiX does not integrate with or rely on third-party tools or services that collect user data through this website.
                                    All information shared on this website is handled directly by PromptiX.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">HOW WE USE YOUR INFORMATION</h2>
                                <p className="mb-2 text-gray-700">Your information is used only to:</p>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                    <li>Provide and manage our services</li>
                                    <li>Communicate about internships, workshops, webinars, and updates</li>
                                    <li>Respond to inquiries and support requests</li>
                                    <li>Improve our website and services</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">NON-PERSONAL INFORMATION</h2>
                                <p className="text-gray-700">
                                    We may collect basic technical information such as browser type, device information, IP address, and pages visited.
                                    This data does not personally identify you and is used only for analytics and improvement.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">COOKIES</h2>
                                <p className="text-gray-700">
                                    We may use cookies to improve website functionality and user experience.
                                    You can disable cookies through your browser settings if you prefer.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">SHARING OF INFORMATION</h2>
                                <p className="mb-2 text-gray-700">We do not sell, rent, or trade your personal information. Your information may be shared only:</p>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                    <li>With trusted service providers (hosting or communication tools)</li>
                                    <li>When required by law</li>
                                    <li>During a business transfer or restructuring</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">DATA SECURITY</h2>
                                <p className="text-gray-700">
                                    We take reasonable steps to protect your personal data. However, no online platform is completely secure,
                                    and absolute security cannot be guaranteed.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">MINORS</h2>
                                <p className="text-gray-700">
                                    We do not knowingly collect personal data from individuals under the age of 18 without parental or guardian consent.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">YOUR RIGHTS</h2>
                                <p className="text-gray-700">
                                    You may request to access, update, or delete your personal information or opt out of communications by contacting us.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">POLICY UPDATES</h2>
                                <p className="text-gray-700">
                                    We may update this Privacy Policy from time to time. Continued use of our website means you accept the updated policy.
                                </p>
                            </section>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicyPage;
