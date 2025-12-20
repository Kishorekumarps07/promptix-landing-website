import connectDB from '../utils/db.js';
import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

/**
 * API endpoint for admin authentication
 * POST /api/auth/login - Admin login
 * 
 * NOTE: No public registration endpoint for security
 * Admins must be created via seed script or database directly
 */
export default async function handler(req, res) {
    console.log('=== LOGIN ENDPOINT CALLED ===');
    console.log('Method:', req.method);

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        console.log('OPTIONS request - returning 200');
        res.status(200).end();
        return;
    }

    // Only allow POST method for login
    if (req.method !== 'POST') {
        console.log('Invalid method:', req.method);
        return res.status(405).json({
            success: false,
            error: 'Method not allowed. Use POST for login.'
        });
    }

    try {
        console.log('1. Starting login process...');
        console.log('2. Connecting to database...');

        await connectDB();
        console.log('3. ✅ Database connected');

        const { email, password } = req.body;
        console.log('4. Request body received, email:', email);

        // Validate input
        if (!email || !password) {
            console.log('5. ❌ Missing credentials');
            return res.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
        }

        console.log('5. Finding admin by email...');
        // Find admin by email (including password field)
        const admin = await Admin.findByEmailWithPassword(email);
        console.log('6. Admin found:', !!admin);

        if (!admin) {
            console.log('7. ❌ Admin not found');
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
        }

        console.log('7. Comparing password...');
        // Compare password
        const isPasswordValid = await admin.comparePassword(password);
        console.log('8. Password valid:', isPasswordValid);

        if (!isPasswordValid) {
            console.log('9. ❌ Invalid password');
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
        }

        console.log('9. Updating last login...');
        // Update last login
        await admin.updateLastLogin();
        console.log('10. ✅ Last login updated');

        console.log('11. Generating JWT token...');
        // Generate JWT token
        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email,
                role: admin.role
            },
            process.env.JWT_SECRET || 'your-secret-key-change-this',
            {
                expiresIn: '7d' // Token expires in 7 days
            }
        );
        console.log('12. ✅ Token generated');

        console.log('13. Sending success response...');
        // Return success response (without password)
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                admin: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role,
                    lastLogin: admin.lastLogin
                }
            }
        });

    } catch (error) {
        console.error('❌ LOGIN ERROR:', error.message);
        console.error('Error stack:', error.stack);
        console.error('Error name:', error.name);

        return res.status(500).json({
            success: false,
            error: 'Login failed. Please try again later.',
            debug: {
                message: error.message,
                name: error.name
            }
        });
    }
}
