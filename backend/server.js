import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import models
import Contact from './models/Contact.js';
import InternshipApplication from './models/InternshipApplication.js';
import Admin from './models/Admin.js';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// CORS Configuration
// ============================================

// Get allowed origins from environment or use defaults
const getAllowedOrigins = () => {
    if (process.env.ALLOWED_ORIGINS) {
        const origins = process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim());
        console.log('🔒 [CORS] Using environment origins:', origins);
        return origins;
    }

    const defaultOrigins = [
        'https://promptix.pro',
        'https://www.promptix.pro',
        'https://promptix-landing-website.vercel.app',
        'https://promptix-landing-website-git-*.vercel.app',
        'https://promptix-landing-website-*.vercel.app',
        process.env.NODE_ENV === 'development' && 'http://localhost:5173',
        process.env.NODE_ENV === 'development' && 'http://localhost:3000',
    ].filter(Boolean);

    console.log('🔒 [CORS] Using default origins:', defaultOrigins);
    return defaultOrigins;
};

const allowedOrigins = getAllowedOrigins();

// CORS options with origin validation
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (Postman, mobile apps, etc.)
        if (!origin) {
            console.log('✅ [CORS] No origin header (allowed)');
            return callback(null, true);
        }

        // Check if origin matches allowed list
        const isAllowed = allowedOrigins.some(allowedOrigin => {
            // Exact match
            if (allowedOrigin === origin) {
                return true;
            }

            // Wildcard match (e.g., *.vercel.app)
            if (allowedOrigin.includes('*')) {
                const pattern = allowedOrigin
                    .replace(/\./g, '\\.')  // Escape dots
                    .replace(/\*/g, '.*');  // Replace * with .*
                const regex = new RegExp(`^${pattern}$`);
                return regex.test(origin);
            }

            return false;
        });

        if (isAllowed) {
            console.log('✅ [CORS] Allowed origin:', origin);
            callback(null, true);
        } else {
            console.warn('❌ [CORS] Blocked origin:', origin);
            console.warn('   Allowed origins:', allowedOrigins);
            callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
    ],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400,  // 24 hours
    optionsSuccessStatus: 204,
};

// Log preflight requests
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        console.log('\n🔍 [PREFLIGHT] ========================================');
        console.log('📍 Path:', req.path);
        console.log('🌍 Origin:', req.headers.origin || 'No origin header');
        console.log('🔑 Request Method:', req.headers['access-control-request-method']);
        console.log('🔑 Request Headers:', req.headers['access-control-request-headers']);
        console.log('⏰ Time:', new Date().toISOString());
    }
    next();
});

// Apply CORS middleware
app.use(cors(corsOptions));

// Explicitly handle OPTIONS for all routes
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Request logging

// Helper: Seed Default Admin
const seedDefaultAdmin = async () => {
    try {
        const adminExists = await Admin.findOne({ email: 'admin@promptix.com' });
        if (!adminExists) {
            await Admin.create({
                name: 'Super Admin',
                email: 'admin@promptix.com',
                password: 'Admin@123456', // Will be hashed by pre-save hook
                role: 'SuperAdmin'
            });
            console.log('🛡️ Default Admin Account Created: admin@promptix.com');
        }
    } catch (error) {
        console.error('❌ Admin Seeding Error:', error);
    }
};

