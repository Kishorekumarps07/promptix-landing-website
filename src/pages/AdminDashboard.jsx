import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    GraduationCap,
    Mail,
    LogOut,
    Shield,
    TrendingUp,
    Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const adminData = authService.getAdmin();
        setAdmin(adminData);
    }, []);

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            authService.logout();
            navigate('/admin/login');
        }
    };

    const stats = [
        {
            icon: Mail,
            label: 'Contact Forms',
            value: '0',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20'
        },
        {
            icon: GraduationCap,
            label: 'Internship Applications',
            value: '0',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20'
        },
        {
            icon: Users,
            label: 'Total Users',
            value: '0',
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-500/10',
            borderColor: 'border-orange-500/20'
        }
    ];

    return (
        <div className="min-h-screen bg-navy-950">
            {/* Header */}
            <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-orange-500" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">PromptiX Admin</h1>
                                <p className="text-xs text-gray-400">Dashboard</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {admin && (
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-white">{admin.name}</p>
                                    <p className="text-xs text-gray-400">{admin.role}</p>
                                </div>
                            )}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Welcome back, {admin?.name || 'Admin'}!
                    </h2>
                    <p className="text-gray-400">
                        Here's what's happening with PromptiX today.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-white/5 backdrop-blur-xl border ${stat.borderColor} rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} border ${stat.borderColor} flex items-center justify-center`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <TrendingUp className="w-5 h-5 text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                            <p className="text-sm text-gray-400">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                    <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={() => navigate('/admin/contacts')}
                            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left"
                        >
                            <Mail className="w-5 h-5 text-orange-500" />
                            <div>
                                <p className="font-medium text-white">View Contacts</p>
                                <p className="text-xs text-gray-400">Manage contact submissions</p>
                            </div>
                        </button>

                        <button
                            onClick={() => navigate('/admin/internships')}
                            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left"
                        >
                            <GraduationCap className="w-5 h-5 text-orange-500" />
                            <div>
                                <p className="font-medium text-white">Internships</p>
                                <p className="text-xs text-gray-400">Manage internship applications</p>
                            </div>
                        </button>
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                    <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                    <div className="text-center py-12">
                        <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">No recent activity</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Activity will appear here once you start managing applications
                        </p>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default AdminDashboard;
