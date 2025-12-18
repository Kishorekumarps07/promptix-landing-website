import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, User, Mail, Phone, Calendar, MapPin, FileText, Send } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ApplyPage = () => {
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({
        domain: '',
        fullName: '',
        email: '',
        phone: '',
        college: '',
        year: '',
        branch: '',
        city: '',
        mode: 'online',
        startDate: '',
        message: ''
    });

    // Auto-fill domain from URL parameter
    useEffect(() => {
        const domain = searchParams.get('domain');
        if (domain) {
            setFormData(prev => ({ ...prev, domain: decodeURIComponent(domain) }));
        }
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare application data structure
        // This structure is ready for:
        // 1. Payment gateway integration
        // 2. Admin dashboard consumption
        // 3. Domain-based pricing scaling
        const applicationData = {
            // Student Information
            student: {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                college: formData.college,
                year: formData.year,
                branch: formData.branch,
                city: formData.city,
            },
            // Internship Details
            internship: {
                domain: formData.domain,
                mode: formData.mode,
                startDate: formData.startDate,
                message: formData.message,
            },
            // Pricing Information (ready for domain-based pricing)
            pricing: {
                domain: formData.domain,
                amount: 9999, // Base price - can be dynamic based on domain
                currency: 'INR',
                duration: '8 weeks',
                mode: formData.mode,
            },
            // Metadata
            metadata: {
                submittedAt: new Date().toISOString(),
                source: 'website',
                status: 'pending', // pending, confirmed, paid
            },
        };

        // TODO: Replace with actual API call
        // Example structure for future implementation:
        // try {
        //     const response = await fetch('/api/applications', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(applicationData),
        //     });
        //     const result = await response.json();
        //     
        //     // Redirect to payment gateway if needed
        //     // if (result.paymentRequired) {
        //     //     window.location.href = result.paymentUrl;
        //     // } else {
        //     //     navigate to success page
        //     // }
        // } catch (error) {
        //     console.error('Submission error:', error);
        // }

        // For now: Log data and redirect to success page
        console.log('Application Data:', applicationData);

        // Redirect to success page with query params
        const successUrl = `/apply-success?domain=${encodeURIComponent(formData.domain)}&email=${encodeURIComponent(formData.email)}`;
        window.location.href = successUrl;
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-navy-950 pt-20">
                {/* Hero Section */}
                <section className="bg-navy-950 py-12 md:py-16">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
                                <GraduationCap className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-medium text-orange-500">Internship Application</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Internship Registration
                            </h1>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                Apply for industry-grade internships at PromptiX
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Form Section */}
                <section className="py-12 md:py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Form - Left Side */}
                            <div className="lg:col-span-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <form onSubmit={handleSubmit} className="bg-navy-900 rounded-2xl border border-white/10 p-8 md:p-10 space-y-8">

                                        {/* Selected Domain (Read-only) */}
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                                <GraduationCap className="w-6 h-6 text-orange-500" />
                                                Selected Domain
                                            </h2>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="domain"
                                                    value={formData.domain}
                                                    readOnly
                                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-medium cursor-not-allowed"
                                                    placeholder="Domain will be auto-filled"
                                                />
                                            </div>
                                        </div>

                                        {/* Student Information */}
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                                <User className="w-6 h-6 text-orange-500" />
                                                Student Information
                                            </h2>
                                            <div className="space-y-4">
                                                {/* Full Name */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        Full Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="fullName"
                                                        value={formData.fullName}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                                                        placeholder="Enter your full name"
                                                    />
                                                </div>

                                                {/* Email & Phone */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                                            Email Address *
                                                        </label>
                                                        <div className="relative">
                                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                                required
                                                                className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                                                                placeholder="your@email.com"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                                            Phone Number *
                                                        </label>
                                                        <div className="relative">
                                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                            <input
                                                                type="tel"
                                                                name="phone"
                                                                value={formData.phone}
                                                                onChange={handleChange}
                                                                required
                                                                className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                                                                placeholder="+91-86677 26771"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* College & Year */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                                            College/University *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="college"
                                                            value={formData.college}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                                                            placeholder="Your college name"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                                            Year of Study *
                                                        </label>
                                                        <select
                                                            name="year"
                                                            value={formData.year}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-orange-500 focus:outline-none transition-colors"
                                                        >
                                                            <option value="">Select year</option>
                                                            <option value="1st">1st Year</option>
                                                            <option value="2nd">2nd Year</option>
                                                            <option value="3rd">3rd Year</option>
                                                            <option value="4th">4th Year</option>
                                                            <option value="final">Final Year</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* Branch & City */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                                            Branch/Stream *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="branch"
                                                            value={formData.branch}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                                                            placeholder="e.g., Computer Science"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                                            City *
                                                        </label>
                                                        <div className="relative">
                                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                            <input
                                                                type="text"
                                                                name="city"
                                                                value={formData.city}
                                                                onChange={handleChange}
                                                                required
                                                                className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                                                                placeholder="Your city"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Internship Details */}
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                                <FileText className="w-6 h-6 text-orange-500" />
                                                Internship Details
                                            </h2>
                                            <div className="space-y-4">
                                                {/* Mode */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        Preferred Mode *
                                                    </label>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <label className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all ${formData.mode === 'online' ? 'bg-orange-500/20 border-orange-500 text-white' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                                                            <input
                                                                type="radio"
                                                                name="mode"
                                                                value="online"
                                                                checked={formData.mode === 'online'}
                                                                onChange={handleChange}
                                                                className="sr-only"
                                                            />
                                                            <span className="font-medium">Online</span>
                                                        </label>
                                                        <label className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all ${formData.mode === 'offline' ? 'bg-orange-500/20 border-orange-500 text-white' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                                                            <input
                                                                type="radio"
                                                                name="mode"
                                                                value="offline"
                                                                checked={formData.mode === 'offline'}
                                                                onChange={handleChange}
                                                                className="sr-only"
                                                            />
                                                            <span className="font-medium">Offline</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Start Date */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        Preferred Start Date *
                                                    </label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                        <input
                                                            type="date"
                                                            name="startDate"
                                                            value={formData.startDate}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-orange-500 focus:outline-none transition-colors"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Additional Message */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        Additional Information (Optional)
                                                    </label>
                                                    <textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        rows={4}
                                                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors resize-none"
                                                        placeholder="Tell us about your interests, prior experience, or any questions..."
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                className="w-full px-6 py-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20"
                                            >
                                                <Send className="w-5 h-5" />
                                                Submit Application
                                            </button>
                                            <p className="text-sm text-gray-400 text-center mt-4">
                                                By submitting, you agree to our terms and conditions
                                            </p>
                                        </div>
                                    </form>
                                </motion.div>
                            </div>

                            {/* Pricing Summary - Right Sidebar */}
                            <div className="lg:col-span-1">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="lg:sticky lg:top-24"
                                >
                                    <div className="bg-navy-900 rounded-2xl border border-white/10 p-6 space-y-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-4">Pricing Summary</h3>

                                            {/* Price */}
                                            <div className="mb-6">
                                                <div className="flex items-baseline gap-2 mb-1">
                                                    <span className="text-4xl font-bold text-white">₹9,999</span>
                                                </div>
                                                <p className="text-sm text-gray-400">One-time payment</p>
                                            </div>

                                            {/* Details */}
                                            <div className="space-y-3 pb-6 border-b border-white/10">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-400 text-sm">Duration</span>
                                                    <span className="text-white font-medium">8 Weeks</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-400 text-sm">Mode</span>
                                                    <span className="text-white font-medium">Online / Offline</span>
                                                </div>
                                            </div>

                                            {/* Includes */}
                                            <div className="pt-6">
                                                <p className="text-sm font-semibold text-white mb-3">What's Included:</p>
                                                <div className="space-y-2">
                                                    {[
                                                        'Industry-focused training',
                                                        'Real-world project',
                                                        'Internship certificate',
                                                        'Mentor guidance',
                                                        'Career support'
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                                            <span className="text-sm text-gray-300">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Note */}
                                            <div className="pt-6 border-t border-white/10">
                                                <p className="text-xs text-gray-400">
                                                    EMI options and student discounts available
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default ApplyPage;