// MongoDB Connection
const connectDB = async () => {
    try {
        console.log('🔍 Attempting MongoDB connection...');

        // Check for mock mode flag
        if (process.env.MOCK_DB === 'true') {
            throw new Error('Mock mode requested');
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // Fail fast
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

        // Seed Admin
        await seedDefaultAdmin();
        global.mockMode = false;
    } catch (error) {
        console.warn('⚠️ MongoDB Connection Failed or Mock Mode enabled');
        console.warn('⚠️ Server running in MOCK DATA MODE. Data will not be persisted.');
        global.mockMode = true;
        // Do NOT exit process
    }
};

// Connect to database
connectDB();

// Health check route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'PromptiX Backend API is running',
        timestamp: new Date().toISOString(),
        mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// API Routes

/**
 * POST /api/contacts
 * Submit contact form
 */
app.post('/api/contacts', async (req, res) => {
    try {
        // 🔍 DEBUG LOG 1: Request received
        console.log('🔔 POST /api/contacts - Request received');
        console.log('📦 Request Body:', req.body);
        console.log('🌍 Request Origin:', req.headers.origin);
        console.log('🔑 Content-Type:', req.headers['content-type']);

        const { fullName, email, phone, subject, message, source, file, appointmentDate, appointmentTime } = req.body;

        // 🔍 DEBUG LOG 2: Validate fields
        console.log('🔍 Validating fields...');
        if (!fullName || !email || !phone || !message) {
            console.log('❌ Validation failed - missing fields');
            console.log('Missing:', { fullName: !fullName, email: !email, phone: !phone, message: !message });
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: fullName, email, phone, message'
            });
        }
        console.log('✅ Validation passed');

        // 🔍 DEBUG LOG 3: Check MongoDB connection
        console.log('🔍 MongoDB Connection State:', mongoose.connection.readyState);
        // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

        if (mongoose.connection.readyState !== 1) {
            console.log('❌ MongoDB not connected! State:', mongoose.connection.readyState);
            return res.status(500).json({
                success: false,
                error: 'Database connection error'
            });
        }

        // 🔍 DEBUG LOG 4: Attempt to create contact
        console.log('💾 Attempting to save to MongoDB...');
        const contact = await Contact.create({
            fullName,
            email,
            phone,
            subject: subject || '',
            message,
            source: source || 'Contact Page',
            file, // Already added in previous step (silently failed but trying here) 
            appointmentDate,
            appointmentTime
        });

        // 🔍 DEBUG LOG 5: Success
        console.log('✅ Contact created successfully!');
        console.log('📄 Contact ID:', contact._id);
        console.log('📧 Contact Email:', contact.email);
        console.log('📅 Created At:', contact.createdAt);

        // Return success ONLY after successful insert
        res.status(201).json({
            success: true,
            message: 'Thank you for contacting us! We will get back to you soon.',
            data: {
                id: contact._id,
                fullName: contact.fullName,
                email: contact.email,
                createdAt: contact.createdAt
            }
        });
    } catch (error) {
        // 🔍 DEBUG LOG 6: Error details
        console.error('❌ Contact submission error:', error);
        console.error('❌ Error Name:', error.name);
        console.error('❌ Error Message:', error.message);
        console.error('❌ Error Stack:', error.stack);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            console.log('❌ Mongoose validation error:', Object.values(error.errors).map(err => err.message));
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: Object.values(error.errors).map(err => err.message)
            });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to submit contact form',
            message: error.message
        });
    }
});

/**
 * POST /api/auth/login
 * Admin login endpoint
 */
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('🔐 Login attempt:', email);

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
        }

        // MOCK MODE HANDLER
        if (global.mockMode) {
            console.log('🛡️ [DEBUG] Mock Mode isActive, checking credentials for:', email);
            if (email === 'admin@promptix.com' && password === 'Admin@123456') {
                console.log('✅ [DEBUG] Mock Login Successful');
                return res.json({
                    success: true,
                    data: {
                        token: 'mock-jwt-token-12345',
                        admin: {
                            id: 'mock-admin-id',
                            name: 'Super Admin (Mock)',
                            email: 'admin@promptix.com',
                            role: 'SuperAdmin'
                        }
                    },
                    message: 'Login successful (Mock Mode)'
                });
            } else {
                console.warn('❌ [DEBUG] Mock Login Failed: Invalid credentials');
                return res.status(401).json({ success: false, error: 'Invalid credentials (Mock Mode)' });
            }
        }

        console.log('🛡️ [DEBUG] DB Mode isActive, searching for user:', email);
        // Check for admin user in DB
        const admin = await Admin.findOne({ email }).select('+password');

        if (!admin) {
            console.warn('❌ [DEBUG] Login failed: User not found in DB');
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Check password matching
        const isMatch = await admin.matchPassword(password);

        if (!isMatch) {
            console.warn('❌ [DEBUG] Login failed: Invalid password in DB');
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET || 'promptix_secure_secret_key_2024',
            { expiresIn: '30d' }
        );

        console.log('✅ [DEBUG] DB Login successful:', email);

        // Return token and admin data
        res.json({
            success: true,
            data: {
                token,
                admin: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role
                }
            },
            message: 'Login successful'
        });
    } catch (error) {
        console.error('🔥 [DEBUG] CRITICAL Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error during login',
            message: error.message
        });
    }
});

