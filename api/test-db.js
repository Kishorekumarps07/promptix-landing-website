import connectDB from './utils/db.js';
import Admin from './models/Admin.js';

/**
 * Database connection test endpoint
 * Tests MongoDB connection and Admin model access
 */
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const logs = [];

    try {
        logs.push('1. Starting database test');

        logs.push('2. Attempting to connect to MongoDB...');
        await connectDB();
        logs.push('3. ✅ Database connected successfully');

        logs.push('4. Attempting to count Admin documents...');
        const count = await Admin.countDocuments();
        logs.push(`5. ✅ Found ${count} admin(s) in database`);

        logs.push('6. Attempting to find first admin...');
        const admin = await Admin.findOne().select('email name role');
        logs.push(`7. ✅ Sample admin: ${admin?.email || 'none'}`);

        return res.status(200).json({
            success: true,
            message: 'Database connection test passed',
            logs,
            adminCount: count,
            sampleAdmin: admin ? {
                email: admin.email,
                name: admin.name,
                role: admin.role
            } : null
        });

    } catch (error) {
        logs.push(`❌ ERROR: ${error.message}`);
        logs.push(`Stack: ${error.stack}`);

        return res.status(500).json({
            success: false,
            error: error.message,
            logs,
            stack: error.stack
        });
    }
}
