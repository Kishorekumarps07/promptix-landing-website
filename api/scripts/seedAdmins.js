import dotenv from 'dotenv';
import connectDB from '../utils/db.js';
import Admin from '../models/Admin.js';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

/**
 * Seed script to create initial admin accounts
 * Run this script manually to create admin users
 * 
 * Usage:
 * node api/scripts/seedAdmins.js
 */

const seedAdmins = async () => {
    try {
        await connectDB();

        // Check if any admins already exist
        const existingAdmins = await Admin.countDocuments();

        if (existingAdmins > 0) {
            console.log(`⚠️  ${existingAdmins} admin(s) already exist. Skipping seed.`);
            console.log('To create additional admins, add them manually or modify this script.');
            process.exit(0);
        }

        // Create SuperAdmin
        const superAdmin = await Admin.create({
            name: 'PromptiX SuperAdmin',
            email: 'admin@promptix.com',
            password: 'Admin@123456', // Change this password immediately after first login!
            role: 'SuperAdmin'
        });

        console.log('✅ SuperAdmin created successfully!');
        console.log('Email:', superAdmin.email);
        console.log('⚠️  IMPORTANT: Change the default password immediately!');

        // Create regular Admin (optional)
        const regularAdmin = await Admin.create({
            name: 'PromptiX Admin',
            email: 'support@promptix.com',
            password: 'Support@123456', // Change this password immediately after first login!
            role: 'Admin'
        });

        console.log('\n✅ Regular Admin created successfully!');
        console.log('Email:', regularAdmin.email);
        console.log('⚠️  IMPORTANT: Change the default password immediately!');

        console.log('\n🎉 Admin seeding completed!');
        console.log('\nCreated accounts:');
        console.log('1. SuperAdmin - admin@promptix.com');
        console.log('2. Admin - support@promptix.com');
        console.log('\n⚠️  SECURITY WARNING: Change all default passwords before deploying to production!');

        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding admins:', error);
        process.exit(1);
    }
};

// Run the seed function
seedAdmins();
