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
    Clock,
    PieChart as PieIcon,
    BarChart as BarIcon,
    Download,
    Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [statsData, setStatsData] = useState({
        total: { contacts: 0, internships: 0, all: 0 },
        charts: { daily: [], domains: [] }
    });
    const [loading, setLoading] = useState(true);

    // Colors for Pie Chart
    const COLORS = ['#F97316', '#8B5CF6', '#10B981', '#3B82F6', '#EC4899', '#F59E0B'];

    useEffect(() => {
        const adminData = authService.getAdmin();
        if (!adminData) {
            navigate('/admin/login');
            return;
        }
        setAdmin(adminData);
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/admin/stats', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setStatsData(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

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
            value: statsData.total.contacts,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20'
        },
        {
            icon: GraduationCap,
            label: 'Internship Applications',
            value: statsData.total.internships,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20'
        },
        {
            icon: Users,
            label: 'Total Users',
            value: statsData.total.all,
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

                            {/* Notifications */}
                            <div className="relative">
                                <button className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <Bell className="w-5 h-5 text-gray-300" />
                                    {statsData.total?.newTotal > 0 && (
                                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center border-2 border-navy-950 font-bold">
                                            {statsData.total.newTotal}
                                        </div>
                                    )}
                                </button>
                                {statsData.total?.newTotal > 0 && (
                                    <div className="absolute top-12 right-0 w-64 p-3 bg-navy-900 border border-white/10 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                                        <p className="text-sm text-gray-300">
                                            You have <span className="font-bold text-white">{statsData.total.newTotal}</span> new updates.
                                        </p>
                                        <div className="mt-2 text-xs space-y-1">
                                            {statsData.total.newContacts > 0 && (
                                                <p className="text-orange-400">• {statsData.total.newContacts} new contacts</p>
                                            )}
                                            {statsData.total.newInternships > 0 && (
                                                <p className="text-purple-400">• {statsData.total.newInternships} new applications</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
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
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Welcome back, {admin?.name?.split(' ')[0]}! 👋
                    </h2>
                    <p className="text-gray-400">Here's what's happening with your platform today.</p>
                </motion.div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Area Chart: Activity Trend */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-orange-500/10">
                                <TrendingUp className="w-5 h-5 text-orange-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Activity Trend</h3>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={statsData.charts?.daily}>
                                    <defs>
                                        <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                    <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '0.5rem' }}
                                        labelStyle={{ color: '#9CA3AF' }}
                                    />
                                    <Area type="monotone" dataKey="applications" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" name="Applications" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Pie Chart: Domain Distribution */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-purple-500/10">
                                <PieIcon className="w-5 h-5 text-purple-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Popular Domains</h3>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statsData.charts?.domains}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {statsData.charts?.domains.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '0.5rem' }}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        iconType="circle"
                                        formatter={(value) => <span className="text-gray-400 text-xs">{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-orange-500/30 transition-all group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl ${stat.bgColor} border ${stat.borderColor} group-hover:scale-110 transition-transform`}>
                                        <Icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                                    </div>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${stat.bgColor} ${stat.borderColor} border text-gray-300`}>
                                        +0% this week
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                                <p className="text-gray-400 text-sm">{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                    <h3 className="text-xl font-bold text-white mb-6">Quick Actions & Reports</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button
                            onClick={() => navigate('/admin/contacts')}
                            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left"
                        >
                            <Mail className="w-5 h-5 text-orange-500" />
                            <div>
                                <p className="font-medium text-white">View Contacts</p>
                                <p className="text-xs text-gray-400">Manage submissions</p>
                            </div>
                        </button>

                        <button
                            onClick={() => navigate('/admin/internships')}
                            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left"
                        >
                            <GraduationCap className="w-5 h-5 text-purple-500" />
                            <div>
                                <p className="font-medium text-white">View Internships</p>
                                <p className="text-xs text-gray-400">Manage applications</p>
                            </div>
                        </button>

                        {/* Export Buttons */}
                        <button
                            onClick={async () => {
                                try {
                                    await authService.downloadFile('/api/admin/export/contacts', 'contacts_export.csv');
                                } catch (err) {
                                    alert('Failed to export contacts');
                                }
                            }}
                            className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors text-left"
                        >
                            <Download className="w-5 h-5 text-blue-500" />
                            <div>
                                <p className="font-medium text-white">Export Contacts</p>
                                <p className="text-xs text-blue-300">Download CSV report</p>
                            </div>
                        </button>

                        <button
                            onClick={async () => {
                                try {
                                    await authService.downloadFile('/api/admin/export/internships', 'internships_export.csv');
                                } catch (err) {
                                    alert('Failed to export internships');
                                }
                            }}
                            className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors text-left"
                        >
                            <Download className="w-5 h-5 text-green-500" />
                            <div>
                                <p className="font-medium text-white">Export Internships</p>
                                <p className="text-xs text-green-300">Download CSV report</p>
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
