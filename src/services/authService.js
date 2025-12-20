/**
 * Authentication Service
 * Handles admin login, logout, and token management
 */

const API_BASE_URL = '/api';

class AuthService {
    /**
     * Login admin with email and password
     * @param {string} email - Admin email
     * @param {string} password - Admin password
     * @returns {Promise<Object>} Login response with token and admin data
     */
    async login(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            if (data.success) {
                // Store token and admin info in localStorage
                this.setToken(data.data.token);
                this.setAdmin(data.data.admin);
                return data.data;
            } else {
                throw new Error(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    /**
     * Logout admin and clear stored data
     */
    logout() {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        window.location.href = '/admin/login';
    }

    /**
     * Store JWT token
     * @param {string} token - JWT token
     */
    setToken(token) {
        localStorage.setItem('adminToken', token);
    }

    /**
     * Get stored JWT token
     * @returns {string|null} JWT token or null
     */
    getToken() {
        return localStorage.getItem('adminToken');
    }

    /**
     * Store admin data
     * @param {Object} admin - Admin data
     */
    setAdmin(admin) {
        localStorage.setItem('adminData', JSON.stringify(admin));
    }

    /**
     * Get stored admin data
     * @returns {Object|null} Admin data or null
     */
    getAdmin() {
        const adminData = localStorage.getItem('adminData');
        return adminData ? JSON.parse(adminData) : null;
    }

    /**
     * Check if user is authenticated
     * @returns {boolean} True if authenticated
     */
    isAuthenticated() {
        return !!this.getToken();
    }

    /**
     * Check if user is SuperAdmin
     * @returns {boolean} True if SuperAdmin
     */
    isSuperAdmin() {
        const admin = this.getAdmin();
        return admin && admin.role === 'SuperAdmin';
    }

    /**
     * Make authenticated API request
     * @param {string} url - API endpoint
     * @param {Object} options - Fetch options
     * @returns {Promise<Object>} API response
     */
    async authenticatedRequest(url, options = {}) {
        const token = this.getToken();

        if (!token) {
            throw new Error('No authentication token found');
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers,
        };

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            const data = await response.json();

            // Handle token expiration
            if (response.status === 401) {
                this.logout();
                throw new Error('Session expired. Please login again.');
            }

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('Authenticated request error:', error);
            throw error;
        }
    }
}

// Export singleton instance
const authService = new AuthService();
export default authService;
