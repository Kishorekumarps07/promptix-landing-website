// API Configuration with fallback and logging
const getApiBaseUrl = () => {
    // Get from environment variable
    const envUrl = import.meta.env.VITE_API_BASE_URL;

    // Production fallback - Using empty string for relative paths
    // This allows Vercel rewrites to proxy requests to the backend securely.
    const productionUrl = '';

    // Development fallback
    const developmentUrl = 'http://localhost:5000';

    // Determine which URL to use
    const isDevelopment = import.meta.env.DEV;
    const apiUrl = envUrl || (isDevelopment ? developmentUrl : productionUrl);

    // 🔍 DEBUG: Log the API URL being used
    console.log('🌐 Environment:', import.meta.env.MODE);
    console.log('🌐 VITE_API_BASE_URL from env:', envUrl);
    console.log('🌐 Is Development:', isDevelopment);
    console.log('🌐 Final API Base URL:', apiUrl);

    // ⚠️ Warning if using fallback in production
    if (!envUrl && !isDevelopment) {
        console.warn('⚠️ WARNING: VITE_API_BASE_URL not set, using fallback:', productionUrl);
    }

    return apiUrl;
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to build API URLs
export const buildApiUrl = (endpoint) => {
    const url = API_BASE_URL ? `${API_BASE_URL}${endpoint}` : endpoint;
    console.log(`📍 Building API URL for ${endpoint}:`, url);
    return url;
};

// Predefined API endpoints
export const API_ENDPOINTS = {
    CONTACTS: '/api/contacts',
    INTERNSHIPS: '/api/internships',
    ADMIN_STATS: '/api/admin/stats',
    CONTACTS_RECENT: '/api/contacts/recent',
    HEALTH: '/',
};

// Export full URLs
export default {
    BASE_URL: API_BASE_URL,
    buildUrl: buildApiUrl,

    // Full endpoint URLs
    CONTACTS: buildApiUrl(API_ENDPOINTS.CONTACTS),
    INTERNSHIPS: buildApiUrl(API_ENDPOINTS.INTERNSHIPS),
    ADMIN_STATS: buildApiUrl(API_ENDPOINTS.ADMIN_STATS),
    CONTACTS_RECENT: buildApiUrl(API_ENDPOINTS.CONTACTS_RECENT),
    HEALTH: buildApiUrl(API_ENDPOINTS.HEALTH),
};
