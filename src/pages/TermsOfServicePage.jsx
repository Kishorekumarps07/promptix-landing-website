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
                                <h1 className="text-4xl md:text-5xl font-bold">Terms & Conditions</h1>
                            </div>
                            <p className="text-gray-300 text-lg">
                                PromptiX - A Tech Solution Company
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
                                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                                <p>
                                    By accessing this website or enrolling in any service provided by <strong>PromptiX - A Tech Solution Company</strong> (“PromptiX”, “we”, “our”, “us”),
                                    you agree to comply with the following Terms & Conditions. If you do not agree, please do not use our website or services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">SERVICES OFFERED</h2>
                                <p className="mb-2 text-gray-700">PromptiX provides:</p>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                    <li>Tech solutions for businesses</li>
                                    <li>Digital marketing services</li>
                                    <li>EdTech services including internships, workshops, webinars, hands-on training, and skill programs</li>
                                </ul>
                                <p className="mt-2 text-gray-700">Services are delivered based on the scope communicated at the time of engagement.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">WEBSITE USAGE</h2>
                                <p className="mb-2 text-gray-700">You agree:</p>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                    <li>To use the website only for lawful purposes</li>
                                    <li>Not to copy, reproduce, or misuse website content</li>
                                    <li>Not to attempt unauthorized access or disruption</li>
                                </ul>
                                <p className="mt-2 text-gray-700">PromptiX may restrict or terminate access for misuse.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">NO ONLINE PAYMENTS</h2>
                                <p className="text-gray-700">
                                    PromptiX does not collect, process, or store payments through this website.
                                    Any payments, if applicable, are handled offline or through direct communication and are governed by separate mutual understanding.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">EDTECH SERVICES DISCLAIMER</h2>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                    <li>All internships, workshops, and training programs are skill-based learning experiences</li>
                                    <li>PromptiX supports learners through practical training and guidance; however, employment, placements, income, or specific outcomes are not guaranteed unless clearly stated for a particular program</li>
                                    <li>Results depend on individual effort, consistency, and market conditions</li>
                                </ul>
                                <p className="mt-2 text-gray-700">Certificates, if provided, indicate participation or completion only.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">SERVICE DELIVERY & COMMUNICATION</h2>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                    <li>Timelines depend on timely communication and accurate information from users</li>
                                    <li>PromptiX is not responsible for delays caused by incomplete or late inputs</li>
                                    <li>Services are limited to the agreed scope</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">INTELLECTUAL PROPERTY</h2>
                                <p className="text-gray-700">
                                    All content including training materials, designs, logos, and documentation belong to PromptiX.
                                    Unauthorized copying, distribution, or commercial use is prohibited.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">LIMITATION OF LIABILITY</h2>
                                <p className="mb-2 text-gray-700">PromptiX is not liable for:</p>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                    <li>Business or financial losses</li>
                                    <li>Decisions made based on training or guidance</li>
                                    <li>Indirect or consequential damages</li>
                                </ul>
                                <p className="mt-2 text-gray-700">Liability, if any, is limited to the scope of service agreed upon.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">THIRD-PARTY SERVICES</h2>
                                <p className="text-gray-700">
                                    PromptiX does not integrate third-party services that collect user data through this website.
                                    Any external tools mentioned during training are for learning purposes only.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">TERMINATION</h2>
                                <p className="text-gray-700">
                                    PromptiX may suspend or terminate access to the website or services if these Terms are violated.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">CHANGES TO TERMS</h2>
                                <p className="text-gray-700">
                                    PromptiX may update these Terms & Conditions at any time. Continued use of the website or services indicates acceptance of the updated Terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-navy-950 mb-3">GOVERNING LAW</h2>
                                <p className="text-gray-700">
                                    These Terms are governed by the laws of India. Any disputes shall be subject to Indian jurisdiction.
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

export default TermsOfServicePage;
