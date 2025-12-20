import connectDB from '../lib/utils/db.js';
import Contact from '../lib/models/Contact.js';

/**
 * API endpoint for handling contact form submissions
 * POST /api/contact
 */
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST method
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed. Use POST.'
        });
    }

    try {
        // Connect to database
        await connectDB();

        // Validate request body
        const { fullName, email, phone, subject, message, source } = req.body;

        if (!fullName || !email || !message) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: fullName, email, and message are required'
            });
        }

        // Create new contact entry
        const contact = await Contact.create({
            fullName,
            email,
            phone,
            subject,
            message,
            source: source || 'Contact Page'
        });

        // Return success response
        return res.status(201).json({
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
        console.error('Contact form submission error:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors
            });
        }

        // Handle duplicate email (if unique index is added)
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                error: 'A contact with this email already exists'
            });
        }

        // Generic error response
        return res.status(500).json({
            success: false,
            error: 'Failed to submit contact form. Please try again later.'
        });
    }
}
