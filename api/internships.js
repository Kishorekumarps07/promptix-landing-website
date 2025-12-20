import connectDB from '../lib/utils/db.js';
import InternshipApplication from '../lib/models/InternshipApplication.js';

/**
 * API endpoint for handling internship application submissions
 * Supports GET, POST, and PUT methods
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

    // Handle GET request - Get internship applications
    if (req.method === 'GET') {
        try {
            await connectDB();

            const { status, domain, upcoming, stats } = req.query;

            // Get statistics
            if (stats === 'domain') {
                const domainStats = await InternshipApplication.getDomainStats();
                return res.status(200).json({
                    success: true,
                    data: domainStats
                });
            }

            if (stats === 'status') {
                const statusStats = await InternshipApplication.getStatusStats();
                return res.status(200).json({
                    success: true,
                    data: statusStats
                });
            }

            // Get applications by filters
            let applications;

            if (status) {
                applications = await InternshipApplication.findByStatus(status);
            } else if (domain) {
                applications = await InternshipApplication.findByDomain(domain);
            } else if (upcoming === 'true') {
                applications = await InternshipApplication.findUpcoming();
            } else {
                applications = await InternshipApplication.find()
                    .sort({ createdAt: -1 })
                    .limit(50);
            }

            return res.status(200).json({
                success: true,
                count: applications.length,
                data: applications
            });

        } catch (error) {
            console.error('Get internship applications error:', error);
            return res.status(500).json({
                success: false,
                error: 'Failed to fetch internship applications'
            });
        }
    }

    // Handle POST request - Submit new internship application
    if (req.method === 'POST') {
        try {
            await connectDB();

            // Validate required fields
            const { fullName, email, phone, domain, price } = req.body;

            if (!fullName || !email || !phone || !domain || price === undefined) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields: fullName, email, phone, domain, and price are required'
                });
            }

            // Check for duplicate application
            const existingApplication = await InternshipApplication.findOne({
                email,
                domain
            });

            if (existingApplication) {
                return res.status(409).json({
                    success: false,
                    error: 'You have already applied for this domain internship with this email address'
                });
            }

            // Create new internship application
            const application = await InternshipApplication.create(req.body);

            return res.status(201).json({
                success: true,
                message: 'Internship application submitted successfully! We will contact you soon with further details.',
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

        } catch (error) {
            console.error('Internship application submission error:', error);

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
                    error: 'You have already applied for this domain internship'
                });
            }

            return res.status(500).json({
                success: false,
                error: 'Failed to submit internship application. Please try again later.'
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

            const application = await InternshipApplication.findById(id);

            if (!application) {
                return res.status(404).json({
                    success: false,
                    error: 'Internship application not found'
                });
            }

            await application.updateStatus(status);

            return res.status(200).json({
                success: true,
                message: 'Internship application status updated successfully',
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
