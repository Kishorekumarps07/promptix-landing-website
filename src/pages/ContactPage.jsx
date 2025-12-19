import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, MapPin, Clock, Shield, Send, Upload, X } from 'lucide-react';
import { CONTACT } from '../constants/contact';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        interestedIn: '',
        message: '',
        whatsappUpdates: false,
        file: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const interestOptions = [
        'Business Solutions',
        'Digital Marketing',
        'Internship Program',
        'Workshop / Training',
        'College Partnership',
        'General Inquiry'
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
            setFormData(prev => ({ ...prev, file }));
            setErrors(prev => ({ ...prev, file: '' }));
        } else {
            setErrors(prev => ({ ...prev, file: 'File size must be less than 5MB' }));
        }
    };

    const removeFile = () => {
        setFormData(prev => ({ ...prev, file: null }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Name is required';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Invalid phone number (10 digits required)';
        }

        if (!formData.interestedIn) {
            newErrors.interestedIn = 'Please select an option';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                interestedIn: '',
                message: '',
                whatsappUpdates: false,
                file: null
            });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitSuccess(false), 5000);
        }, 2000);
    };

    const contactOptions = [
        {
            icon: Phone,
            title: 'Call Us',
            value: CONTACT.phone.display,
            link: `tel:${CONTACT.phone.raw}`,
            color: 'text-blue-400'
        },
        {
            icon: MessageCircle,
            title: 'WhatsApp',
            value: 'Chat with us instantly',
            link: CONTACT.whatsapp.link,
            color: 'text-green-400'
        },
        {
            icon: Mail,
            title: 'Email',
            value: CONTACT.email.address,
            link: CONTACT.email.link,
            color: 'text-orange-400'
        }
    ];

    return (
        <div className="min-h-screen bg-navy-950 pt-20">

            {/* Hero Section */}
            <section className="section-container">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="heading-xl text-white mb-6">
                            Let's Build Something <span className="text-orange-500">Great Together</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
                            Have a project in mind? Looking for an internship? Want to partner with us?
                            We're here to help you succeed.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href={CONTACT.whatsapp.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
                            >
                                <MessageCircle className="w-5 h-5" />
                                WhatsApp Us
                            </a>
                            <a
                                href={`tel:${CONTACT.phone.raw}`}
                                className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition-all border border-white/10 w-full sm:w-auto flex items-center justify-center gap-2"
                            >
                                <Phone className="w-5 h-5" />
                                Call Now
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact Options */}
            <section className="max-w-7xl mx-auto px-4 py-14 md:py-16 lg:py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contactOptions.map((option, index) => {
                        const Icon = option.icon;
                        return (
                            <motion.a
                                key={index}
                                href={option.link}
                                target={option.link.startsWith('http') ? '_blank' : undefined}
                                rel={option.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl group"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-navy-900 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <Icon className={`w-6 h-6 ${option.color}`} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{option.title}</h3>
                                <p className="text-gray-400 text-sm">{option.value}</p>
                            </motion.a>
                        );
                    })}
                </div>
            </section>

            {/* Contact Form */}
            <section className="max-w-4xl mx-auto px-4 py-14 md:py-16 lg:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-8 md:p-12 rounded-3xl bg-navy-900/50 border border-white/10 backdrop-blur-md"
                >
                    <h2 className="text-3xl font-bold text-white mb-2">Send Us a Message</h2>
                    <p className="text-gray-400 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

                    {submitSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3"
                        >
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <p className="text-green-400 font-medium">Message sent successfully! We'll be in touch soon.</p>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.fullName ? 'border-red-500' : 'border-white/10'} text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors`}
                                placeholder="John Doe"
                            />
                            {errors.fullName && <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>}
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors`}
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors`}
                                    placeholder="9876543210"
                                />
                                {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                            </div>
                        </div>

                        {/* Interested In */}
                        <div>
                            <label htmlFor="interestedIn" className="block text-sm font-medium text-gray-300 mb-2">
                                I'm Interested In *
                            </label>
                            <select
                                id="interestedIn"
                                name="interestedIn"
                                value={formData.interestedIn}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.interestedIn ? 'border-red-500' : 'border-white/10'} text-white focus:outline-none focus:border-orange-500 transition-colors`}
                            >
                                <option value="" className="bg-navy-900">Select an option</option>
                                {interestOptions.map((option, i) => (
                                    <option key={i} value={option} className="bg-navy-900">{option}</option>
                                ))}
                            </select>
                            {errors.interestedIn && <p className="mt-1 text-sm text-red-400">{errors.interestedIn}</p>}
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                Your Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none`}
                                placeholder="Tell us about your project or inquiry..."
                            ></textarea>
                            {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Attach File (Optional)
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept=".pdf,.doc,.docx,.txt"
                                />
                                <label
                                    htmlFor="file"
                                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:border-orange-500/30 transition-colors cursor-pointer"
                                >
                                    <Upload className="w-5 h-5" />
                                    {formData.file ? formData.file.name : 'Choose file (Max 5MB)'}
                                </label>
                                {formData.file && (
                                    <button
                                        type="button"
                                        onClick={removeFile}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            {errors.file && <p className="mt-1 text-sm text-red-400">{errors.file}</p>}
                        </div>

                        {/* WhatsApp Updates */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="whatsappUpdates"
                                name="whatsappUpdates"
                                checked={formData.whatsappUpdates}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-white/10 bg-white/5 text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
                            />
                            <label htmlFor="whatsappUpdates" className="text-sm text-gray-300">
                                Send me updates via WhatsApp
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </section>

            {/* Trust Note */}
            <section className="max-w-4xl mx-auto px-4 pb-14 md:pb-16 lg:pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
                        <Clock className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                        <div>
                            <h3 className="text-white font-semibold mb-1">Quick Response</h3>
                            <p className="text-sm text-gray-400">We typically respond within 24 hours on business days.</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
                        <Shield className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                        <div>
                            <h3 className="text-white font-semibold mb-1">Your Privacy Matters</h3>
                            <p className="text-sm text-gray-400">Your information is secure and will never be shared with third parties.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ContactPage;
