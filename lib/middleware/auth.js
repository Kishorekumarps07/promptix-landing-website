import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT token and authenticate admin
 * Add this to protected routes
 */
export const verifyToken = (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: 'No token provided. Access denied.'
            });
        }

        // Extract token
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'your-secret-key-change-this'
        );

        // Attach admin info to request
        req.admin = decoded;
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: 'Token expired. Please login again.'
            });
        }

        return res.status(401).json({
            success: false,
            error: 'Invalid token. Access denied.'
        });
    }
};

/**
 * Middleware to check if admin is SuperAdmin
 * Use after verifyToken middleware
 */
export const requireSuperAdmin = (req, res, next) => {
    if (req.admin.role !== 'SuperAdmin') {
        return res.status(403).json({
            success: false,
            error: 'Access denied. SuperAdmin privileges required.'
        });
    }
    next();
};

/**
 * Middleware to check if admin has required role
 * @param {Array} roles - Array of allowed roles
 */
export const requireRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.admin.role)) {
            return res.status(403).json({
                success: false,
                error: `Access denied. Required role: ${roles.join(' or ')}`
            });
        }
        next();
    };
};