/**
 * POST /api/internships
 * Submit internship application
 */
app.post('/api/internships', async (req, res) => {
    try {
        const { fullName, email, phone, domain, price } = req.body;

        // Validate required fields
        if (!fullName || !email || !phone || !domain || price === undefined) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: fullName, email, phone, domain, price'
            });
        }

        // Check for duplicate application
        const existing = await InternshipApplication.findOne({ email, domain });
        if (existing) {
            return res.status(409).json({
                success: false,
                error: 'You have already applied for this domain'
            });
        }

        // Create application
        const application = await InternshipApplication.create(req.body);

        console.log(`✅ Internship application created: ${application._id} - ${application.email} - ${application.domain}`);

        // Return success ONLY after successful insert
        res.status(201).json({
            success: true,
            message: 'Internship application submitted successfully! We will contact you soon.',
            data: {
                id: application._id,
                fullName: application.fullName,
                email: application.email,
                domain: application.domain,
                mode: application.mode,
                duration: application.duration,
                price: application.price,
                status: application.status,
                createdAt: application.createdAt
            }
        });
    } catch (error) {
        console.error('❌ Internship application error:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: Object.values(error.errors).map(err => err.message)
            });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to submit internship application',
            message: error.message
        });
    }
});

/**
 * GET /api/contacts/recent
 * DEBUG: Get recent contacts
 */
