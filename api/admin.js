import connectDB from './utils/db.js';
import Contact from './models/Contact.js';
import CareerApplication from './models/CareerApplication.js';
import InternshipApplication from './models/InternshipApplication.js';
import Admin from './models/Admin.js';
import { verifyAdminToken } from './utils/authUtils.js';

/**
 * Unified Admin API Handler
 * Handles all admin operations in a single serverless function
 */
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Verify admin authentication
        const admin = await verifyAdminToken(req);
        if (!admin) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        await connectDB();

        // Parse the URL to determine which resource to handle
        const { resource, action } = req.query;

        // Route to appropriate handler
        switch (resource) {
            case 'contacts':
                return await handleContacts(req, res);
            case 'careers':
                return await handleCareers(req, res);
            case 'internships':
                return await handleInternships(req, res);
            default:
                return res.status(404).json({ error: 'Resource not found' });
        }
    } catch (error) {
        console.error('Admin API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Contacts Handler
async function handleContacts(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const { page = 1, limit = 20, source } = req.query;
        const query = source ? { source } : {};

        const contacts = await Contact.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Contact.countDocuments(query);
        const total = await Contact.countDocuments();

        return res.status(200).json({
            contacts,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total,
            filtered: count
        });
    }

    if (req.method === 'DELETE' && id) {
        await Contact.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Contact deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}

// Careers Handler
async function handleCareers(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const { page = 1, limit = 20, status } = req.query;
        const query = status ? { status } : {};

        const applications = await CareerApplication.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await CareerApplication.countDocuments(query);
        const stats = await CareerApplication.getStatusStatistics();

        return res.status(200).json({
            applications,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            stats
        });
    }

    if (req.method === 'PATCH' && id) {
        const { status } = req.body;
        const application = await CareerApplication.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );
        return res.status(200).json(application);
    }

    if (req.method === 'DELETE' && id) {
        await CareerApplication.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Application deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}

// Internships Handler
async function handleInternships(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const { page = 1, limit = 20, status, domain } = req.query;
        const query = {};
        if (status) query.status = status;
        if (domain) query.domain = domain;

        const applications = await InternshipApplication.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await InternshipApplication.countDocuments(query);
        const stats = await InternshipApplication.getStatusStatistics();

        return res.status(200).json({
            applications,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            stats
        });
    }

    if (req.method === 'PATCH' && id) {
        const { status } = req.body;
        const application = await InternshipApplication.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );
        return res.status(200).json(application);
    }

    if (req.method === 'DELETE' && id) {
        await InternshipApplication.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Application deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
