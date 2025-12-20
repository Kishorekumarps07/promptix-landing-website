import connectDB from '../lib/utils/db.js';
import CareerApplication from '../lib/models/CareerApplication.js';

/**
 * API endpoint for handling career application submissions
 * POST /api/applications
 */
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Handle GET request - Get applications by status or all
    if (req.method === 'GET') {
        try {
            await connectDB();

            const { status, role, limit } = req.query;

            let applications;

            if (status) {
                applications = await CareerApplication.findByStatus(status);
            } else if (role) {
                applications = await CareerApplication.findByRole(role);
            } else if (limit) {
                applications = await CareerApplication.findRecent(parseInt(limit));
            } else {
                applications = await CareerApplication.find()
                    .sort({ createdAt: -1 })
                    .limit(50);
            }

            return res.status(200).json({
                success: true,
                count: applications.length,
                data: applications
            });

        } catch (error) {
            console.error('Get applications error:', error);
            return res.status(500).json({
                success: false,
                error: 'Failed to fetch applications'
            });
        }
    }

    // Handle POST request - Submit new application
    if (req.method === 'POST') {
        try {
            await connectDB();

            // Validate required fields
            const { fullName, email, phone, roleApplied } = req.body;

            if (!fullName || !email || !phone || !roleApplied) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields: fullName, email, phone, and roleApplied are required'
                });
            }

            // Check for duplicate application
            const existingApplication = await CareerApplication.findOne({
                email,
                roleApplied
            });

            if (existingApplication) {
                return res.status(409).json({
                    success: false,
                    error: 'You have already applied for this role with this email address'
                });
            }

            // Create new application
            const application = await CareerApplication.create(req.body);

            return res.status(201).json({
                success: true,
                message: 'Application submitted successfully! We will review your application and get back to you soon.',
                data: {
                    id: application._id,
                    fullName: application.fullName,
                    email: application.email,
                    roleApplied: application.roleApplied,
                    status: application.status,
                    createdAt: application.createdAt
                }
            });

        } catch (error) {
            console.error('Application submission error:', error);

            // Handle validation errors
            if (error.name === 'ValidationError') {
                const errors = Object.values(error.errors).map(err => err.message);
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    details: errors
                });
            }

            // Handle duplicate key error
            if (error.code === 11000) {
                return res.status(409).json({
                    success: false,
                    error: 'You have already applied for this role'
                });
            }

            return res.status(500).json({
                success: false,
                error: 'Failed to submit application. Please try again later.'
            });
        }
    }

    // Handle PUT request - Update application status
    if (req.method === 'PUT') {
        try {
            await connectDB();

            const { id, status } = req.body;

            if (!id || !status) {
                return res.status(400).json({
                    success: false,
                    error: 'Application ID and status are required'
                });
            }

            const application = await CareerApplication.findById(id);

            if (!application) {
                return res.status(404).json({
                    success: false,
                    error: 'Application not found'
                });
            }

            await application.updateStatus(status);

            return res.status(200).json({
                success: true,
                message: 'Application status updated successfully',
                data: application
            });

        } catch (error) {
            console.error('Update status error:', error);
            return res.status(500).json({
                success: false,
                error: error.message || 'Failed to update application status'
            });
        }
    }

    // Method not allowed
    return res.status(405).json({
        success: false,
        error: 'Method not allowed'
    });
}
