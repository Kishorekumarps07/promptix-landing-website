import jwt from 'jsonwebtoken';

/**
 * Verify admin JWT token from request headers
 * @param {Object} req - Request object
 * @returns {Object} { success: boolean, admin?: Object, error?: string }
 */
export const verifyAdminToken = (req) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return {
                success: false,
                error: 'No token provided. Access denied.'
            };
        }

        // Extract token (remove 'Bearer ' prefix)
        const token = authHeader.substring(7);

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'your-secret-key-change-this'
        );

        // Return success with admin data
        return {
            success: true,
            admin: decoded
        };

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return {
                success: false,
                error: 'Token expired. Please login again.'
            };
        }

        if (error.name === 'JsonWebTokenError') {
            return {
                success: false,
                error: 'Invalid token. Access denied.'
            };
        }

        return {
            success: false,
            error: 'Authentication failed.'
        };
    }
};

/**
 * Check if admin has SuperAdmin role
 * @param {Object} admin - Decoded admin object from JWT
 * @returns {boolean} True if SuperAdmin
 */
export const isSuperAdmin = (admin) => {
    return admin && admin.role === 'SuperAdmin';
};

/**
 * Verify SuperAdmin access
 * @param {Object} req - Request object
 * @returns {Object} { success: boolean, admin?: Object, error?: string }
 */
export const verifySuperAdmin = (req) => {
    const authResult = verifyAdminToken(req);

    if (!authResult.success) {
        return authResult;
    }

    if (!isSuperAdmin(authResult.admin)) {
        return {
            success: false,
            error: 'Access denied. SuperAdmin privileges required.'
        };
    }

    return authResult;
};
