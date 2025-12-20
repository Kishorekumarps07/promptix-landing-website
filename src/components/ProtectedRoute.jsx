import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 * 
 * Usage:
 * <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
 */
const ProtectedRoute = ({ children, requireSuperAdmin = false }) => {
    const isAuthenticated = authService.isAuthenticated();
    const isSuperAdmin = authService.isSuperAdmin();

    // Not authenticated - redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    // Requires SuperAdmin but user is not SuperAdmin
    if (requireSuperAdmin && !isSuperAdmin) {
        return (
            <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Access Denied</h1>
                    <p className="text-gray-400 mb-6">
                        You don't have permission to access this page.
                    </p>
                    <button
                        onClick={() => authService.logout()}
                        className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    // Authenticated and authorized - render children
    return children;
};

export default ProtectedRoute;
