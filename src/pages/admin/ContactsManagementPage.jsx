import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Search, Trash2, ArrowLeft, Filter, Calendar, Edit, MessageSquare, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';

const ContactsManagementPage = () => {
    // ... (state hooks remain same)
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sourceFilter, setSourceFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 0 });
    const [editingStatus, setEditingStatus] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, [pagination.page, sourceFilter, statusFilter]);

    // ... (fetchContacts, handleStatusUpdate, handleDelete)

    const fetchContacts = async () => {
        setLoading(true);
        setError('');
        try {
            const query = new URLSearchParams({
                page: pagination.page,
                limit: pagination.limit,
                ...(sourceFilter && { source: sourceFilter }),
                ...(statusFilter && { status: statusFilter })
            });

            const response = await authService.authenticatedRequest(
                `/api/admin/contacts?${query}`
            );

            if (response.success) {
                setContacts(response.data);
                setPagination(prev => ({ ...prev, ...response.pagination }));
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch contacts');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await authService.authenticatedRequest(`/api/admin/contacts?id=${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus })
            });
            setEditingStatus(null);
            fetchContacts();
        } catch (err) {
            alert('Failed to update status: ' + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this contact?')) {
            return;
        }

        try {
            await authService.authenticatedRequest(`/api/admin/contacts?id=${id}`, {
                method: 'DELETE'
            });
            fetchContacts();
        } catch (err) {
            alert('Failed to delete contact: ' + err.message);
        }
    };

    const handleExport = async () => {
        try {
            await authService.downloadFile('/api/admin/export/contacts', 'contacts_export.csv');
        } catch (err) {
            alert('Failed to export contacts: ' + err.message);
        }
    };

    const filteredContacts = contacts.filter(contact =>
        contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        const colors = {
            'New': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
            'In Progress': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
            'Resolved': 'bg-green-500/10 text-green-500 border-green-500/20',
            'Archived': 'bg-gray-500/10 text-gray-500 border-gray-500/20'
        };
        return colors[status] || 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    };

    return (
        <div className="min-h-screen bg-navy-950">
            {/* Header */}
            <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                to="/admin/dashboard"
                                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-white" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Contact Forms</h1>
                                <p className="text-sm text-gray-400">Manage contact submissions</p>
                            </div>
                        </div>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Export CSV</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters and Search */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or message..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="pl-12 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 appearance-none cursor-pointer"
                        >
                            <option value="">All Status</option>
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Archived">Archived</option>
                        </select>
                    </div>

                    {/* Source Filter */}
                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                            value={sourceFilter}
                            onChange={(e) => setSourceFilter(e.target.value)}
                            className="pl-12 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 appearance-none cursor-pointer"
                        >
                            <option value="">All Sources</option>
                            <option value="Contact Page">Contact Page</option>
                            <option value="Footer">Footer</option>
                            <option value="CTA">CTA</option>
                        </select>
                    </div>
                </div>

                {/* Stats */}
                <div className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <p className="text-blue-400 text-sm">New</p>
                        <p className="text-2xl font-bold text-white">
                            {contacts.filter(c => c.status === 'New').length}
                        </p>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                        <p className="text-orange-400 text-sm">In Progress</p>
                        <p className="text-2xl font-bold text-white">
                            {contacts.filter(c => c.status === 'In Progress').length}
                        </p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                        <p className="text-green-400 text-sm">Resolved</p>
                        <p className="text-2xl font-bold text-white">
                            {contacts.filter(c => c.status === 'Resolved').length}
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <p className="text-gray-400 text-sm">Total</p>
                        <p className="text-2xl font-bold text-white">{pagination.total}</p>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                        <p className="text-gray-400 mt-4">Loading contacts...</p>
                    </div>
                ) : (
                    <>
                        {/* Contacts Table */}
                        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-white/5 border-b border-white/10">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Name</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Email</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Phone</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Source</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Date</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10">
                                        {filteredContacts.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                                                    No contacts found
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredContacts.map((contact) => (
                                                <tr key={contact._id} className="hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4">
                                                        {editingStatus === contact._id ? (
                                                            <select
                                                                defaultValue={contact.status || 'New'}
                                                                onChange={(e) => handleStatusUpdate(contact._id, e.target.value)}
                                                                onBlur={() => setEditingStatus(null)}
                                                                autoFocus
                                                                className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                                            >
                                                                <option value="New">New</option>
                                                                <option value="In Progress">In Progress</option>
                                                                <option value="Resolved">Resolved</option>
                                                                <option value="Archived">Archived</option>
                                                            </select>
                                                        ) : (
                                                            <button
                                                                onClick={() => setEditingStatus(contact._id)}
                                                                className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center gap-1 ${getStatusColor(contact.status || 'New')}`}
                                                            >
                                                                {contact.status || 'New'}
                                                                <Edit className="w-3 h-3" />
                                                            </button>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <p className="text-white font-medium">{contact.fullName}</p>
                                                            {contact.subject && (
                                                                <p className="text-sm text-gray-400 truncate max-w-xs">{contact.subject}</p>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-300">{contact.email}</td>
                                                    <td className="px-6 py-4 text-gray-300">{contact.phone || '-'}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm text-gray-300">
                                                            {contact.source}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-300 text-sm">
                                                        {new Date(contact.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            onClick={() => handleDelete(contact._id)}
                                                            className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                                                            title="Delete contact"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination */}
                        {pagination.pages > 1 && (
                            <div className="mt-6 flex items-center justify-between">
                                <button
                                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                                    disabled={pagination.page === 1}
                                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>
                                <span className="text-gray-400">
                                    Page {pagination.page} of {pagination.pages}
                                </span>
                                <button
                                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                    disabled={pagination.page === pagination.pages}
                                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default ContactsManagementPage;