app.get('/api/contacts/recent', async (req, res) => {
    try {
        console.log('🔍 Fetching recent contacts...');
        const contacts = await Contact.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('fullName email phone createdAt');

        console.log(`✅ Found ${contacts.length} recent contacts`);

        res.json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        console.error('❌ Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/admin/stats
 * Get admin statistics
 */
app.get('/api/admin/stats', async (req, res) => {
    try {
        // MOCK MODE HANDLER
        if (global.mockMode) {
            console.log('✅ [MOCK] Serving stats');
            return res.json({
                success: true,
                data: {
                    total: {
                        contacts: 25,
                        internships: 12,
                        all: 37,
                        newContacts: 3,
                        newInternships: 2,
                        newTotal: 5
                    },
                    charts: {
                        daily: [
                            { date: 'Dec 18', applications: 2 },
                            { date: 'Dec 19', applications: 1 },
                            { date: 'Dec 20', applications: 3 },
                            { date: 'Dec 21', applications: 0 },
                            { date: 'Dec 22', applications: 4 },
                            { date: 'Dec 23', applications: 1 },
                            { date: 'Dec 24', applications: 1 }
                        ],
                        domains: [
                            { name: 'AI & Machine Learning', value: 5 },
                            { name: 'Full Stack Development', value: 4 },
                            { name: 'Data Science', value: 3 }
                        ]
                    }
                }
            });
        }

        const [
            contactCount,
            internshipCount,
            newContactsCount,
            newInternshipsCount
        ] = await Promise.all([
            Contact.countDocuments(),
            InternshipApplication.countDocuments(),
            Contact.countDocuments({ status: { $in: ['New', null] } }), // Handle legacy docs
            InternshipApplication.countDocuments({ status: { $in: ['Applied', null] } })
        ]);

        // Date range for charts (Last 7 Days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        // 1. Daily Stats (Timeline Overlay)
        const dailyTimeline = await InternshipApplication.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    applications: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // 2. Domain Distribution (Pie Chart)
        const domainStats = await InternshipApplication.aggregate([
            { $group: { _id: '$domain', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Format daily stats to ensure all 7 days exist (fill zeros)
        const formattedDailyStats = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const displayDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            const found = dailyTimeline.find(item => item._id === dateStr);
            formattedDailyStats.push({
                date: displayDate, // e.g. "Dec 22"
                applications: found ? found.applications : 0
            });
        }

        res.json({
            success: true,
            data: {
                total: {
                    contacts: contactCount,
                    internships: internshipCount,
                    all: contactCount + internshipCount,
                    newContacts: newContactsCount,
                    newInternships: newInternshipsCount,
                    newTotal: newContactsCount + newInternshipsCount
                },
                charts: {
                    daily: formattedDailyStats,
                    domains: domainStats.map(d => ({ name: d._id, value: d.count }))
                }
            }
        });
    } catch (error) {
        console.error('Stats Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch statistics',
            message: error.message
        });
    }
});
// Add these endpoints AFTER the /api/admin/stats endpoint (around line 449)
// and BEFORE the "// 404 handler" comment

/**
 * GET /api/admin/contacts
 * Get all contacts with pagination
 */
app.get('/api/admin/contacts', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const source = req.query.source;

        // MOCK MODE HANDLER
        if (global.mockMode) {
            console.log('✅ [MOCK] Serving contacts');
            const mockContacts = [
                { _id: '1', fullName: 'John Doe', email: 'john@example.com', phone: '1234567890', message: 'Hello', source: 'Contact Page', status: 'New', createdAt: new Date() },
                { _id: '2', fullName: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', message: 'Inquiry', source: 'Home Page', status: 'In Progress', createdAt: new Date() },
                { _id: '3', fullName: 'Bob Johnson', email: 'bob@example.com', phone: '1122334455', message: 'Support', source: 'Contact Page', status: 'Resolved', createdAt: new Date() }
            ];

            return res.json({
                success: true,
                data: mockContacts,
                pagination: { page, limit, total: 3, pages: 1 }
            });
        }

        const query = source ? { source } : {};
        const total = await Contact.countDocuments(query);
        const contacts = await Contact.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        console.log(`📋 Fetched ${contacts.length} contacts`);

        res.json({
            success: true,
            data: contacts,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) }
        });
    } catch (error) {
        console.error('❌ Admin contacts error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch contacts' });
    }
});

/**
 * DELETE /api/admin/contacts
 */
app.delete('/api/admin/contacts', async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ success: false, error: 'Contact ID is required' });
        }

        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return res.status(404).json({ success: false, error: 'Contact not found' });
        }

        console.log(`🗑️ Deleted contact: ${contact.email}`);
        res.json({ success: true, message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('❌ Delete contact error:', error);
        res.status(500).json({ success: false, error: 'Failed to delete contact' });
    }
});

/**
 * GET /api/admin/internships
 * Get all internship applications with pagination
 */
app.get('/api/admin/internships', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const domain = req.query.domain;
        const status = req.query.status;

        // MOCK MODE HANDLER
        if (global.mockMode) {
            console.log('✅ [MOCK] Serving internship applications');
            const mockApplications = [
                {
                    _id: '1',
                    fullName: 'Alice Walker',
                    email: 'alice@example.com',
                    phone: '9988776655',
                    college: 'Tech University',
                    domain: 'Full Stack Development',
                    mode: 'Remote',
                    duration: '3 Months',
                    price: 2999,
                    status: 'Applied',
                    createdAt: new Date()
                },
                {
                    _id: '2',
                    fullName: 'Charlie Brown',
                    email: 'charlie@example.com',
                    phone: '8877665544',
                    college: 'Engineering Institute',
                    domain: 'AI & Machine Learning',
                    mode: 'Hybrid',
                    duration: '6 Months',
                    price: 4999,
                    status: 'Confirmed',
                    createdAt: new Date()
                }
            ];

            return res.json({
                success: true,
                count: mockApplications.length,
                data: mockApplications,
                pagination: { page, limit, total: mockApplications.length, pages: 1 }
            });
        }

        const query = {};
        if (domain) query.domain = domain;
        if (status) query.status = status;

        const total = await InternshipApplication.countDocuments(query);
        const applications = await InternshipApplication.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        console.log(`📋 Fetched ${applications.length} internship applications`);

        res.json({
            success: true,
            count: applications.length,
            data: applications,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) }
        });
    } catch (error) {
        console.error('❌ Admin internships error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch internship applications' });
    }
});

