/**
 * Unified API Handler for PromptiX
 * Single serverless function that routes to all API endpoints
 * This bypasses Vercel's 12 function limit on the free tier
 */

import connectDB from './utils/db.js';
import Admin from './models/Admin.js';
import Contact from './models/Contact.js';
import CareerApplication from './models/CareerApplication.js';
import InternshipApplication from './models/InternshipApplication.js';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

    // Handle OPTIONS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Parse the route from the query parameter
    const { route } = req.query;

    console.log('API Route:', route, 'Method:', req.method);

    try {
        // Route to appropriate handler
        switch (route?.[0]) {
            case 'health':
                return handleHealth(req, res);
            case 'test-db':
                return handleTestDB(req, res);
            case 'auth':
                if (route[1] === 'login') return handleLogin(req, res);
                break;
            case 'contact':
                return handleContact(req, res);
            case 'applications':
                return handleApplications(req, res);
            case 'internships':
                return handleInternships(req, res);
            default:
                return res.status(404).json({ error: 'Route not found' });
        }
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
}

// Health check
async function handleHealth(req, res) {
    return res.status(200).json({
        mongodbConfigured: !!process.env.MONGODB_URI,
        jwtConfigured: !!process.env.JWT_SECRET,
        mongodbPrefix: process.env.MONGODB_URI?.substring(0, 20) || 'not set',
        nodeVersion: process.version,
        platform: process.platform
    });
}

// Database test
async function handleTestDB(req, res) {
    const logs = [];
    try {
        logs.push('1. Starting database test');
        await connectDB();
        logs.push('2. ✅ Database connected');

        const count = await Admin.countDocuments();
        logs.push(`3. ✅ Found ${count} admin(s)`);

        const admin = await Admin.findOne().select('email name role');
        logs.push(`4. ✅ Sample: ${admin?.email || 'none'}`);

        return res.status(200).json({
            success: true,
            logs,
            adminCount: count,
            sampleAdmin: admin ? { email: admin.email, name: admin.name, role: admin.role } : null
        });
    } catch (error) {
        logs.push(`❌ ERROR: ${error.message}`);
        return res.status(500).json({ success: false, error: error.message, logs });
    }
}

// Admin login
async function handleLogin(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        console.log('Login: Connecting to database...');
        await connectDB();
        console.log('Login: Database connected');

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Email and password required' });
        }

        console.log('Login: Finding admin:', email);
        const admin = await Admin.findByEmailWithPassword(email);

        if (!admin) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        console.log('Login: Verifying password...');
        const isValid = await admin.comparePassword(password);

        if (!isValid) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        await admin.updateLastLogin();

        const token = jwt.sign(
            { id: admin._id, email: admin.email, role: admin.role },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '7d' }
        );

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
        console.error('Login error:', error);
        return res.status(500).json({ success: false, error: 'Login failed', debug: error.message });
    }
}

// Contact form
async function handleContact(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        await connectDB();
        const { fullName, email, phone, subject, message, source } = req.body;

        if (!fullName || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const contact = await Contact.create({ fullName, email, phone, subject, message, source: source || 'Contact Page' });

        return res.status(201).json({
            success: true,
            message: 'Thank you for contacting us!',
            data: { id: contact._id, fullName: contact.fullName, email: contact.email, createdAt: contact.createdAt }
        });
    } catch (error) {
        console.error('Contact error:', error);
        return res.status(500).json({ error: 'Failed to submit contact form' });
    }
}

// Career applications
async function handleApplications(req, res) {
    try {
        await connectDB();

        if (req.method === 'GET') {
            const { status, role, limit } = req.query;
            let applications;

            if (status) {
                applications = await CareerApplication.findByStatus(status);
            } else if (role) {
                applications = await CareerApplication.findByRole(role);
            } else if (limit) {
                applications = await CareerApplication.findRecent(parseInt(limit));
            } else {
                applications = await CareerApplication.find().sort({ createdAt: -1 }).limit(50);
            }

            return res.status(200).json({ success: true, count: applications.length, data: applications });
        }

        if (req.method === 'POST') {
            const { fullName, email, phone, roleApplied } = req.body;

            if (!fullName || !email || !phone || !roleApplied) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const existing = await CareerApplication.findOne({ email, roleApplied });
            if (existing) {
                return res.status(409).json({ error: 'Already applied for this role' });
            }

            const application = await CareerApplication.create(req.body);

            return res.status(201).json({
                success: true,
                message: 'Application submitted successfully!',
                data: {
                    id: application._id,
                    fullName: application.fullName,
                    email: application.email,
                    roleApplied: application.roleApplied,
                    status: application.status,
                    createdAt: application.createdAt
                }
            });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('Applications error:', error);
        return res.status(500).json({ error: 'Failed to process application' });
    }
}

// Internship applications
async function handleInternships(req, res) {
    try {
        await connectDB();

        if (req.method === 'GET') {
            const { status, domain, upcoming, stats } = req.query;

            if (stats === 'domain') {
                const domainStats = await InternshipApplication.getDomainStats();
                return res.status(200).json({ success: true, data: domainStats });
            }

            if (stats === 'status') {
                const statusStats = await InternshipApplication.getStatusStats();
                return res.status(200).json({ success: true, data: statusStats });
            }

            let applications;
            if (status) {
                applications = await InternshipApplication.findByStatus(status);
            } else if (domain) {
                applications = await InternshipApplication.findByDomain(domain);
            } else if (upcoming === 'true') {
                applications = await InternshipApplication.findUpcoming();
            } else {
                applications = await InternshipApplication.find().sort({ createdAt: -1 }).limit(50);
            }

            return res.status(200).json({ success: true, count: applications.length, data: applications });
        }

        if (req.method === 'POST') {
            const { fullName, email, phone, domain, price } = req.body;

            if (!fullName || !email || !phone || !domain || price === undefined) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const existing = await InternshipApplication.findOne({ email, domain });
            if (existing) {
                return res.status(409).json({ error: 'Already applied for this domain' });
            }

            const application = await InternshipApplication.create(req.body);

            return res.status(201).json({
                success: true,
                message: 'Internship application submitted successfully!',
                data: {
                    id: application._id,
                    fullName: application.fullName,
                    email: application.email,
                    domain: application.domain,
                    mode: application.mode,
                    duration: application.duration,
                    price: application.formattedPrice,
                    status: application.status,
                    startDate: application.formattedStartDate,
                    createdAt: application.createdAt
                }
            });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('Internships error:', error);
        return res.status(500).json({ error: 'Failed to process internship application' });
    }
}
