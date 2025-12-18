import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const TermsOfServicePage = () => {
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
                                <FileText className="w-8 h-8 text-orange-500" />
                                <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
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

                            {/* Introduction */}
                            <div>
                                <h2 className="text-2xl font-bold text-navy-950 mb-4">Agreement to Terms</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    These Terms of Service constitute a legally binding agreement between you and PromptiX concerning your access to and use of our website and services. By accessing or using our services, you agree to be bound by these Terms.
                                </p>
                            </div>

                            {/* Use of Services */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <CheckCircle className="w-5 h-5 text-orange-500" />
                                    <h2 className="text-2xl font-bold text-navy-950">Use of Services</h2>
                                </div>
                                <div className="space-y-4 text-gray-700">
                                    <div>
                                        <h3 className="font-semibold text-navy-950 mb-2">Permitted Use</h3>
                                        <p className="leading-relaxed">
                                            You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services in any way that violates any applicable federal, state, local, or international law or regulation.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-navy-950 mb-2">User Accounts</h3>
                                        <p className="leading-relaxed">
                                            When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Prohibited Activities */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <XCircle className="w-5 h-5 text-orange-500" />
                                    <h2 className="text-2xl font-bold text-navy-950">Prohibited Activities</h2>
                                </div>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    You may not access or use the services for any purpose other than that for which we make the services available. Prohibited activities include, but are not limited to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>Systematically retrieving data to create a collection or database</li>
                                    <li>Making unauthorized use of our services</li>
                                    <li>Circumventing or disabling any security features</li>
                                    <li>Engaging in unauthorized framing or linking</li>
                                    <li>Interfering with or disrupting the services</li>
                                    <li>Attempting to impersonate another user or person</li>
                                    <li>Uploading or transmitting viruses or malicious code</li>
                                </ul>
                            </div>

                            {/* Intellectual Property */}
                            <div>
                                <h2 className="text-2xl font-bold text-navy-950 mb-4">Intellectual Property Rights</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Unless otherwise indicated, the services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the services are owned or controlled by us and are protected by copyright and trademark laws.
                                </p>
                            </div>

                            {/* Limitation of Liability */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <AlertCircle className="w-5 h-5 text-orange-500" />
                                    <h2 className="text-2xl font-bold text-navy-950">Limitation of Liability</h2>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    In no event will PromptiX or its directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the services.
                                </p>
                            </div>

                            {/* Termination */}
                            <div>
                                <h2 className="text-2xl font-bold text-navy-950 mb-4">Termination</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    We may terminate or suspend your account and access to the services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use the services will immediately cease.
                                </p>
                            </div>

                            {/* Governing Law */}
                            <div>
                                <h2 className="text-2xl font-bold text-navy-950 mb-4">Governing Law</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which PromptiX operates, without regard to its conflict of law provisions.
                                </p>
                            </div>

                            {/* Contact Us */}
                            <div className="pt-6 border-t border-gray-200">
                                <h2 className="text-2xl font-bold text-navy-950 mb-4">Contact Us</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    If you have any questions about these Terms of Service, please contact us at:
                                </p>
                                <p className="text-orange-500 font-medium mt-2">
                                    legal@promptix.com
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default TermsOfServicePage;
