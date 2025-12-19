import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Briefcase, GraduationCap, MapPin, FileText, Upload, Send, Calendar, CheckCircle, Link as LinkIcon } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CONTACT } from '../constants/contact';

const CareersApplyPage = () => {
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role') || 'Internship';

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        linkedIn: '',
        qualification: '',
        institution: '',
        graduationYear: '',
        currentStatus: '',
        primarySkills: '',
        experienceLevel: '',
        experienceSummary: '',
        resume: null,
        portfolioUrl: '',
        mode: '',
        duration: '',
        startDate: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Application submitted:', formData);
            setShowSuccess(true);
            setIsSubmitting(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Submission error:', error);
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-navy-950 pt-20">
                {/* Hero Section */}
                <section className="bg-navy-950 py-12 md:py-16">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
                                <Briefcase className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-medium text-orange-500">Career Opportunity</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Join Our Team
                            </h1>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                Apply for internships, trainee positions, and early-career roles at PromptiX
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Application Form */}
                <section className="py-12 md:py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <form onSubmit={handleSubmit} className="bg-navy-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8 md:p-10 space-y-8 overflow-hidden">

                                {/* Success Message */}
                                {showSuccess && (
                                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-6 h-6 text-green-500" />
                                            <div>
                                                <h3 className="text-xl font-bold text-white">Application submitted successfully!</h3>
                                                <p className="text-gray-300 mt-1">Our team will contact you.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Role Banner */}
                                <div className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-xl p-6">
                                    <div className="flex items-center gap-3">
                                        <Briefcase className="w-6 h-6 text-orange-500" />
                                        <div>
                                            <p className="text-sm text-gray-400">Applying for:</p>
                                            <h3 className="text-xl font-bold text-white">{role}</h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Information */}
                                <div>
                                    <div className="mb-6 pb-4 border-b border-white/10">
                                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                            <User className="w-6 h-6 text-orange-500" />
                                            Personal Information
                                        </h2>
                                        <p className="text-sm text-gray-400 mt-1">Tell us about yourself</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-base font-medium text-gray-300 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 text-base rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-base font-medium text-gray-300 mb-2">
                                                Email *
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    inputMode="email"
                                                    className="w-full pl-12 pr-4 py-4 text-base rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-base font-medium text-gray-300 mb-2">
                                                Phone *
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                    inputMode="tel"
                                                    className="w-full pl-12 pr-4 py-4 text-base rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                                                    placeholder={CONTACT.phone.display}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-base font-medium text-gray-300 mb-2">
                                                City
                                            </label>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-4 text-base rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                                                    placeholder="Your city"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-base font-medium text-gray-300 mb-2">
                                                LinkedIn URL
                                            </label>
                                            <div className="relative">
                                                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input
                                                    type="url"
                                                    name="linkedIn"
                                                    value={formData.linkedIn}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-4 text-base rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                                                    placeholder="https://linkedin.com/in/yourprofile"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Education / Background */}
                                <div>
                                    <div className="mb-6 pb-4 border-b border-white/10">
                                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                            <GraduationCap className="w-6 h-6 text-orange-500" />
                                            Education / Background
                                        </h2>
                                        <p className="text-sm text-gray-400 mt-1">Your academic details</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-base font-medium text-gray-300 mb-2">
                                                Highest Qualification
                                            </label>
                                            <select
                                                name="qualification"
                                                value={formData.qualification}
                                                onChange={handleChange}
                                                className="w-full px-4 py-4 text-base rounded-lg bg-white/5 border border-white/10 text-white focus:border-orange-500 focus:outline-none transition-colors [&>option]:bg-navy-900 [&>option]:text-white"
                                            >
                                                <option value="" className="bg-navy-900 text-white">Select qualification</option>
                                                <option value="high-school" className="bg-navy-900 text-white">High School / 12th Grade</option>
                                                <option value="diploma" className="bg-navy-900 text-white">Diploma</option>
                                                <option value="bachelors" className="bg-navy-900 text-white">Bachelor's Degree</option>
                                                <option value="masters" className="bg-navy-900 text-white">Master's Degree</option>
                                                <option value="phd" className="bg-navy-900 text-white">PhD</option>
                                                <option value="other" className="bg-navy-900 text-white">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-base font-medium text-gray-300 mb-2">
                                                College / Institution
                                            </label>
                                            <input
                                                type="text"
                                                name="institution"
                                                value={formData.institution}
                                                onChange={handleChange}
                                                className="w-full px-4 py-4 text-base rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                                                placeholder="Your institution name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-base font-medium text-gray-300 mb-2">
                                                Graduation Year
                                            </label>
                                            <input
                                                type="text"
                                                name="graduationYear"
                                                value={formData.graduationYear}
                                                onChange={handleChange}
                                                className="w-full px-4 py-4 text-base rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                                                placeholder="e.g., 2024"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-base font-medium text-gray-300 mb-2">
                                                Current Status
                                            </label>
                                            <select
                                                name="currentStatus"
                                                value={formData.currentStatus}
                                                onChange={handleChange}
                                                className="w-full px-4 py-4 text-base rounded-lg bg-white/5 border border-white/10 text-white focus:border-orange-500 focus:outline-none transition-colors [&>option]:bg-navy-900 [&>option]:text-white"
                                            >
                                                <option value="" className="bg-navy-900 text-white">Select status</option>
                                                <option value="student" className="bg-navy-900 text-white">Student</option>
                                                <option value="fresher" className="bg-navy-900 text-white">Fresher</option>
                                                <option value="working" className="bg-navy-900 text-white">Working Professional</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Skills & Experience */}
                                <div>
                                    <div className="mb-6 pb-4 border-b border-white/10">
                                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                            <FileText className="w-6 h-6 text-orange-500" />
                                            Skills & Experience
                                        </h2>
                                        <p className="text-sm text-gray-400 mt-1">Tell us about your skills</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-base font-medium text-gray-300 mb-2">
                                                Primary Skills
                                            </label>
                                            <input
                                                type="text"
                                                name="primarySkills"
                                                value={formData.primarySkills}
                                                onChange={handleChange}
                                                className="w-full px-4 py-4 text-base rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                                                placeholder="e.g., React, Python, Digital Marketing"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-base font-medium text-gray-300 mb-2">
                                                Experience Level
                                            </label>
                                            <select
                                                name="experienceLevel"
                                                value={formData.experienceLevel}
                                                onChange={handleChange}
                                                className="w-full px-4 py-4 text-base rounded-lg bg-white/5 border border-white/10 text-white focus:border-orange-500 focus:outline-none transition-colors [&>option]:bg-navy-900 [&>option]:text-white"
                                            >
                                                <option value="" className="bg-navy-900 text-white">Select experience level</option>
                                                <option value="fresher" className="bg-navy-900 text-white">Fresher (0 years)</option>
                                                <option value="0-1" className="bg-navy-900 text-white">0-1 years</option>
                                                <option value="1-3" className="bg-navy-900 text-white">1-3 years</option>
                                                <option value="3+" className="bg-navy-900 text-white">3+ years</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-base font-medium text-gray-300 mb-2">
                                                Short Experience Summary
                                            </label>
                                            <textarea
                                                name="experienceSummary"
                                                value={formData.experienceSummary}
                                                onChange={handleChange}
                                                rows="4"
                                                className="w-full px-4 py-4 text-base rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors resize-none"
                                                placeholder="Brief summary of your experience and achievements..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Resume & Portfolio */}
                                <div>
                                    <div className="mb-6 pb-4 border-b border-white/10">
                                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                            <Upload className="w-6 h-6 text-orange-500" />
                                            Resume & Portfolio
                                        </h2>
                                        <p className="text-sm text-gray-400 mt-1">Upload your documents</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-base font-medium text-gray-300 mb-2">
                                                Resume Upload (PDF, required) *
                                            </label>
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleFileChange}
                                                required
                                                className="w-full px-4 py-4 text-base rounded-lg bg-white/5 border border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 focus:border-orange-500 focus:outline-none transition-colors"
                                            />
                                            <p className="text-sm text-gray-500 mt-2">Max file size: 2MB</p>
                                        </div>

                                        <div>
                                            <label className="block text-base font-medium text-gray-300 mb-2">
                                                Portfolio / GitHub / Behance Link
                                            </label>
                                            <div className="relative">
                                                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input
                                                    type="url"
                                                    name="portfolioUrl"
                                                    value={formData.portfolioUrl}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-4 text-base rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                                                    placeholder="https://github.com/yourprofile"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Availability */}
                                <div>
                                    <div className="mb-6 pb-4 border-b border-white/10">
                                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                            <Calendar className="w-6 h-6 text-orange-500" />
                                            Availability
                                        </h2>
                                        <p className="text-sm text-gray-400 mt-1">When can you join?</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-base font-medium text-gray-300 mb-2">
                                                Mode
                                            </label>
                                            <select
                                                name="mode"
                                                value={formData.mode}
                                                onChange={handleChange}
                                                className="w-full px-4 py-4 text-base rounded-lg bg-white/5 border border-white/10 text-white focus:border-orange-500 focus:outline-none transition-colors [&>option]:bg-navy-900 [&>option]:text-white"
                                            >
                                                <option value="" className="bg-navy-900 text-white">Select mode</option>
                                                <option value="online" className="bg-navy-900 text-white">Online</option>
                                                <option value="offline" className="bg-navy-900 text-white">Offline</option>
                                                <option value="hybrid" className="bg-navy-900 text-white">Hybrid</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-base font-medium text-gray-300 mb-2">
                                                Duration
                                            </label>
                                            <select
                                                name="duration"
                                                value={formData.duration}
                                                onChange={handleChange}
                                                className="w-full px-4 py-4 text-base rounded-lg bg-white/5 border border-white/10 text-white focus:border-orange-500 focus:outline-none transition-colors [&>option]:bg-navy-900 [&>option]:text-white"
                                            >
                                                <option value="" className="bg-navy-900 text-white">Select duration</option>
                                                <option value="8-weeks" className="bg-navy-900 text-white">8 Weeks</option>
                                                <option value="12-weeks" className="bg-navy-900 text-white">12 Weeks</option>
                                                <option value="3-6-months" className="bg-navy-900 text-white">3-6 Months</option>
                                                <option value="flexible" className="bg-navy-900 text-white">Flexible</option>
                                            </select>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-base font-medium text-gray-300 mb-2">
                                                Start Date
                                            </label>
                                            <input
                                                type="date"
                                                name="startDate"
                                                value={formData.startDate}
                                                onChange={handleChange}
                                                className="w-full px-4 py-4 text-base rounded-lg bg-white/5 border border-white/10 text-white focus:border-orange-500 focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6 border-t border-white/10">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || showSuccess}
                                        className="w-full px-6 py-5 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold flex items-center justify-center gap-3 transition-all transform active:scale-98 disabled:hover:scale-100 shadow-lg shadow-orange-500/20 touch-manipulation"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Submitting...
                                            </>
                                        ) : showSuccess ? (
                                            <>
                                                <CheckCircle className="w-6 h-6" />
                                                Submitted Successfully
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-6 h-6" />
                                                Submit Application
                                            </>
                                        )}
                                    </button>
                                    {!showSuccess && (
                                        <p className="text-sm text-gray-400 text-center mt-4">
                                            We'll review your application and get back to you within 5-7 business days
                                        </p>
                                    )}
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default CareersApplyPage;
