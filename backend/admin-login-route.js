// Simple admin login endpoint
// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('🔐 Login attempt:', email);

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
        }

        // Simple hardcoded admin credentials (for development)
        // TODO: Replace with database lookup and proper password hashing
        const ADMIN_EMAIL = 'admin@promptix.com';
        const ADMIN_PASSWORD = 'Admin@123456';

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            // Login successful
            const adminData = {
                email: ADMIN_EMAIL,
                role: 'SuperAdmin',
                name: 'Admin User'
            };

            // Generate a simple token (in production, use JWT)
            const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

            console.log('✅ Login successful:', email);

            res.json({
                success: true,
                data: {
                    token,
                    admin: adminData
                },
                message: 'Login successful'
            });
        } else {
            console.log('❌ Invalid credentials:', email);
            res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
        }
    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Login failed',
            message: error.message
        });
    }
});
