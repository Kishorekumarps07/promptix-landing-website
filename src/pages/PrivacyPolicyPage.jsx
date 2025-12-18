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

                            {/* Introduction */}
                            <div>
                                <h2 className="text-2xl font-bold text-navy-950 mb-4">Introduction</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    At PromptiX, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                                </p>
                            </div>

                            {/* Information We Collect */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Eye className="w-5 h-5 text-orange-500" />
                                    <h2 className="text-2xl font-bold text-navy-950">Information We Collect</h2>
                                </div>
                                <div className="space-y-4 text-gray-700">
                                    <div>
                                        <h3 className="font-semibold text-navy-950 mb-2">Personal Information</h3>
                                        <p className="leading-relaxed">
                                            We may collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise contact us.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-navy-950 mb-2">Automatically Collected Information</h3>
                                        <p className="leading-relaxed">
                                            We automatically collect certain information when you visit, use, or navigate the website. This information does not reveal your specific identity but may include device and usage information.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* How We Use Your Information */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <FileText className="w-5 h-5 text-orange-500" />
                                    <h2 className="text-2xl font-bold text-navy-950">How We Use Your Information</h2>
                                </div>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    We use the information we collect or receive:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>To facilitate account creation and authentication</li>
                                    <li>To send administrative information to you</li>
                                    <li>To fulfill and manage your orders</li>
                                    <li>To post testimonials with your consent</li>
                                    <li>To request feedback and contact you about your use of our services</li>
                                    <li>To protect our services and enforce our terms</li>
                                    <li>To respond to legal requests and prevent harm</li>
                                </ul>
                            </div>

                            {/* Data Security */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Lock className="w-5 h-5 text-orange-500" />
                                    <h2 className="text-2xl font-bold text-navy-950">Data Security</h2>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please note that no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                                </p>
                            </div>

                            {/* Your Privacy Rights */}
                            <div>
                                <h2 className="text-2xl font-bold text-navy-950 mb-4">Your Privacy Rights</h2>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    Depending on your location, you may have the following rights regarding your personal information:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>The right to access your personal information</li>
                                    <li>The right to rectification of inaccurate data</li>
                                    <li>The right to erasure of your personal information</li>
                                    <li>The right to restrict processing</li>
                                    <li>The right to data portability</li>
                                    <li>The right to object to processing</li>
                                </ul>
                            </div>

                            {/* Contact Us */}
                            <div className="pt-6 border-t border-gray-200">
                                <h2 className="text-2xl font-bold text-navy-950 mb-4">Contact Us</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    If you have questions or comments about this Privacy Policy, please contact us at:
                                </p>
                                <p className="text-orange-500 font-medium mt-2">
                                    privacy@promptix.com
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

export default PrivacyPolicyPage;