/**
 * DELETE /api/admin/internships
 */
app.delete('/api/admin/internships', async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ success: false, error: 'Application ID is required' });
        }

        const application = await InternshipApplication.findByIdAndDelete(id);
        if (!application) {
            return res.status(404).json({ success: false, error: 'Application not found' });
        }

        console.log(`🗑️ Deleted internship application: ${application.email}`);
        res.json({ success: true, message: 'Application deleted successfully' });
    } catch (error) {
        console.error('❌ Delete internship error:', error);
        res.status(500).json({ success: false, error: 'Failed to delete application' });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('❌ Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: err.message
    });
});



/**
 * PATCH /api/admin/contacts
 * Update contact status
 */
app.patch('/api/admin/contacts', async (req, res) => {
    try {
        const { id } = req.query;
        const { status } = req.body;

        if (!id || !status) {
            return res.status(400).json({ success: false, error: 'ID and status are required' });
        }

        const contact = await Contact.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({ success: false, error: 'Contact not found' });
        }

        res.json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * PATCH /api/admin/internships
 * Update internship application status
 */
app.patch('/api/admin/internships', async (req, res) => {
    try {
        const { id } = req.query;
        const { status } = req.body;

        if (!id || !status) {
            return res.status(400).json({ success: false, error: 'ID and status are required' });
        }

        const application = await InternshipApplication.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ success: false, error: 'Application not found' });
        }

        res.json({ success: true, data: application });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


/**
 * GET /api/admin/export/contacts
 * Export contacts to CSV
 */
app.get('/api/admin/export/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        const fields = ['Full Name', 'Email', 'Phone', 'Subject', 'Message', 'Source', 'Status', 'Date'];
        let csv = fields.join(',') + '\n';

        contacts.forEach(contact => {
            const row = [
                `"${contact.fullName}"`,
                contact.email,
                contact.phone,
                `"${contact.subject || ''}"`,
                `"${contact.message.replace(/"/g, '""')}"`, // Escape quotes
                contact.source,
                contact.status || 'New',
                new Date(contact.createdAt).toLocaleDateString()
            ];
            csv += row.join(',') + '\n';
        });

        res.header('Content-Type', 'text/csv');
        res.header('Content-Disposition', 'attachment; filename="contacts_export.csv"');
        res.send(csv);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * GET /api/admin/export/internships
 * Export internships to CSV
 */
app.get('/api/admin/export/internships', async (req, res) => {
    try {
        const applications = await InternshipApplication.find().sort({ createdAt: -1 });

        const fields = ['Full Name', 'Email', 'Phone', 'College', 'Domain', 'Mode', 'Duration', 'Status', 'Date'];
        let csv = fields.join(',') + '\n';

        applications.forEach(app => {
            const row = [
                `"${app.fullName}"`,
                app.email,
                app.phone,
                `"${app.college}"`,
                `"${app.domain}"`,
                app.mode,
                app.duration,
                app.status,
                new Date(app.createdAt).toLocaleDateString()
            ];
            csv += row.join(',') + '\n';
        });

        res.header('Content-Type', 'text/csv');
        res.header('Content-Disposition', 'attachment; filename="internships_export.csv"');
        res.send(csv);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received, closing server gracefully...');
    mongoose.connection.close();
    process.exit(0);
});
